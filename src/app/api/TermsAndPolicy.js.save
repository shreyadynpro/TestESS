import axios from 'axios';
import commonConfig from 'app/components/commonConfig';
import { getAccessToken } from 'app/utils/utils';
 
/**
 * Terms & Policy Acceptance API
 * Calls PUT /userPoliciesAcceptance/{id} to record acceptance
 */
const acceptUserPolicies = async (userId) => {
  if (!userId) throw new Error('Missing user id');
 
  const url = `${commonConfig.urls.baseURL}/userPoliciesAcceptance/${userId}`;
  const token = getAccessToken();
 
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
 
  // No body required per current backend design; sending empty object
  const response = await axios.put(url, {}, { headers });
  return response?.data;
};
 
export default {
  acceptUserPolicies,
};
