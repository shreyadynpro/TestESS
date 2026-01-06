import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import commonConfig from './commonConfig';
import { getAccessToken } from 'app/utils/utils';
import {
  getQuickActions,
  getStoredUsage,
  saveUsage,
  sortWithUsage,
} from './searchSuggestionsConfig';

const dispatchSuggestions = (docs, actions) => {
  window.dispatchEvent(new CustomEvent('searchSuggestionsReady', { detail: { docs, actions } }));
};

const SearchSuggestionsProvider = () => {
  const [docList, setDocList] = useState([]);
  const [usageMap, setUsageMap] = useState(() => getStoredUsage());
  const [userRoleId, setUserRoleId] = useState(() => localStorage.getItem('roleId') || null);

  useEffect(() => {
    if (!userRoleId) return;

    const fetchDocs = async () => {
      const token = getAccessToken();
      try {
        const response = await axios.get(`${commonConfig.urls.docs}/CompanyPolicy`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response?.data?.Response) {
          setDocList(response.data.Response);
        }
      } catch (err) {
        console.error('Failed to load documents for search', err);
      }
    };

    fetchDocs();
  }, [userRoleId]);

  const roleActions = useMemo(() => getQuickActions(userRoleId), [userRoleId]);
  const sortedRoleActions = useMemo(
    () => sortWithUsage(roleActions, usageMap),
    [roleActions, usageMap]
  );

  useEffect(() => {
    const handleGlobalSearch = (event) => {
      const query = String(event?.detail || '').trim();
      if (!query) {
        dispatchSuggestions([], []);
        return;
      }

      const normalizedQuery = query.toLowerCase();
      const matchingDocs = docList
        .filter((doc) =>
          String(doc?.doc_name || '')
            .toLowerCase()
            .includes(normalizedQuery)
        )
        .slice(0, 4);
      const matchingActions = sortedRoleActions
        .filter((action) => action.label.toLowerCase().includes(normalizedQuery))
        .slice(0, 4);

      dispatchSuggestions(matchingDocs, matchingActions);
    };

    window.addEventListener('globalSearch', handleGlobalSearch);
    return () => window.removeEventListener('globalSearch', handleGlobalSearch);
  }, [docList, sortedRoleActions]);

  useEffect(() => {
    const handleOpenDocument = async (event) => {
      const doc = event?.detail?.doc;
      if (!doc) return;
      try {
        const token = getAccessToken();
        const response = await axios.get(`${commonConfig.urls.docs_download}/${doc.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response?.data?.file_url) {
          window.open(response.data.file_url, '_blank');
        }
      } catch (error) {
        console.error('Failed to open document', error);
      }
    };

    window.addEventListener('openDocumentRequest', handleOpenDocument);
    return () => window.removeEventListener('openDocumentRequest', handleOpenDocument);
  }, []);

  useEffect(() => {
    const handleActionInvoked = (event) => {
      const label = event?.detail?.label;
      if (!label) return;
      setUsageMap((prev) => {
        const updated = { ...prev, [label]: (prev[label] || 0) + 1 };
        saveUsage(updated);
        return updated;
      });
    };

    window.addEventListener('searchActionInvoked', handleActionInvoked);
    return () => window.removeEventListener('searchActionInvoked', handleActionInvoked);
  }, []);

  return null;
};

export default SearchSuggestionsProvider;
