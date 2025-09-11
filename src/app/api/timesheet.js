import axios from 'axios';

/**
 * Check if timesheet is submitted for the current month/year
 * @returns {Promise<Object>} Response with approvedFlag, identity_no, month, year
 */
export const checkTimesheetStatus = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const identityNo = localStorage.getItem('identityNo');

    if (!accessToken || !identityNo) {
      return { error: 'Missing authentication credentials' };
    }

    const response = await axios.get(`https://ess.dynprocloud.com:8443/api/docs_checkTimesheet/${identityNo}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error checking timesheet status:', error);
    return { 
      error: error.response?.data?.message || 'Error checking timesheet status',
      status: error.response?.status
    };
  }
};

/**
 * Get the URL for a submitted timesheet
 * @returns {Promise<Object>} Response with file_url and file_name
 */
export const getSubmittedTimesheetUrl = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const identityNo = localStorage.getItem('identityNo');

    if (!accessToken || !identityNo) {
      return { error: 'Missing authentication credentials' };
    }

    const response = await axios.get(`https://ess.dynprocloud.com:8443/api/docs_timesheet/${identityNo}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching timesheet URL:', error);
    return { 
      error: error.response?.data?.message || 'Error fetching timesheet URL',
      status: error.response?.status
    };
  }
};

export default {
  checkTimesheetStatus,
  getSubmittedTimesheetUrl,
};
