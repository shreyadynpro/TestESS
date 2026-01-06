import axios from 'axios';
 
/**
 * Upload signed NDA PDF file
 * @param {File} file - PDF file to upload
 * @returns {Promise<Object>} Response from upload API
 */
export const uploadSignedNDA = async (file) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
 
    if (!accessToken) {
      return { error: 'Missing authentication credentials' };
    }
 
    if (!file) {
      return { error: 'No file provided' };
    }
 
    // Validate file type
    if (file.type !== 'application/pdf') {
      return { error: 'Only PDF files are allowed' };
    }
 
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('attachment', file);
 
    const response = await axios.post(
      'https://ess.dynprocloud.com:8443/api/upload_signedNDA',
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
 
    return response.data;
  } catch (error) {
    console.error('Error uploading signed NDA:', error);
    return {
      error: error.response?.data?.message || 'Error uploading signed NDA',
      status: error.response?.status,
    };
  }
};
 
/**
 * Get signed NDA documents
 * @returns {Promise<Object>} Response with signed NDA documents
 */
export const getSignedNDA = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
 
    if (!accessToken) {
      return { error: 'Missing authentication credentials' };
    }
 
    const response = await axios.get(
      'https://ess.dynprocloud.com:8443/api/get_signedNDA',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
 
    return response.data;
  } catch (error) {
    console.error('Error fetching signed NDA:', error);
    return {
      error: error.response?.data?.message || 'Error fetching signed NDA',
      status: error.response?.status,
    };
  }
};
 
/**
 * Check if user has uploaded signed NDA
 * @returns {Promise<boolean>} True if NDA is uploaded, false otherwise
 */
export const hasUserUploadedNDA = async () => {
  try {
    const response = await getSignedNDA();
   
    // If there's an error, assume NDA is not uploaded
    if (response.error) {
      return false;
    }
   
    // Check if file_url exists and is not empty/null
    const hasFileUrl = response.file_url && response.file_url.trim() !== '';
    const hasFileName = response.file_name && response.file_name.trim() !== '';
   
    return hasFileUrl && hasFileName;
  } catch (error) {
    console.error('Error checking NDA status:', error);
    return false; // Assume not uploaded on error
  }
};
 