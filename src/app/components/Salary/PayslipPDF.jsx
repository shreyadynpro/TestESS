import React, { useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';

// Base64-encoded logo string
const companyLogoBase64 = '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';

const PayslipPDF = () => {
  const pdfRef = useRef();

  useEffect(() => {
    const element = pdfRef.current;

    const options = {
      margin: [0.5, 0.5],
      filename: 'payslip.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    if (element) {
      html2pdf().from(element).set(options).save();
    }
  }, []);

  return (
    <div ref={pdfRef}>
      <style>
        {`
          table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid black;
          }
          table td {
            line-height: 25px;
            padding-left: 15px;
          }
          table th {
            background-color: #d9d9d9;
            color: #363636;
          }
        `}
      </style>

      {/* Company Logo and Name */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src="https://www.dynpro.com/wp-content/uploads/2022/01/dynpro-logo-2-1-e1641987897332.png" alt="Company Logo" style={{ width: '150px' }} />
        <h1>DynPro India Pvt Ltd</h1>
        <p>1st Floor, C Wing, Teerth Technospace, Sr. No. 103, Mumbai Pune Bangalore Highway Pashan Exit Teerth2Work, Baner, Pune, Maharashtra 411045</p>
      </div>

      {/* Employee Details Table */}
      <table border="1">
        <tbody>
          <tr>
            <th>Employee Name</th>
            <td>Chandra</td>
          </tr>
          <tr>
            <th>Employee ID</th>
            <td>0123456</td>
          </tr>
          <tr>
            <th>Region</th>
            <td>India</td>
          </tr>
          <tr>
            <th>Bank Name</th>
            <td>x0x0x0</td>
          </tr>
          <tr>
            <th>Account Name</th>
            <td>0x2x6x25x6</td>
          </tr>
          <tr>
            <th>UAN No</th>
            <td>UAN1234567</td>
          </tr>
          <tr>
            <th>Monthly Salary</th>
            <td>Rs. 30000</td>
          </tr>
          <tr>
            <th>Per Day (INR)</th>
            <td>Rs. 1000</td>
          </tr>
          <tr>
            <th>Total Payable Days</th>
            <td>30</td>
          </tr>
          <tr>
            <th>PAN</th>
            <td>ABCDE1234F</td>
          </tr>
          <tr>
            <th>PF No</th>
            <td>26123456</td>
          </tr>
        </tbody>
      </table>

      <br />

      {/* Earnings Table */}
      <table border="1">
        <tbody>
          <tr>
            <th>Earnings</th>
            <th>Amount</th>
          </tr>
          <tr>
            <th>Component A:</th>
            <td></td>
          </tr>
          <tr>
            <td>Basic Salary</td>
            <td>29000</td>
          </tr>
          <tr>
            <td>House Rent Allowance</td>
            <td>2000</td>
          </tr>
          <tr>
            <td>Special Allowance</td>
            <td>400</td>
          </tr>
          <tr>
            <td>Gratuity Benefit Paid</td>
            <td>5000</td>
          </tr>
          <tr>
            <td>Statutory Interim Bonus</td>
            <td>3000</td>
          </tr>
          <tr>
            <td>Shift Allowance</td>
            <td>1000</td>
          </tr>
          <tr>
            <th>Component B:</th>
            <td></td>
          </tr>
          <tr>
            <td>Gratuity Benefit</td>
            <td>500</td>
          </tr>
          <tr>
            <td>Employer's Contribution to PF</td>
            <td>1500</td>
          </tr>
          <tr>
            <th>Monthly Salary</th>
            <td>Rs. 30000</td>
          </tr>
          <tr>
            <th>Total Earnings</th>
            <td>Rs. 38500</td>
          </tr>
        </tbody>
      </table>

      <br />

      {/* Deductions Table */}
      <table border="1">
        <tbody>
          <tr>
            <th>Deductions</th>
            <th>Amount</th>
          </tr>
          <tr>
            <td>Profession Tax</td>
            <td>500</td>
          </tr>
          <tr>
            <td>Tax Deducted at Source</td>
            <td>1000</td>
          </tr>
          <tr>
            <td>Other Deductions</td>
            <td>400</td>
          </tr>
          <tr>
            <td>Employee PF</td>
            <td>1500</td>
          </tr>
          <tr>
            <td>ESI</td>
            <td>300</td>
          </tr>
          <tr>
            <td>LWF</td>
            <td>200</td>
          </tr>
          <tr>
            <th>Gross Deductions</th>
            <td>Rs. 3900</td>
          </tr>
          <tr>
            <th>NET PAY</th>
            <td>Rs. 34600</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PayslipPDF;
