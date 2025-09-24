# Terms & Policy Modal System

## Overview
This system provides mandatory Terms & Policy acceptance for users with comprehensive logging.

## Components
- **TermsPolicyModal.jsx**: Main modal component with PDF viewer
- **termsService.js**: Service layer for logging and data management
- **TermsAdminPanel.jsx**: Admin interface for monitoring logs
- **TermsTestComponent.jsx**: Development testing component

## File Structure
```
public/
├── logs/
│   └── terms-acceptance-logs.json    # Internal JSON file for logging
└── Acknowledgement/
    ├── CRM2-HIPAA Security Awareness &Training.pdf
    ├── CRM3-Code Ethics & Business Conduct-CEBC.1.pdf
    └── CRM5-1.0-POSH-Awareness & Education.pdf
```

## How It Works

### User Flow
1. User logs in for the first time
2. System checks `termsService.isTermsAcceptanceRequired()`
3. Modal shows 3 documents sequentially
4. User must accept each document to proceed
5. Acceptance logged to localStorage AND internal JSON file
6. User marked as completed, no future prompts

### Logging System
- **localStorage**: For immediate user functionality
- **Internal JSON file**: For permanent tracking (`/public/logs/terms-acceptance-logs.json`)
- **Export capability**: Admin can download logs for external use

### Data Storage
- `termsCompleted_{identityNo}`: User completion flag
- `termsAcceptanceLogs`: All acceptance entries
- `internal_terms_logs`: Internal JSON file data (localStorage copy)
- `termsAcceptanceCompleted`: Completion metadata

## API Integration Notes
Currently uses localStorage for internal JSON tracking due to browser security limitations. 
When implementing API:
- Replace `updateInternalJSONFile()` with actual API call
- Update JSON file path to server-side location
- Maintain same data structure for consistency

## Usage
```javascript
import { TermsPolicyModal, termsService } from 'app/components/TermsPolicyModal';

// Check if terms required
const isRequired = termsService.isTermsAcceptanceRequired();

// Get logs
const logs = termsService.getAllAcceptanceLogs();
const internalData = termsService.getInternalJSONData();
```
