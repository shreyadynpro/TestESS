'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Fade,
  Paper,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { styled } from '@mui/material/styles';

/* ----------------------------------------
   Floating Trigger (Enterprise Style)
----------------------------------------- */
const StyledFab = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 32,
  right: 32,
  zIndex: 1200,
  width: 48,
  height: 48,
  borderRadius: 12,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: theme.shadows[3],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.shadows[4],
  },
}));

/* ----------------------------------------
   Popup Container
----------------------------------------- */
const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 96,
  right: 32,
  width: 380,
  maxHeight: 480,
  zIndex: 1300,
  borderRadius: 10,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[8],
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100% - 32px)',
    right: 16,
    bottom: 88,
    maxHeight: '60vh',
  },
}));

/* ----------------------------------------
   Main Component
----------------------------------------- */
const ImprovementsPopup = () => {
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);
  const fabRef = useRef(null);
  let hoverTimeout;

  /* Close on outside click */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        fabRef.current &&
        !fabRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(hoverTimeout);
    };
  }, []);

  const openPopup = () => {
    clearTimeout(hoverTimeout);
    setOpen(true);
  };

  const closePopup = () => {
    clearTimeout(hoverTimeout);
    setOpen(false);
  };

  const delayedClose = () => {
    hoverTimeout = setTimeout(() => setOpen(false), 200);
  };

  return (
    <>
      {/* Floating Trigger */}
      <Tooltip title="Release notes" arrow>
        <StyledFab
          ref={fabRef}
          onClick={() => setOpen((prev) => !prev)}
          onMouseEnter={openPopup}
          onMouseLeave={delayedClose}
          aria-label="Release notes"
        >
          <AutoAwesomeIcon fontSize="small" />
        </StyledFab>
      </Tooltip>

      {/* Popup */}
      <Fade in={open} timeout={200}>
        <StyledPaper
          ref={popupRef}
          onMouseEnter={openPopup}
          onMouseLeave={delayedClose}
          sx={{
            pointerEvents: open ? 'auto' : 'none',
            opacity: open ? 1 : 0,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 3,
              py: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'background.paper',
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              borderLeft: (theme) => `4px solid ${theme.palette.primary.main}`,
            }}
          >
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="text.primary"
              >
                What’s New
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Version 2.4 · March 2025
              </Typography>
            </Box>

            <IconButton size="small" onClick={closePopup}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Content */}
          <Box
            sx={{
              p: 3,
              flex: 1,
              overflowY: 'auto',
              '&::-webkit-scrollbar': { width: 6 },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'action.hover',
                borderRadius: 3,
              },
            }}
          >
            {/* Section Heading */}
            <Typography
              variant="overline"
              sx={{
                letterSpacing: '0.08em',
                fontWeight: 600,
                color: 'text.secondary',
                mb: 1,
              }}
            >
              Recent Updates
            </Typography>

            {/* Updates List */}
            <Box
              component="ul"
              sx={{
                pl: 3,
                m: 0,
                '& li': {
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  color: 'text.primary',
                  mb: 1.5,
                },
              }}
            >
              <li>Org chart layout and alignment improvements</li>
              <li>Performance optimizations for faster load times</li>
              <li>UI consistency refinements across modules</li>
              <li>Minor bug fixes and stability improvements</li>
            </Box>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              px: 3,
              py: 2,
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              display: 'flex',
              justifyContent: 'flex-end',
              backgroundColor: 'background.default',
            }}
          >
            <Button
              variant="outlined"
              size="small"
              onClick={closePopup}
              sx={{
                textTransform: 'none',
                color: 'text.primary',
                borderColor: 'divider',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              Acknowledge
            </Button>
          </Box>
        </StyledPaper>
      </Fade>
    </>
  );
};

export default ImprovementsPopup;
