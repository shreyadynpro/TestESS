/**
 * Terms & Policy Service
 * Manages user acceptance tracking and logging
 */

const JSON_FILE_PATH = '/logs/terms-acceptance-logs.json';

// Internal JSON file operations
const updateInternalJSONFile = async (logs) => {
  const fileData = {
    lastUpdated: new Date().toISOString(),
    totalEntries: logs.length,
    logs: logs
  };
  
  try {
    // Note: This is a client-side limitation - browsers cannot directly write to files
    // In production, this would need to be handled via an API call to the backend
    console.log('Internal JSON file would be updated with:', fileData);
    console.log(`File path: ${JSON_FILE_PATH}`);
    
    // For now, we'll store in localStorage with a special key for internal tracking
    localStorage.setItem('internal_terms_logs', JSON.stringify(fileData));
    
    return true;
  } catch (error) {
    console.error('Error updating internal JSON file:', error);
    return false;
  }
};

// Helper function for admin download (when needed)
const downloadJSONFile = (data, filename) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const termsService = {
  /**
   * Check if user has completed terms acceptance
   * @param {string} identityNo - User's PAN number
   * @returns {boolean} - Whether user has completed terms acceptance
   */
  hasUserCompletedTerms: (identityNo) => {
    if (!identityNo) return false;
    
    const completed = localStorage.getItem(`termsCompleted_${identityNo}`);
    return completed === 'true';
  },

  /**
   * Check if terms acceptance is required for current user
   * @returns {boolean} - Whether terms modal should be shown
   */
  isTermsAcceptanceRequired: () => {
    const identityNo = localStorage.getItem('identityNo');
    if (!identityNo) return false;
    
    return !termsService.hasUserCompletedTerms(identityNo);
  },

  /**
   * Get all acceptance logs for current user
   * @returns {Array} - Array of acceptance log entries
   */
  getUserAcceptanceLogs: () => {
    const identityNo = localStorage.getItem('identityNo');
    if (!identityNo) return [];
    
    const allLogs = JSON.parse(localStorage.getItem('termsAcceptanceLogs') || '[]');
    return allLogs.filter(log => log.identityNo === identityNo);
  },

  /**
   * Get all acceptance logs (admin function)
   * @returns {Array} - Array of all acceptance log entries
   */
  getAllAcceptanceLogs: () => {
    return JSON.parse(localStorage.getItem('termsAcceptanceLogs') || '[]');
  },

  /**
   * Get internal JSON file data
   * @returns {Object} - Internal JSON file data with metadata
   */
  getInternalJSONData: () => {
    try {
      const internalData = localStorage.getItem('internal_terms_logs');
      return internalData ? JSON.parse(internalData) : {
        lastUpdated: null,
        totalEntries: 0,
        logs: []
      };
    } catch (error) {
      console.error('Error reading internal JSON data:', error);
      return {
        lastUpdated: null,
        totalEntries: 0,
        logs: []
      };
    }
  },

  /**
   * Get completion data for current user
   * @returns {Object|null} - Completion data or null if not completed
   */
  getUserCompletionData: () => {
    const identityNo = localStorage.getItem('identityNo');
    if (!identityNo) return null;
    
    const completionData = localStorage.getItem('termsAcceptanceCompleted');
    if (!completionData) return null;
    
    const parsed = JSON.parse(completionData);
    return parsed.identityNo === identityNo ? parsed : null;
  },

  /**
   * Clear all terms data (admin function - use with caution)
   */
  clearAllTermsData: () => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('termsCompleted_') || 
          key === 'termsAcceptanceLogs' || 
          key === 'termsAcceptanceCompleted') {
        localStorage.removeItem(key);
      }
    });
  },

  /**
   * Reset terms for specific user (admin function)
   * @param {string} identityNo - User's PAN number
   */
  resetUserTerms: (identityNo) => {
    if (!identityNo) return;
    
    // Remove completion flag
    localStorage.removeItem(`termsCompleted_${identityNo}`);
    
    // Remove logs for this user
    const allLogs = JSON.parse(localStorage.getItem('termsAcceptanceLogs') || '[]');
    const filteredLogs = allLogs.filter(log => log.identityNo !== identityNo);
    localStorage.setItem('termsAcceptanceLogs', JSON.stringify(filteredLogs));
    
    // Remove completion data if it belongs to this user
    const completionData = localStorage.getItem('termsAcceptanceCompleted');
    if (completionData) {
      const parsed = JSON.parse(completionData);
      if (parsed.identityNo === identityNo) {
        localStorage.removeItem('termsAcceptanceCompleted');
      }
    }
  },

  /**
   * Export logs as JSON file (for admin download)
   * @returns {string} - JSON string of all logs
   */
  exportLogsAsJson: () => {
    const logs = termsService.getAllAcceptanceLogs();
    const exportData = {
      exportedAt: new Date().toISOString(),
      totalEntries: logs.length,
      logs: logs
    };
    
    return JSON.stringify(exportData, null, 2);
  },

  /**
   * Save current logs to JSON file (Manual admin export)
   */
  saveLogsToJSONFile: () => {
    const logs = termsService.getAllAcceptanceLogs();
    const exportData = {
      exportedAt: new Date().toISOString(),
      totalEntries: logs.length,
      logs: logs
    };
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    downloadJSONFile(exportData, `terms-logs-export-${timestamp}.json`);
  },

  /**
   * Load logs from JSON file
   * @param {File} file - JSON file containing logs
   * @returns {Promise<boolean>} - Success status
   */
  loadLogsFromJSONFile: (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const fileContent = JSON.parse(e.target.result);
          const logs = fileContent.logs || fileContent; // Support both formats
          
          // Merge with existing logs (avoid duplicates)
          const existingLogs = termsService.getAllAcceptanceLogs();
          const mergedLogs = [...existingLogs];
          
          logs.forEach(newLog => {
            const exists = existingLogs.some(existing => 
              existing.identityNo === newLog.identityNo && 
              existing.filename === newLog.filename &&
              existing.acceptedAt === newLog.acceptedAt
            );
            if (!exists) {
              mergedLogs.push(newLog);
            }
          });
          
          // Save merged logs
          localStorage.setItem('termsAcceptanceLogs', JSON.stringify(mergedLogs));
          console.log(`Loaded ${logs.length} entries from JSON file. Total entries: ${mergedLogs.length}`);
          resolve(true);
        } catch (error) {
          console.error('Error loading JSON file:', error);
          resolve(false);
        }
      };
      reader.readAsText(file);
    });
  },

  /**
   * Add a log entry and update internal JSON file
   * @param {Object} logEntry - Log entry to add
   */
  addLogEntry: (logEntry) => {
    // Get existing logs
    const existingLogs = JSON.parse(localStorage.getItem('termsAcceptanceLogs') || '[]');
    existingLogs.push(logEntry);
    
    // Save to localStorage (for user functionality)
    localStorage.setItem('termsAcceptanceLogs', JSON.stringify(existingLogs));
    
    // Update internal JSON file (for internal tracking)
    updateInternalJSONFile(existingLogs);
    
    console.log('Log entry added to localStorage and internal JSON file:', logEntry);
    return logEntry;
  },

  /**
   * Get statistics about terms acceptance
   * @returns {Object} - Statistics object
   */
  getAcceptanceStatistics: () => {
    const logs = termsService.getAllAcceptanceLogs();
    const uniqueUsers = [...new Set(logs.map(log => log.identityNo))];
    
    const stats = {
      totalUsers: uniqueUsers.length,
      totalAcceptances: logs.length,
      documentsAccepted: {},
      userCompletionStatus: {}
    };
    
    // Count acceptances per document
    logs.forEach(log => {
      if (!stats.documentsAccepted[log.filename]) {
        stats.documentsAccepted[log.filename] = 0;
      }
      stats.documentsAccepted[log.filename]++;
    });
    
    // Check completion status for each user
    uniqueUsers.forEach(identityNo => {
      stats.userCompletionStatus[identityNo] = termsService.hasUserCompletedTerms(identityNo);
    });
    
    return stats;
  },

  /**
   * Validate that all required documents exist
   * @returns {Object} - Validation result
   */
  validateDocuments: async () => {
    const documents = [
      '/Acknowledgement/CRM2-HIPAA Security Awareness &Training.pdf',
      '/Acknowledgement/CRM3-Code Ethics & Business Conduct-CEBC.1.pdf',
      '/Acknowledgement/CRM5-1.0-POSH-Awareness & Education.pdf'
    ];
    
    const results = {
      allValid: true,
      missingDocuments: [],
      availableDocuments: []
    };
    
    for (const docPath of documents) {
      try {
        const response = await fetch(docPath, { method: 'HEAD' });
        if (response.ok) {
          results.availableDocuments.push(docPath);
        } else {
          results.missingDocuments.push(docPath);
          results.allValid = false;
        }
      } catch (error) {
        results.missingDocuments.push(docPath);
        results.allValid = false;
      }
    }
    
    return results;
  }
};

export default termsService;
