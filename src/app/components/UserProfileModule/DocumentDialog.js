// DocumentDialog.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import VisibilityIcon from '@mui/icons-material/Visibility';

const DocumentDialog = ({ open, onClose, documents, loading, handleDownload, handlePreview }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle sx={{ color: '#00246b', fontWeight: 'bold' }}>Documents</DialogTitle>
    <hr style={{ border: '1px solid #00246b', margin: '8px 0' }} />
    <DialogContent>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <List>
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={doc.doc_name}
                  sx={{ color: '#59919d', fontWeight: 'bold' }}
                />
                <ListItemSecondaryAction>
                  <Tooltip title="View">
                    <IconButton
                      edge="end"
                      onClick={() => handlePreview(doc.id, doc.doc_name)}
                      sx={{ color: '#59919d' }} // Style the view button
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  {/* <IconButton
                    edge="end"
                    onClick={() => handleDownload(doc.id, doc.doc_name)}
                    sx={{ color: '#00246b' }}
                  >
                    <GetAppIcon />
                  </IconButton> */}
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <Typography>No documents available</Typography>
          )}
        </List>
      )}
    </DialogContent>
  </Dialog>
);

export default DocumentDialog;
