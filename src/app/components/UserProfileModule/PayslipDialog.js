// PayslipDialog.js
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
import DownloadAllIcon from '@mui/icons-material/CloudDownload';

const PayslipDialog = ({
  open,
  onClose,
  payslipData,
  loading,
  downloadPayslip,
  downloadAllPayslips,
}) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle sx={{ color: '#00246b', fontWeight: 'bold' }}>
      Payslip List
      <Tooltip title="Download All Payslips">
        <IconButton
          onClick={downloadAllPayslips}
          sx={{ position: 'absolute', right: 16, top: 16, color: '#00246b' }}
        >
          <DownloadAllIcon />
        </IconButton>
      </Tooltip>
    </DialogTitle>
    <hr style={{ border: '1px solid #00246b', margin: '8px 0' }} />
    <DialogContent>
      {loading ? (
        <Typography>Loading Payslips...</Typography>
      ) : (
        <List>
          {payslipData.length > 0 ? (
            payslipData.map((payslip, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={payslip.month_year}
                  sx={{ color: '#59919d', fontWeight: 'bold', fontSize: '22px' }}
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Download Payslips">
                    <IconButton
                      edge="end"
                      onClick={() => downloadPayslip(payslip.month_year)}
                      sx={{ color: '#00246b' }}
                    >
                      <GetAppIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <Typography>No Payslips available</Typography>
          )}
        </List>
      )}
    </DialogContent>
  </Dialog>
);

export default PayslipDialog;
