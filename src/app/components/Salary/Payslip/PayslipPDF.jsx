// import React from 'react';
// import {
//   Box,
//   Typography,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from '@mui/material';

// const PayslipPDF = () => {
//   return (
//     <Box
//       sx={{ p: 2, border: '1px solid #ddd', borderRadius: '8px', maxWidth: '995px', mx: 'auto' }}
//     >
//       {/* Header Section */}
//       <Grid container spacing={2} sx={{ mb: 3 }}>
//         <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start' }}>
//           <img
//             src="https://www.dynpro.com/wp-content/uploads/2022/01/dynpro-logo-2-1-e1641987897332.png"
//             alt="Company Logo"
//             style={{ maxWidth: '150px' }}
//           />
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           sx={{
//             textAlign: 'center',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Typography variant="h6" sx={{ mt: 2 }}>
//             DynPro India Pvt. Ltd.
//           </Typography>
//           <Typography variant="subtitle2" sx={{ mt: 1 }}>
//             1st Floor, C Wing, Teerth Technospace, Sr. No. 103, Mumbai Pune Bangalore Highway Pashan
//             Exit Teerth2Work, Baner, Pune, Maharashtra 411045
//           </Typography>
//         </Grid>
//       </Grid>

//       {/* Employee Details Box with Outline */}
//       <Box
//         sx={{
//           p: 2,
//           backgroundColor: 'transparent',
//           border: '2px solid black',
//           borderRadius: '4px',
//           mb: 3,
//           maxWidth: '100%',
//           mx: 'auto',
//           boxSizing: 'border-box',
//         }}
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             flexWrap: 'wrap',
//           }}
//         >
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
//                 <strong style={{ marginRight: '8px' }}>Employee Name:</strong> John Doe
//               </Typography>
//               <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
//                 <strong style={{ marginRight: '8px' }}>Employee ID:</strong> 12345
//               </Typography>
//               <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
//                 <strong style={{ marginRight: '8px' }}>Region:</strong> Region Name
//               </Typography>
//               <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
//                 <strong style={{ marginRight: '8px' }}>Bank Name:</strong> Bank XYZ
//               </Typography>
//               <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
//                 <strong style={{ marginRight: '8px' }}>Account Name:</strong> John Doe
//               </Typography>
//               <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
//                 <strong style={{ marginRight: '8px' }}>UAN No:</strong> 1234567890
//               </Typography>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
//                 <strong style={{ marginRight: '8px' }}>Monthly Salary:</strong> ₹60,000
//               </Typography>
//               <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
//                 <strong style={{ marginRight: '8px' }}>Per Day (INR):</strong> ₹2,000
//               </Typography>
//               <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
//                 <strong style={{ marginRight: '8px' }}>Total Payable Days:</strong> 30
//               </Typography>
//               <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
//                 <strong style={{ marginRight: '8px' }}>PAN:</strong> ABCDE1234F
//               </Typography>
//               <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
//                 <strong style={{ marginRight: '8px' }}>PF No:</strong> PF123456
//               </Typography>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>

//       {/* Pay Elements Table */}
//       <TableContainer
//         component={Paper}
//         sx={{ maxWidth: '100%', mx: 'auto', border: '2px solid black', mb: 2 }}
//       >
//         <Table aria-label="pay elements table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="center" sx={{ border: '1px solid black', width: '15%' }}>
//                 <strong>PAY ELEMENTS</strong>
//               </TableCell>
//               <TableCell align="center" sx={{ border: '1px solid black', width: '15%' }}>
//                 <strong>MONTHLY SALARY</strong>
//               </TableCell>
//               <TableCell align="center" sx={{ border: '1px solid black', width: '15%' }}>
//                 <strong>EARNINGS</strong>
//               </TableCell>
//               <TableCell align="center" sx={{ border: '1px solid black', width: '15%' }}>
//                 <strong>DEDUCTIONS</strong>
//               </TableCell>
//               <TableCell align="center" sx={{ border: '1px solid black', width: '15%' }}>
//                 <strong>AMOUNT</strong>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//         </Table>
//       </TableContainer>

//       {/* Pay Elements Details Table */}
//       <TableContainer
//         component={Paper}
//         sx={{ maxWidth: '100%', mx: 'auto', border: '2px solid black', mb: 2 }}
//       >
//         <Table aria-label="pay elements details table">
//           <TableBody>
//             <TableRow>
//               <TableCell align="left" sx={{ border: '1px solid black', padding: '8px 16px' }}>
//                 <Box sx={{ fontWeight: 'bold', mb: 1 }}>Component - A</Box>
//                 <Box>Basic Salary</Box>
//                 <Box>House Rent Allowance</Box>
//                 <Box>Special Allowance</Box>
//                 <Box>Gratuity Benefit Paid</Box>
//                 <Box>Statutory Interim Bonus</Box>
//                 <Box>Shift Allowance</Box>
//                 <Box sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Component - B</Box>
//                 <Box>Gratuity Benefit</Box>
//                 <Box>Employer's Contribution to P.F.</Box>
//               </TableCell>
//               <TableCell align="center" sx={{ border: '1px solid black' }}>
//                 ₹20,000
//                 <Box>₹5,000</Box>
//                 <Box>₹3,000</Box>
//                 <Box>₹2,000</Box>
//                 <Box>₹1,500</Box>
//                 <Box>₹1,200</Box>
//                 <Box sx={{ mt: 2, mb: 1 }}>₹4,000</Box>
//                 <Box>₹1,500</Box>
//                 <Box>₹2,000</Box>
//               </TableCell>
//               <TableCell align="center" sx={{ border: '1px solid black' }}>
//                 ₹20,000
//                 <Box>₹5,000</Box>
//                 <Box>₹3,000</Box>
//                 <Box>₹2,000</Box>
//                 <Box>₹1,500</Box>
//                 <Box>₹1,200</Box>
//                 <Box sx={{ mt: 2, mb: 1 }}>₹4,000</Box>
//                 <Box>₹1,500</Box>
//                 <Box>₹2,000</Box>
//               </TableCell>
//               <TableCell align="left" sx={{ border: '1px solid black', padding: '8px 16px' }}>
//                 <Box>Profession Tax</Box>
//                 <Box>Tax Deducted at Source</Box>
//                 <Box>Other Deductions</Box>
//                 <Box>Employee PF</Box>
//                 <Box>ESI</Box>
//                 <Box>LWF</Box>
//               </TableCell>
//               <TableCell align="center" sx={{ border: '1px solid black' }}>
//                 ₹1,500
//                 <Box>₹1,200</Box>
//                 <Box>₹800</Box>
//                 <Box>₹1,000</Box>
//                 <Box>₹500</Box>
//                 <Box>₹200</Box>
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Totals Table */}
//       <TableContainer
//         component={Paper}
//         sx={{ maxWidth: '100%', mx: 'auto', border: '2px solid black', mb: 2 }}
//       >
//         <Table aria-label="totals table">
//           <TableBody>
//             {/* NET PAY Row */}
//             <TableRow>
//               <TableCell
//                 align="left"
//                 sx={{ border: '1px solid black', padding: '8px 16px', fontWeight: 'bold' }}
//               >
//                 TOTAL
//               </TableCell>
//               <TableCell align="center" sx={{ border: '1px solid black' }}>
//                 ₹50,000
//               </TableCell>
//               <TableCell align="center" sx={{ border: '1px solid black' }}>
//                 ₹60,000
//               </TableCell>
//               <TableCell
//                 align="left"
//                 sx={{ border: '1px solid black', padding: '8px 4px', fontWeight: 'bold' }}
//               >
//                 TOTAL DEDUCTIONS
//               </TableCell>
//               <TableCell align="center" sx={{ border: '1px solid black' }}>
//                 ₹53,800
//               </TableCell>
//             </TableRow>

//             {/* NET PAY (In Words) Row */}
//             <TableRow>
//               <TableCell
//                 align="center"
//                 sx={{ border: '1px solid black', padding: '8px 16px' }}
//               >
//                 <Typography variant="subtitle2" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
//                   NET PAY (In Words)
//                 </Typography>
//               </TableCell>
//               <TableRow align="center" >
//                 <Typography variant="subtitle2" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
//                   Sixty Thousand Rupees Only
//                 </Typography>
//               </TableRow>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//       {/* Computer-generated statement */}
//       <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
//         This is a computer-generated payslip. No signature is required.
//       </Typography>
//     </Box>
//   );
// };

// export default PayslipPDF;
