import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Breadcrumb } from '..';

const FAQContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: theme.palette.background.paper,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: '8px !important',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: theme.spacing(0, 0, 2, 0),
  },
}));

const faqSections = [
  {
    title: 'Getting Started',
    items: [
      {
        question: 'What can I do on the Employee Self-Service Portal?',
        answer:
          'You can view and update personal information, access pay slips, view company policies, update emergency contacts, and access your employment documents.',
      },
      {
        question: 'Is my information secure on the portal?',
        answer:
          'Yes. All information is encrypted and access-controlled. The portal complies with data privacy regulations and company confidentiality policies.',
      },
    ],
  },
  {
    title: 'Personal Information',
    items: [
      {
        question: 'How do I update my personal information?',
        answer:
          'Log in to the portal and navigate to your profile to update your address, contact details, emergency contacts, and more. Submit changes through the portal. Some updates may require HR approval.',
      },
      {
        question: 'What documents do I need to submit when updating information?',
        answer:
          'Provide relevant supporting documents such as address proof for address changes,NDA,Bank Account details.',
      },
      {
        question: 'How long does it take for my information updates to be approved?',
        answer:
          "Most updates are processed within 2-3 business days. You'll receive email notification once approved or if additional information is needed.",
      },
    ],
  },
  {
    title: 'Salary & Compensation',
    items: [
      {
        question: 'Where can I view my salary details?',
        answer:
          'Access "Salary Slips" section to view your salary breakup, deductions, and net pay.',
      },
      {
        question: 'How do I download my pay slips?',
        answer: 'Go to "Salary Slips" -> select the month. Click "Download" to save the PDF.',
      },
      {
        question: 'When is my salary credited?',
        answer:
          'Salary is typically credited on the 3rd, 5th or 7th of the following month, subject to successful BGV completion and client confirmation.',
      },
    ],
  },
  {
    title: 'Leave Management',
    items: [
      {
        question: 'How do I apply for leave?',
        answer:
          'Go to "Leave" → "Apply Leave" → Select leave type and dates → Add reason → Submit. You\'ll receive approval status via email or via hovering and clicking on "Apply Leave" on the preferred date in the calendar card ',
      },
      {
        question: 'How do I check my leave balance?',
        answer:
          'View your available leave balance in the "Calendar card" in homepage or "Apply Leave" page.',
      },
      {
        question: 'What types of leave are available?',
        answer:
          'Leave entitlements are stated in your Appointment Letter. Common types include casual leave, sick leave, privilege leave, and statutory leaves like maternity leave.',
      },
    ],
  },
  {
    title: 'Attendance & Timesheets',
    items: [
      {
        question: 'How do I view my attendance record?',
        answer:
          'Access "Attendance" section to view daily attendance, and monthly attendance summary.',
      },
      {
        question: 'How do I submit my timesheet?',
        answer:
          'Go to "Timesheet" → Fill in daily hours worked → Submit for approval. For queries, contact ts-ibm@dynproindia.com (IBM employees) or ts@dynproindia.com (all others).',
      },
      // {
      //   question: 'What if I forgot to mark attendance?',
      //   answer:
      //     'Submit an attendance regularization request through the portal with justification. Manager approval is required.',
      // },
    ],
  },
  {
    title: 'Documents & Certificates',
    items: [
      {
        question: 'Where can I access my employment documents?',
        answer:
          'Navigate to "Document Center" to access your Appointment Letter, salary slips, Form 16, and other employment-related documents.',
      },
      {
        question: 'How do I download Form 16 for tax filing?',
        answer:
          'Go to "Document Center" → "Tax Documents" → Select financial year → Download Form 16. Available after financial year-end.',
      },
    ],
  },
  {
    title: 'Workplace Policies',
    items: [
      {
        question: 'What is the dress code at DynPro?',
        answer:
          'All employees are required to wear:\n\n\n' +
          '• Business Formals on all weekdays (Monday-Thursday)\n' +
          '• Business Casuals on Fridays and weekends\n\n' +
          'Business Formals include:\n' +
          '- For Men: Formal shirts, trousers, blazers (as required), formal shoes\n' +
          '- For Women: ' +
          'Business Casuals include:\n' +
          '- For Men: Collared shirts/polos with chinos or dress pants\n' +
          '- For Women:' +
          'Please ensure your attire is neat, clean, and professional at all times.',
      },
    ],
  },
  {
    title: 'Support & Queries',
    items: [
      {
        question: 'How do I raise an HR query?',
        answer:
          'Go to "Support" → "Raise Ticket" → Select query category → Describe issue → Submit. Or email: Level 1: hrsupport-1@dynproindia.com, Level 2: hrsupport-2@dynproindia.com, Level 3 (escalation): hrsupport-3@dynproindia.com',
      },
      {
        question: 'How do I report technical issues with the portal?',
        answer:
          'Submit a ticket under "Support" → "Technical Issues" or contact IT helpdesk through the portal.',
      },
    ],
  },
];
const FAQ = () => {
  return (
    <>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'FAQ' }]} />
      </Box>
      <FAQContainer id="faq">
        <Container maxWidth="md">
          <SectionTitle variant="h3" component="h2">
            Frequently Asked Questions
          </SectionTitle>

          {faqSections.map((section, sectionIndex) => (
            <Box key={sectionIndex} sx={{ mb: 6 }}>
              <Typography
                variant="h5"
                component="h3"
                sx={({ palette }) => ({
                  mb: 3,
                  color: 'text.primary',
                  fontWeight: 600,
                  borderBottom: '2px solid',
                  borderColor: 'divider',
                  pb: 1,
                  display: 'inline-block',
                  '&:hover': {
                    color: palette.mode === 'dark' ? 'primary.light' : 'primary.dark',
                    transition: 'color 0.3s ease',
                  },
                  transition: 'color 0.3s ease',
                })}
              >
                {section.title}
              </Typography>

              {section.items.map((faq, itemIndex) => (
                <StyledAccordion key={`${sectionIndex}-${itemIndex}`}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`faq-panel-${sectionIndex}-${itemIndex}-content`}
                    id={`faq-panel-${sectionIndex}-${itemIndex}-header`}
                  >
                    <Typography variant="subtitle1" fontWeight={600}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </StyledAccordion>
              ))}
            </Box>
          ))}

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              Still have questions? Contact HR Support at{' '}
              <a
                href="mailto:hrsupport-pre-ob@dynproindia.com"
                style={{ color: 'inherit', textDecoration: 'underline' }}
              >
                hrsupport-1@dynproindia.com
              </a>{' '}
              or call{' '}
              <a href="tel:07348940777" style={{ color: 'inherit', textDecoration: 'underline' }}>
                06360786994
              </a>
            </Typography>
          </Box>
        </Container>
      </FAQContainer>
    </>
  );
};

export default FAQ;
