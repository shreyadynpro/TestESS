import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import SnackbarUtils from 'SnackbarUtils';
import axios from 'axios';
import commonConfig from '../commonConfig';
import { models } from 'powerbi-client';
import { getAccessToken } from 'app/utils/utils';

const ShowReport = () => {
  const [reportConfig, setReportConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const reportContainerRef = useRef(null); // Ref for the Power BI report container
  const { id } = useParams(); // Get the report ID from the route
  const authToken = getAccessToken();

  useEffect(() => {
    // Fetch the report configuration data using the ID
    fetchReportData(id);
  }, [id]);

  const fetchReportData = async (reportId) => {
    try {
      setLoading(true);
      const response = await axios.post(
        commonConfig.urls.getPowerBiDashboard,
        { report_id: reportId },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setLoading(false);
      if (response && response.data) {
        const reportData = response.data;
        setReportConfig({
          accessToken: reportData.embedToken, // Assuming the API response contains accessToken
          embedUrl: reportData.embedUrl, // Assuming the API response contains embedUrl
          reportId: reportId, // Use the provided ID or fallback to route ID
        });
      }
    } catch (error) {
      setLoading(false);
      SnackbarUtils.error(error?.message || 'Something went wrong!!');
    }
  };

  useEffect(() => {
    // Embed the report once the report configuration is available
    if (reportConfig && reportContainerRef.current) {
      const embedConfiguration = {
        type: 'report',
        tokenType: models.TokenType.Embed,
        accessToken: reportConfig.accessToken,
        embedUrl: reportConfig.embedUrl,
        id: reportConfig.reportId,
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: false,
        },
      };
      // Embed the report
      window.powerbi.embed(reportContainerRef.current, embedConfiguration);
    }

    // Cleanup function to reset the Power BI container
    return () => {
      if (reportContainerRef.current) {
        window.powerbi.reset(reportContainerRef.current);
      }
    };
  }, [reportConfig]); // Runs whenever the reportConfig is updated

  return (
    <div
      style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {loading && <p>Loading report...</p>}
      {!loading && (
        <div
          ref={reportContainerRef}
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            minWidth: '300px', // Optional: set a minimum width
            minHeight: '300px', // Optional: set a minimum height
            aspectRatio: '16 / 9', // Optional: maintain aspect ratio
          }}
        ></div>
      )}
    </div>
  );
};

export default ShowReport;
