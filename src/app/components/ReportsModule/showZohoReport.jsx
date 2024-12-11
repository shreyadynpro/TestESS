import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import SnackbarUtils from 'SnackbarUtils';
import axios from 'axios';
import commonConfig from '../commonConfig';
import { getAccessToken } from 'app/utils/utils';

const ShowReport = () => {
  const [loading, setLoading] = useState(false);
  const [privateUrl, setPrivateUrl] = useState(''); // State to store the private URL
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
        commonConfig.urls.getZohoDashboard,
        { report_id: reportId },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setLoading(false);
      if (response && response.data) {
        const reportData = response.data;
        const privateUrl = reportData.data.privateUrl;
        setPrivateUrl(privateUrl);
      }
    } catch (error) {
      setLoading(false);
      SnackbarUtils.error(error?.message || 'Something went wrong!!');
    }
  };

  return (
    <div
      style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        privateUrl && (
          <iframe
            src={privateUrl}
            title="Report"
            style={{ width: '100%', height: '100%', border: 'none' }}
          ></iframe>
        )
      )}
    </div>
  );
};

export default ShowReport;
