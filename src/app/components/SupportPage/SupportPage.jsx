import {
  AttachFile as AttachFileIcon,
  HelpOutline as HelpOutlineIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import {
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/system';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SnackbarUtils from 'SnackbarUtils';
import axios from 'axios.js';
import commonConfig from '../commonConfig';
import { Breadcrumb } from '..';

const PageWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SupportCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow:
    theme.palette.mode === 'light'
      ? '0 10px 30px rgba(15, 23, 42, 0.12)'
      : '0 10px 30px rgba(0, 0, 0, 0.7)',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const SidebarCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: theme.spacing(2),
  boxShadow:
    theme.palette.mode === 'light'
      ? '0 8px 24px rgba(15, 23, 42, 0.08)'
      : '0 8px 24px rgba(0, 0, 0, 0.7)',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const initialValues = {
  category: '',
  subject: '',
  description: '',
  preferredContact: '',
};

const validationSchema = Yup.object().shape({
  category: Yup.string().required('Please select a category'),
  subject: Yup.string().required('Please enter a subject'),
  description: Yup.string()
    .required('Please describe your issue')
    .min(10, 'Description should be at least 10 characters'),
  preferredContact: Yup.string(),
});

const categories = [
  'HR & Payroll',
  'IT & Systems',
  'Facilities & Infrastructure',
  'Policy & Compliance',
  'Workplace Experience & Culture',
  'Manager / Reporting',
  'Other (please specify in description)',
];

const quickTopics = [
  { label: 'Payslip / CTC clarification', anchor: 'Salary & Compensation' },
  { label: 'Leave or holiday query', anchor: 'Leave Management' },
  { label: 'Attendance / timesheet issue', anchor: 'Attendance & Timesheets' },
  { label: 'Portal / login problem', anchor: 'Getting Started' },
];

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_FILE_TYPES =
  '.png,.jpg,.jpeg,.pdf,.doc,.docx,.xls,.xlsx,.txt,image/*,application/pdf';

const SupportPage = () => {
  const [loading, setLoading] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [ticketHistory, setTicketHistory] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // ---------------------------------------------------
  // API 1: FETCH TICKET HISTORY
  // ---------------------------------------------------
  const fetchTicketHistory = async () => {
    try {
      const res = await axios.get(commonConfig.urls.ticketHistory);
      setTicketHistory(res.data || []);
    } catch (error) {
      console.error('Failed to load ticket history');
    }
  };

  useEffect(() => {
    fetchTicketHistory();
  }, []);

  // ---------------------------------------------------
  // API 2: UPLOAD SINGLE ATTACHMENT (optional)
  // ---------------------------------------------------
  const uploadSingleAttachment = async (file) => {
    try {
      const fd = new FormData();
      fd.append('file', file);

      const response = await axios.post(commonConfig.urls.uploadAttachment, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data?.fileUrl; // backend returns uploaded URL
    } catch (err) {
      SnackbarUtils.error('Attachment upload failed.');
      return null;
    }
  };

  // ---------------------------------------------------
  // FILE HANDLING
  // ---------------------------------------------------
  const handleFilesChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const existingCount = attachedFiles.length;
    const availableSlots = MAX_FILES - existingCount;
    const nextFiles = files.slice(0, availableSlots);

    const tooMany = files.length > availableSlots;
    const oversizeFiles = nextFiles.filter((f) => f.size > MAX_FILE_SIZE_MB * 1024 * 1024);

    if (tooMany) SnackbarUtils.error(`You can attach up to ${MAX_FILES} files per ticket.`);
    if (oversizeFiles.length)
      SnackbarUtils.error(`Each file must be smaller than ${MAX_FILE_SIZE_MB} MB.`);

    const valid = nextFiles.filter((f) => f.size <= MAX_FILE_SIZE_MB * 1024 * 1024);
    setAttachedFiles((prev) => [...prev, ...valid]);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------------------------------------------------
  // API 3: SUBMIT SUPPORT TICKET
  // ---------------------------------------------------
  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);

      // Step 1: Upload attachments (if required)
      const uploadedLinks = [];
      for (const file of attachedFiles) {
        const url = await uploadSingleAttachment(file);
        if (url) uploadedLinks.push(url);
      }

      // Step 2: Create ticket
      const formData = new FormData();
      formData.append('type', 'support_ticket');
      formData.append('category', values.category);
      formData.append('subject', values.subject);
      formData.append('description', values.description);
      formData.append('preferredContact', values.preferredContact || '');
      formData.append('uploadedFiles', JSON.stringify(uploadedLinks));

      const response = await axios.post(commonConfig.urls.supportTicket, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response?.data?.Status === 'Success') {
        SnackbarUtils.success('Your ticket has been submitted successfully.');
        resetForm();
        setAttachedFiles([]);
        fetchTicketHistory();
      } else {
        SnackbarUtils.error(response.data?.Message || 'Unable to submit ticket.');
      }
    } catch (error) {
      SnackbarUtils.error('Something went wrong during submission.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickTopicClick = (label, anchor) => {
    navigate('/faq');
  };

  // ---------------------------------------------------
  // UI START
  // ---------------------------------------------------
  return (
    <PageWrapper>
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: 'Support' }, { name: 'Raise Ticket' }]} />
      </Box>

      <HeaderSection>
        <Typography variant="h4" fontWeight={700} gutterBottom component="h1">
          Help & Support Center
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Can&apos;t find what you need in the FAQ? Share details and our team will help quickly.
        </Typography>
      </HeaderSection>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* LEFT PANEL - FORM */}
          <Grid item xs={12} md={8}>
            <SupportCard>
              <Box display="flex" alignItems="center" mb={2}>
                <Box
                  sx={{
                    mr: 1.5,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#212e7c',
                    color: '#ffffff',
                  }}
                >
                  <HelpOutlineIcon fontSize="small" />
                </Box>
                <Typography variant="h6" fontWeight={600}>
                  Raise a support request
                </Typography>
              </Box>

              <Typography variant="body2" mb={2}>
                Provide detailed information & attach files if needed.
              </Typography>

              {/* FORM */}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2.5}>
                      {/* CATEGORY */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          select
                          fullWidth
                          name="category"
                          label="What is this related to?"
                          value={values.category}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.category && errors.category)}
                          helperText={touched.category && errors.category}
                        >
                          {categories.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      {/* CONTACT */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="preferredContact"
                          label="Preferred contact (optional)"
                          value={values.preferredContact}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.preferredContact && errors.preferredContact)}
                          helperText={touched.preferredContact && errors.preferredContact}
                        />
                      </Grid>

                      {/* SUBJECT */}
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="subject"
                          label="Short summary"
                          value={values.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.subject && errors.subject)}
                          helperText={touched.subject && errors.subject}
                        />
                      </Grid>

                      {/* DESCRIPTION */}
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          minRows={5}
                          name="description"
                          label="Describe what's happening"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.description && errors.description)}
                          helperText={
                            touched.description && errors.description
                              ? errors.description
                              : 'Include reproduction steps, error messages, etc.'
                          }
                        />
                      </Grid>

                      {/* ATTACHMENTS - DEBUG */}
                      <Grid item xs={12}>
                        <div
                          style={{
                            border: '2px dashed red',
                            padding: '16px',
                            backgroundColor: '#fff3f3',
                            margin: '16px 0',
                          }}
                        >
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                              variant="subtitle2"
                              style={{
                                fontWeight: 600,
                                color: '#d32f2f',
                                fontSize: '0.875rem',
                              }}
                            >
                              ATTACHMENTS
                            </Typography>
                            <input
                              ref={fileInputRef}
                              type="file"
                              multiple
                              accept={ACCEPTED_FILE_TYPES}
                              style={{
                                position: 'absolute',
                                width: '1px',
                                height: '1px',
                                padding: 0,
                                margin: '-1px',
                                overflow: 'hidden',
                                clip: 'rect(0,0,0,0)',
                                border: 0,
                              }}
                              onChange={handleFilesChange}
                            />
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                fileInputRef.current?.click();
                              }}
                              style={{
                                background: '#d32f2f',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '14px',
                                fontWeight: 500,
                              }}
                            >
                              <AttachFileIcon fontSize="small" />
                              <span>Add Attachments</span>
                            </button>
                          </Box>

                          {attachedFiles.length > 0 && (
                            <div style={{ marginTop: '12px' }}>
                              <div
                                style={{
                                  fontSize: '12px',
                                  color: '#666',
                                  marginBottom: '8px',
                                }}
                              >
                                Files to be attached:
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {attachedFiles.map((file, index) => (
                                  <div
                                    key={index}
                                    style={{
                                      background: '#f5f5f5',
                                      padding: '4px 8px',
                                      borderRadius: '4px',
                                      fontSize: '12px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                    }}
                                  >
                                    <span>{file.name}</span>
                                    <span style={{ color: '#999' }}>
                                      ({(file.size / 1024 / 1024).toFixed(1)} MB)
                                    </span>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleRemoveFile(index);
                                      }}
                                      style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#d32f2f',
                                        cursor: 'pointer',
                                        padding: '2px 4px',
                                        marginLeft: '4px',
                                        fontSize: '14px',
                                      }}
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </Grid>

                      {/* SUBMIT BUTTON */}
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <LoadingButton
                          type="submit"
                          variant="contained"
                          loading={loading}
                          sx={{ backgroundColor: '#212e7c' }}
                        >
                          Submit Ticket
                        </LoadingButton>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </SupportCard>
          </Grid>

          {/* RIGHT PANEL - CONTACT + FAQ */}
          <Grid item xs={12} md={4}>
            <SidebarCard>
              {/* CONTACT INFO */}
              <Typography variant="subtitle1" fontWeight={600}>
                We&apos;re here to help
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary="HR support" secondary="pre-ob@dynproindia.com" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText primary="HR helpline" secondary="+91-07348940777" />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              {/* QUICK TOPICS */}
              <Typography variant="subtitle2">Popular topics</Typography>
              <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                {quickTopics.map((t) => (
                  <Chip
                    key={t.label}
                    label={t.label}
                    clickable
                    onClick={() => handleQuickTopicClick(t.label, t.anchor)}
                  />
                ))}
              </Box>

              {/* TICKET HISTORY */}
              <Typography variant="subtitle2">Your Ticket History</Typography>
              {ticketHistory.length === 0 ? (
                <Typography variant="caption" color="text.secondary">
                  No previous tickets found.
                </Typography>
              ) : (
                <List dense>
                  {ticketHistory.map((t) => (
                    <ListItem key={t.ticketId}>
                      <ListItemText primary={t.subject} secondary={t.status} />
                    </ListItem>
                  ))}
                </List>
              )}
            </SidebarCard>
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
};

export default SupportPage;
