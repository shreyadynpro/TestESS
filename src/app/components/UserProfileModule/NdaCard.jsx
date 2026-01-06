import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  IconButton,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import SnackbarUtils from 'SnackbarUtils';
import { saveNdaFile, getNdaFile, deleteNdaFile } from 'app/utils/ndaStorage';
 
/**
 * NdaCard
 * Client-side NDA upload/preview/delete using IndexedDB (one file per user)
 * Shown within Company Policies section.
 */
export default function NdaCard() {
  const [ndaFile, setNdaFile] = useState(null);
 
  const loadNda = async () => {
    try {
      const userId = localStorage.getItem('userUniqueId');
      if (!userId) return;
      const rec = await getNdaFile(userId);
      setNdaFile(rec);
    } catch (e) {
      // silent
    }
  };
 
  useEffect(() => {
    loadNda();
  }, []);
 
  const handleSelect = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
 
    if (file.type !== 'application/pdf') {
      SnackbarUtils.warning('Please upload a PDF file.');
      e.target.value = '';
      return;
    }
    const maxBytes = 15 * 1024 * 1024; // 15 MB
    if (file.size > maxBytes) {
      SnackbarUtils.warning('File too large. Max 15 MB.');
      e.target.value = '';
      return;
    }
 
    if (ndaFile) {
      SnackbarUtils.warning('You already uploaded an NDA. Delete it to upload a new one.');
      e.target.value = '';
      return;
    }
 
    try {
      const userId = localStorage.getItem('userUniqueId');
      if (!userId) {
        SnackbarUtils.error('User not identified. Please re-login.');
        e.target.value = '';
        return;
      }
      await saveNdaFile(userId, file);
      await loadNda();
      SnackbarUtils.success('NDA uploaded successfully.');
    } catch (err) {
      SnackbarUtils.error('Failed to store NDA locally.');
    } finally {
      e.target.value = '';
    }
  };
 
  const handlePreview = () => {
    try {
      if (ndaFile && ndaFile.blob) {
        const url = URL.createObjectURL(ndaFile.blob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 30000);
      } else {
        SnackbarUtils.warning('No NDA available to view.');
      }
    } catch (err) {
      SnackbarUtils.error('Failed to preview NDA.');
    }
  };
 
  const handleDelete = async () => {
    try {
      const userId = localStorage.getItem('userUniqueId');
      if (!userId) return;
      await deleteNdaFile(userId);
      setNdaFile(null);
      SnackbarUtils.success('NDA deleted.');
    } catch (err) {
      SnackbarUtils.error('Failed to delete NDA.');
    }
  };
 
  return (
    <Card
      sx={{
        border: '1px solid #59919d',
        borderRadius: '8px',
        boxShadow: 3,
        height: '80%',
      }}
    >
      <CardContent>
        <List>
          <ListItem>
            <ListItemText
              primary={ndaFile ? (ndaFile.name || 'Your NDA.pdf') : 'Upload NDA (PDF)'}
              sx={{ color: '#59919d', fontWeight: '400 !important' }}
            />
            <ListItemSecondaryAction>
              {ndaFile ? (
                <>
                  <Tooltip title="View NDA">
                    <IconButton edge="end" sx={{ color: '#59919d' }} onClick={handlePreview}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete NDA">
                    <IconButton edge="end" sx={{ color: '#b71c1c' }} onClick={handleDelete}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Tooltip title="Upload NDA (PDF)">
                  <IconButton edge="end" sx={{ color: '#00246b' }} component="label">
                    <UploadIcon />
                    <input hidden type="file" accept="application/pdf" onChange={handleSelect} />
                  </IconButton>
                </Tooltip>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
 
 