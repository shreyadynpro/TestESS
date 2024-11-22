import React, { useRef, useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Box,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  TableHead,
  Table,
  TableBody,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/system';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import commonConfig from '../../commonConfig';
import { getAccessToken } from 'app/utils/utils';
import html2pdf from 'html2pdf.js';
import DownloadIcon from '@mui/icons-material/Download';
import DownloadAllIcon from '@mui/icons-material/CloudDownload';

const Payslips = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [months, setMonths] = useState([]);
  const [lastPayslip, setLastPayslip] = useState(null);
  const [payslipData, setPayslipData] = useState(null);
  const [PayslipList, setPayslipList] = useState({});
  const authToken = getAccessToken();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const response = await axios(commonConfig.urls.getMonths, {
          headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
        });
        const fetchedMonths = response.data.Response;
        setMonths(fetchedMonths);

        if (fetchedMonths.length > 0) {
          const lastMonth = fetchedMonths[0].month_year;
          setLastPayslip(lastMonth);
          fetchPayslipData(lastMonth);
          setSelectedMonth(fetchedMonths[0].month_year);
        }
      } catch (error) {
        console.error('Failed to fetch months:', error);
      }
    };

    fetchMonths();
    fetchPayslipList();
  }, []);

  const downloadAllPayslips = async () => {
    try {
      const payslipMonths = PayslipList.map((payslip) => payslip.month_year);
      const response = await axios.post(
        commonConfig.urls.generatePayslipZip, // API for downloading all payslips
        { payslipmonths: payslipMonths },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          responseType: 'blob', // Important to handle binary data
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `All_Payslips.zip`); // Download as a zip file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading all payslips:', error);
    }
  };
  const fetchPayslipData = async (month) => {
    try {
      setLoading(true);
      const [monthPart, year] = month.split(' ');

      const data = {
        year: year,
        month: monthPart,
      };
      const response = await axios.post(commonConfig.urls.getpayslip, data, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setPayslipData(response?.data?.Response?.[0] || null); // Assuming the API returns the payslip data
    } catch (error) {
      console.error('Failed to fetch payslip data:', error);
    } finally {
      setLoading(false); // End loading after fetch
    }
  };
  const fetchPayslipList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(commonConfig.urls.getMonths, {
        // Replace with the new Payslip API
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if (response && response.data && response.data.Response) {
        setPayslipList(response.data.Response); // Bind Payslip data to state
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching Payslip data:', error);
    }
  };
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    fetchPayslipData(month);
  };

  const handleGeneratePdf = () => {
    const filenames = payslipData.month + '_' + payslipData.year + '.pdf';
    const element = document.getElementById('pdf-container');
    const opt = {
      margin: [0.25, 0.25, 0.25, 0.25], // [top, right, bottom, left]
      filename: filenames,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true }, // Enable CORS for external images
      jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' },
    };

    html2pdf().from(element).set(opt).save();
  };
  const downloadPayslip = async (payslipname) => {
    const splitname = payslipname.split(' ');
    try {
      const response = await axios.get(
        commonConfig.urls.generatePayslipPdf + '/' + splitname[0] + '/' + splitname[1],
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          responseType: 'blob', // Important to handle binary data
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${payslipname}.pdf`); // Use a dynamic filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the document:', error);
    }
  };
  const listItemStyle = {
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
    marginBottom: '4px',
    padding: '10px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#ddd',
    },
  };

  return (
    <Container maxWidth="xl">
      <Box position="relative" mb={4}>
        <Box
          display="flex"
          alignItems="center" // Align items vertically centered
          justifyContent="space-between" // Ensure they are spaced
          mb={2}
          mt={2}
          width="23.5%"
        >
          <Typography variant="h3" sx={{ fontSize: '1.8rem', mr: '100px' }}>
            Salary Slips
          </Typography>
          <Tooltip title="Download All Payslips">
            <IconButton onClick={downloadAllPayslips} sx={{ color: '#00246b' }}>
              <DownloadAllIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Left-side Month List */}
        <Grid
          item
          xs={3}
          style={{
            boxShadow: '150px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px',
            backgroundColor: '#ffffff',
          }}
        >
          <List component="nav" aria-label="Months List">
            {months.map((month) => (
              <ListItem
                key={month.month_year}
                sx={{
                  ...listItemStyle,
                  backgroundColor: month.month_year === selectedMonth ? '#cfe2ff' : 'transparent', // Background color for selected month
                }}
                onClick={() => handleMonthChange(month.month_year)}
              >
                <ListItemText primary={month.month_year} />
                {/* Add download icon */}
                <Tooltip title="Download Payslips">
                  <IconButton
                    edge="end"
                    aria-label="download"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the ListItem's onClick
                      downloadPayslip(month.month_year);
                    }}
                  >
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Grid>
        {/* Payslip Details */}
        <Box
          id="pdf-container" // Add ref to the Box you want to convert to PDF
          sx={{
            p: 2,
            border: '1px solid #ddd',
            borderRadius: '8px',
            maxWidth: '995px',
            mx: 'auto',
          }}
        >
          {loading ? (
            // Show the loading state when data is being fetched
            <Typography variant="body1">Loading payslip data...</Typography>
          ) : // Once loading is complete, check if there is data
          payslipData && Object.keys(payslipData).length > 0 ? (
            <>
              {/* Header Section */}
              <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAA0CAYAAAC0LLUwAAAQ7ElEQVR42u2deZRU1Z3HP7cWuptNlEVjMC6TRK2mXehUbByVcVyCJlHjMjoDKprESTDVGDWKNCgNFrIa0zUmhiQmGkePehI1UWeiokE8gralDHS1ICJEERcWRRC6a3l3/ri/Ci9lveoquqst4H7P6dPnvK73+r377ve3fH+/ewssLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLD4DtafcaF1Dox/QK5a2OOW4figc8QHBEk7R8uMATntrTO8rkyYaT/iAQIH5oz2OOYDTVF+rLfX2IQLXNTQOAE4E1gMrVyxtyZSBwEcBZwJVMtG6GrcMsB14V+5rG7AZ2La3kzkaT3wJ+AYwyGOs0jI+bqRknN4CtgBbmuprU5aC3UNgD7nPrwHzgQ3ADcCyMvyPk4CbgcElnJMR4n4gk/MV4IVQOBIH3t+LiTwSuAX4YokRy1ZgLZAAno3GEwuB9U31tY6l4u7BV9med6KvrmFiP+Bt4GXgBKC5rqGxvkzRSKkRiV+80JHAacC1QAyYA5wbCkf67cWRm283zhkEHA+MBWaJUT7O0nAvJHBdw8Qq4CpgLlANNAMPAaOBaXUNjfWSF/cUtEfuVgqCwGHAJcB/AdeGwpEDQuGI2svmTXfHSgHDgPOBudF4oj4aT/gtHfcuD9wH+GfgMlCzgQOAqcAfgJOBFmBUD5O4J1OTL0q4Pwf4gp1qnvPvX4AocHQ0nlB2SPZgAtc1NKq6hsaD6hoazwY9BPRs4K/mJatbxbvNAP4bqJUXf0LdqImV+uL7AxcD14fCkYPsdPOcg6NlnAbY4dizPXAAGAPcCUwDdoCeCjwJnA5qOqgayZ9+BxyDZgaOHlXm+8oAq4C/AP8L/A/wtIgxO4og8aXAv4XCkb77wJzKYISqF4GlwEvA3zDKtBeqgXOBQ6wXLp0wnztGNDQqoFobUSihzAQ4H1OiaAIdFX3pTOOB1TTQswC/o52v7diyvd+8VWv6OBntpHZ2ZspQZ9wO3AU84sr9fELOWuA7GBFrMPmFsCHABGBJKByJt7fG9mbVdQdwH3CvayyGiGH+Lt7K9dHA14E3MCUniz2FwCJo/CcwFKNMXgtMAc7D1GVvBT0R1CTgcmB/ULdox7kl3ZEcdEnsqk6d0VdkUul1wLNlmAAOpnb5jpt8Ik6tBJ4yEQIzgK96kPirwH8U6bV7FaFwxC+agwY6u1n+coDNTfW1b2YPROOJNcBrmJr5PI9QOYCp9T9UbgKLl3c/c7KpvjZjCbz7OAhTIjoFUBrmKEPgDHCOEGI66DmgBqH1RZl05rJUZ+qm8fc0rq0Z2O+M5I7Oa510plMpdY2QuKfhzyWmTPQ08BHwcCgcGS55eU2e85VEEPND4UiHGK39PNKaJLChvTW2Mw/ZgsCBgFeJanN7a2xTKBwZKJ/zyf9OAu+2t8Y6Xdc6BAgBh8g7SAHrQuHIm8DK9tbYp7sxTp8px0mdtyMaTzwpxvlIj3OHAj5RpAe7iK4kCtrUVF+bFhL2FaN4qIy3g6nHvwF8kK+2HI0nhgFfBg6WqGConPdhNJ7YgukzWN1UX7vJErg40epgIKyNdZ4lIek4wKdhrjIerRr4lljL6Wgd1Y5emU6m204cf1pgwJBBh27buLUNxYNKqQnArTNfbW8Gnps8MpTs5Ud6GLgAo57nw3DgKOA94AxMuanK9XcthmIrEAuFI3/N4/EPx5TUhua5fiewAHgMo9R/z0WCFDArFI68IBN+tOTm9UL0anY1W6wBngmFIwuA9T3YkPKpELGQJqOAvsAVwKmuv/0NiEbjifVCwrGSthzmuvcPMKLnTCFjlrgHyvN+EzgGUxXo5zqvQ+7tPWB5NJ54Ani2qb52syVwYYwFvqfg99rkmE3AHXK8SpsXMVUZLzcGTb90MjVBO/pno8afpkacdfyN2zZ/crzyqWZMA0UKmChecOrMV9sXAqnJI0O91RH1IfAgMMpDIAzKBFooJPknD2+UkdC8FdPplRtmXiREz8UmE6mA5JqnYMpvWbwDrJac/RoxBv48XnAoUCdesEkijJ4IW7PerxDBHRmnkEQsymWcFgLLJVU5K08UMgTYmT1HPPkRwE3y+aEe4xYUQ3eQvJ8zgcej8cQc4K1K7hTrdQKPaGj0AQOBjIa4MuWDHys4WJv8aIJY0GxZYZJMoh2pZGq4k874v//wDcl0RzqY7EgG0JyEUjFMa98vxKJeA9wuL/oP8vJ7AylRXd/zEGuCwLHidV/GqNmHS3SRG66PBu4JhSOrXB6wCvhXj0kI8DjQ7spFcw3XuXL8mxINFEI/MaRvhMKRWHtrrNgcUQt53AasjxDpeo/IIYs1YryC8lu7CFwlc+ND0UYCHuP/iow/El3Ml/Ss2IUqfvHQ48XgNAJtlUpgXy+TVwFfElJOkIG5EdPgfqUyg7UBmCyh0BhgigYn3Zme4vf7fnD5Pdf4UjuS43XGqVOomFLqPrHWzZie6V8CP5X8cgZw1sxX22t64/mEaB+7w7c8k+MwYGB7aywN/LGAdztOPLl7ou4vz5gP2zAq+Y4ixMLhRT7SQDGkw0oYhmqJEsbKzziJiu4UA+LlND4Blkiu/g/GwIXREn0EChjQeFN9rRONJ4bLPBpFaavM3Mb2ZGBKNJ441BJ4lxixvyi2NwBXSf47VcLFyxT8xEXi54ALtdZTfH38VVc/cfPamgE1pwDzNfo2IcMc4FciaMyQ0O8u8cB9Rc1u6MVnTBXI85Qr90IM2Msen63BrPipdh07Bu8yzDIgUYKnLBZZ4adYVAlRW1w/zZiOq6oC570ItHVTDX4PWBKNJ6qAf5f/6e8iWnC6iFDPBsZF44lqS2AzYCtFsFoP/AiYoOFlbdTJdiHxJPFkk4FXgXO11tGfnzfzCI1eHKgKPKl8apTWepbWegimX3qBhKO3AiOA3wKz5f9s7eUx7WrSZLEdUzbZ5vHZE7OEDYUjARG+8k2kNPC8iDjFvof1MkZzJOzMFCDkASWOQR/MwoVBEglVdfH5DcD9BSIXL0O5QQz/KxLFPYVZ+BISI7Kfx7O/Dzwg4fHVmLr1++Tv7x4g4/7lSmwy6VUCty1t0W1LW3aKStoog96IeF0hcRwYJwq0BiYqpZ72+XzfcNKZ+b+99A5f1YC+U4NVwXuUT9WJ6HWk/J4nudZPMcsD7xYldnlvPJ+oxDUFQs5siL3dRbxFmK6ufBgsOS/yjKfmyZfBNL4sFhGoGLwlEdCPMR1v12EiIa+ooZxayQZ5X38qYX3wJ0K6C0ScOlvSremid9RjGmzyYbOInBPE6N8tc3CqkDgfjpLUJVhpBP5cVOi2pS0pYNGIhsYm8ZI/lHB3noYblfHQlygzWZu0iFjKr87TGee2u74zc/KPHr952o6PtjmpztTl2tFzlVJTgJ/LdSZgSk8vTh4Z2tjLBvEITF0VD0/5RtbjtrfGdCgceZ9djSAD8+STp4fCkbsxy/Dy9VNnJEppK7Lc4wAvAH9pb41tFcOzHHhdJr4qMaLoDtZgVm0taKqvLba5JQ38GZjaVF/7ruv4RhHP9hPyennfZcD9TfW1H7uOJ6PxxH3iaS/I87yDRXx8NCdH3+dC6FwsxqjHq4ErRex4R449J2rpVJlRMxTqUeX3nar8vumxs6cf6A8G5gWrgg8on6rTWjdLrvtLUTvv7eXQOUu4c/BuskgBr7W3xlIu4SurXLd5vJ+jhbwjPCblZkyP9gclEGBjHm+te8kDp4W490nk9esSyJv1votzyJv7DoaRvxsuBbzWVF+7JfcPTfW1HaJHJD0c3WCP6Gff88AuT5we0dC4UAZ7GqZ479MmL7tWGe98AdBHwQxtQqR+Pp/vDBVU/X8z7vZJly64elagTzCZTqbHaceZC1wuyrSePDLUa+1xsqfWKDE6XtjmIVqtxNQ4j5MIwo0vSBrwFY9c8m3gaVG1cz1zsfVvXw8ac0cIuirnWKcYm2WSt76L6awq9R11YOrdXvAXCHWdLoz65gKiVnUZI5E9k8BC4uSIhsanZPBmY+pvVcDtGiZJOP0tTJdWs+RuN+FTF2rHuePe78ZuvPL+62YGldqZ6kgerbXumDwylC6TAOdF3hoJ2yZTuOSyCFiX53gnpgR0joRquSLKhR6TMinX3OARWvdEA0upHvhTEcfuzDN+jnjBVDcWnHS1c0qhKoAfGBaNJ3wezRkHFyDpdgqvqNo3CZz1xMBLIxoaJ2HKP1cIYaMarhdB69vKTOLrNMxQkMSnxqLU7N9cMvemMZMvmnPQkcM1Wpej/U3lCFXZY/0l3822LR5bwJN9LMrnZ8JFyV1fC4UjT0nI3CfHOw4sMKmeKPPqplK3GtJAR1N97SdlvJ9CnnCnePdMns8FMCueDhXh7++QdstTPMLkDrlmhyVwYbyC2ViuWbxORtTBmfL3McDNyhB7jkIFUFys/P7zH5l0b/O6N3+3rUz31VdC+cNdIVYfTFfRV4R0B3aR9/0ReDFPqOvGY8BlXVzLjeVUXpdQVwQrN3aKILc5TzSkJFJqjMYTLZJ+aDHCPxQNJZ8B3gSskGtbAneREy8SEapZSBPQxgP/RBnvdR5Qo2C6NjXfRcqn4oGqYDmX6PUR43E6u9r7sqFlV5PVEbHuzi5yN4SMz2A6mLpCCvi9eHZL4F1iVCYaT7RiypFj8kQPAzDrkk/AlM4ciZyOLRDpJET8qrgQuuL2xJIS08uY2uSzQthbgP7akPrPmJa66UKgh5RSq95M/KrcglVAhIwa+V1VJHlfwtQd/6+IUPdTyYWLCT/bMTtepHuQeJV0ne7gLUlXvJT5AeJtv49pLT2pAHk3yZxbRwWiIje1a1vakmlb2rIC0ye9BLM7x23AAG26tO4G1ipIKki3LW2pxP2Xk5h+7uvbW2MLi2lxlPB6CaYuXAgZufZ7PbTULysu7RX7WIuy/YikJKkChiYoP6rAO3wIeKBSN6H3Vfi7WCM58EJMkf1mTC10ruTFG1ZUHnkzmGaNGKbO+VKJ52/E1HULiXEfCNF7SijSeLdS7qkk3g78TEi8O8+WknPvyFc3tjlwkZ54RENjHNOJ1YFZKH/iiqUtvy5TnksJL9v93UgZeeEJzJK+ZzDNKZ+UqhC3t8ZSoXBkseRnpxcQr+JdePWg3F86z31X5fFGAXkWx+WRss8YzDNvfHjXTLvb8OC+H53HQBaLVRLFvY7ZvODgLjyulve4DlMKexCzkQCWwN0jcRtmVdHJmB0qy4HXMa1y/bsIJR0hRQqjSm7BdI+9JXnpR0Cym6HtRvGyOs9k24ZZuPB2F9dYKROwX87zaIyolskJFRe5CBlwkf9TGZvcyOhRTGtn7rW3491XXSw62LW3mc6JGLeKcSzGCzvReGItppfgSUnFGjDqdLWQ2Sf/pwOz1nixPNsyzF5ZFZ1W2C08XZDN3bp6Ybrc33kUCkfCGNU67OF9L25vja38PMcqGk8E8qRgGvPtgxUZjssmA0Mw66EHi3DlF6OzSYzih3vSdzVZAleeEanG1CSnSzTgRhrT4/0Ddz+1xb4Lnx2CiiKvwnQJXZSHvGDq4I9Z8lpYAlcmghi1/esef1+D9w4eFpbAFp8zBmH2oMrXIOIAf6LyOq8sLIEtBA2Ydb/5sA7T4JG0w2RhCVx5+W9/TA+01zf0PQ+s3su/V8miRATsEFQEeX2YzcRPFKOa+wXaWzA7lGyxo2VhCVyZ76Efpu0yW9pLs2tN62rg+TJsGWthCWzRA0gDT/CP3VDuNsIOen9/LwsLCwsLCwsLCwsLCwsLCwsLCwuL7uP/ARz0n8tAOJ/1AAAAAElFTkSuQmCC"
                    alt="Company Logo"
                    style={{ maxWidth: '150px' }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6">DynPro India Pvt. Ltd.</Typography>
                  <Typography variant="subtitle2" sx={{ mt: 1 }}>
                    5th Floor, #501 Raheja Paramount,138 Residency Road,Bengaluru - 560 025
                  </Typography>
                  {payslipData.salary_type == 'Monthly' && (
                    <Typography variant="subtitle2" sx={{ mt: 1 }}>
                      Wage Slip for the month of {payslipData.month} {payslipData.year}
                    </Typography>
                  )}
                </Grid>
              </Grid>

              {/* Employee Details Box with Outline */}
              <Box
                sx={{
                  p: 2,
                  backgroundColor: 'transparent',
                  border: '1px solid black',
                  borderRadius: '4px',
                  maxWidth: '100%',
                  mx: 'auto',
                  boxSizing: 'border-box',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography sx={{ mb: 1, fontSize: '15px' }}>
                        <strong style={{ marginRight: '8px' }}>Employee Name:</strong>
                        {payslipData.name}
                      </Typography>
                      <Typography sx={{ mb: 1, fontSize: '15px' }}>
                        <strong style={{ marginRight: '8px' }}>Monthly Salary:</strong>
                        {payslipData.monthly_salary}
                      </Typography>
                      <Typography sx={{ mb: 1, fontSize: '15px' }}>
                        <strong style={{ marginRight: '8px' }}>Total Payble Days:</strong>
                        {payslipData.pay_day}
                      </Typography>

                      <Typography sx={{ mb: 1, fontSize: '15px' }}>
                        <strong style={{ marginRight: '8px' }}>Bank Name:</strong>
                        {payslipData.bank_name}
                      </Typography>
                      <Typography sx={{ mb: 1, fontSize: '15px' }}>
                        <strong style={{ marginRight: '8px' }}>Account No.:</strong>
                        {payslipData.bank_ac_no}
                      </Typography>
                      <Typography sx={{ mb: 1, fontSize: '15px' }}>
                        <strong style={{ marginRight: '8px' }}>UAN No:</strong>
                        {payslipData.uan_no}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography sx={{ mb: 1, fontSize: '15px' }}>
                        <strong style={{ marginRight: '8px' }}>Employee ID:</strong>
                        {payslipData.emp_id}
                      </Typography>

                      {payslipData.salary_type !== 'Monthly' && (
                        <Typography sx={{ mb: 1, fontSize: '15px' }}>
                          <strong style={{ marginRight: '8px' }}>Per Day (INR):</strong>
                          {payslipData.hours_payble}
                        </Typography>
                      )}
                      <Typography sx={{ mb: 1, fontSize: '15px' }}>
                        <strong style={{ marginRight: '8px' }}>Region:</strong> {payslipData.region}
                      </Typography>

                      <Typography sx={{ mb: 1, fontSize: '15px' }}>
                        <strong style={{ marginRight: '8px' }}>PAN:</strong> {payslipData.pan_no}
                      </Typography>
                      <Typography sx={{ mb: 1, fontSize: '15px' }}>
                        <strong style={{ marginRight: '8px' }}>Designation:</strong>{' '}
                        {payslipData.designation}
                      </Typography>
                      <Typography sx={{ mb: 1, fontSize: '15px' }}>
                        <strong style={{ marginRight: '8px' }}>PF No:</strong> {payslipData.pf_no}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Grid
                item
                xs={12}
                sx={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {payslipData.salary_type !== 'Monthly' && (
                  <Typography variant="subtitle2" sx={{ mt: 1 }}>
                    FOR THE PERIOD FROM {payslipData.cycle_start} to {payslipData.cycle_end}{' '}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(4 weeks cycle-20 working days)
                  </Typography>
                )}
              </Grid>
              {/* Pay Elements Table */}
              <TableContainer component={Paper} sx={{ maxWidth: '100%', mx: 'auto', mb: 1, mt: 1 }}>
                <Table aria-label="pay elements table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{ border: '1px solid black', width: '15%', fontSize: '13px' }}
                      >
                        <strong>PAY ELEMENTS</strong>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ border: '1px solid black', width: '15%', fontSize: '13px' }}
                      >
                        <strong>MONTHLY SALARY</strong>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ border: '1px solid black', width: '15%', fontSize: '13px' }}
                      >
                        <strong>EARNINGS</strong>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ border: '1px solid black', width: '15%', fontSize: '13px' }}
                      >
                        <strong>DEDUCTIONS</strong>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ border: '1px solid black', width: '15%', fontSize: '13px' }}
                      >
                        <strong>AMOUNT</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>

              {/* Pay Elements Details Table */}
              <TableContainer component={Paper} sx={{ maxWidth: '100%', mx: 'auto', mb: 2 }}>
                <Table aria-label="pay elements details table">
                  <TableBody>
                    <TableRow>
                      <TableCell
                        align="left"
                        sx={{ border: '1px solid black', padding: '8px 16px' }}
                      >
                        <Box sx={{ fontWeight: 'bold', mb: 1 }}>Component - A</Box>
                        <Box>Basic Salary</Box>
                        <Box>HRA</Box>

                        {payslipData.salary_type == 'Monthly' && (
                          <>
                            <Box>Conveyance</Box>
                            <Box>Medical</Box>
                          </>
                        )}
                        <Box>Spl. Allow</Box>
                        {payslipData.salary_type == 'Monthly' && (
                          <>
                            <Box>L.T.A</Box>
                          </>
                        )}

                        <Box>Stat. Interim Bonus</Box>
                        <Box>Gratuity Benefit Paid</Box>
                        {payslipData.salary_type !== 'Monthly' && (
                          <>
                            <Box> Shift Allowance</Box>
                          </>
                        )}
                        <Box sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Component - B</Box>
                        <Box>Gratuity</Box>
                        <Box>EMPLOYER P.F. Contribution</Box>
                      </TableCell>
                      <TableCell align="right" sx={{ border: '1px solid black' }}>
                        <Box>{payslipData.salary_basic}</Box>
                        <Box>{payslipData.salary_hra}</Box>
                        {payslipData.salary_type == 'Monthly' && (
                          <>
                            <Box>{payslipData.salary_conveyance}</Box>
                            <Box>{payslipData.salary_medical}</Box>
                          </>
                        )}

                        <Box>{payslipData.salary_spl_allowance}</Box>
                        {payslipData.salary_type == 'Monthly' && (
                          <>
                            <Box>{payslipData.lta}</Box>
                          </>
                        )}

                        <Box>{payslipData.statutory_bonus_salary}</Box>
                        <Box>{payslipData.gratuity}</Box>
                        <Box>-</Box>
                        <Box>-</Box>
                        <Box sx={{ mt: 2, mb: 1 }}>{payslipData.gratuity_employer_salary}</Box>
                        <Box>{payslipData.pf_emp_salary}</Box>
                      </TableCell>
                      <TableCell align="right" sx={{ border: '1px solid black' }}>
                        {payslipData.basic}
                        <Box>{payslipData.hra}</Box>
                        {payslipData.salary_type == 'Monthly' && (
                          <>
                            <Box>{payslipData.conveyance}</Box>
                            <Box>{payslipData.medical}</Box>
                          </>
                        )}

                        <Box>{payslipData.spl_allowance}</Box>
                        {payslipData.salary_type == 'Monthly' && (
                          <>
                            <Box>{payslipData.lta_salary}</Box>
                          </>
                        )}

                        <Box>{payslipData.statutory_bonus}</Box>
                        <Box>{payslipData.gratuity}</Box>
                        {payslipData.salary_type !== 'Monthly' && (
                          <>
                            <Box> {payslipData.shift_allowance_e}</Box>
                          </>
                        )}
                        <Box>-</Box>
                        {/* <Box sx={{ mt: 2, mb: 1 }}>{payslipData.gratuity_employer_earning}</Box> */}
                        {/* <Box>{payslipData.pf}</Box> */}
                        <Box sx={{ mt: 2, mb: 1 }}>-</Box>
                        <Box>-</Box>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ border: '1px solid black', padding: '0px 16px' }}
                      >
                        <Box>Profession Tax</Box>
                        <Box>TDS</Box>
                        <Box>Other Deductions</Box>
                        <Box>Employee PF</Box>
                        <Box>ESI</Box>
                        <Box>LWF</Box>
                      </TableCell>
                      <TableCell align="right" sx={{ border: '1px solid black' }}>
                        <Box>{payslipData.pt}</Box>
                        <Box>{payslipData.tds}</Box>
                        <Box>{payslipData.other_deduc}</Box>
                        <Box>{payslipData.pf}</Box>
                        <Box>{payslipData.esi_charge}</Box>
                        <Box>{payslipData.labour_welfare_fund}</Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Totals Table */}
              <TableContainer
                component={Paper}
                sx={{ maxWidth: '100%', mx: 'auto', border: '1px solid black', mb: 2 }}
              >
                <Table aria-label="totals table">
                  <TableBody>
                    {/* NET PAY Row */}
                    <TableRow>
                      <TableCell
                        align="left"
                        sx={{
                          border: '1px solid black',
                          padding: '8px 16px',
                          fontWeight: 'bold',
                          fontSize: '13px',
                        }}
                      >
                        TOTAL
                      </TableCell>
                      <TableCell align="right" sx={{ border: '1px solid black', fontSize: '13px' }}>
                        {payslipData.monthly_salary}
                      </TableCell>
                      <TableCell align="right" sx={{ border: '1px solid black', fontSize: '13px' }}>
                        {payslipData.gross_payble}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          border: '1px solid black',
                          padding: '8px 4px',
                          fontWeight: 'bold',
                          fontSize: '13px',
                        }}
                      >
                        TOTAL DEDUCTIONS
                      </TableCell>
                      <TableCell align="right" sx={{ border: '1px solid black' }}>
                        {payslipData.total_deduction}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{ border: '1px solid black', padding: '8px 16px' }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 'bold', textAlign: 'left', fontSize: '13px' }}
                        >
                          NET PAY
                        </Typography>
                      </TableCell>
                      <TableCell align="center" colSpan={4}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 'bold', textAlign: 'center' }}
                        >
                          {payslipData.net_amount}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    {/* NET PAY (In Words) Row */}
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{ border: '1px solid black', padding: '8px 16px' }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 'bold', textAlign: 'left', fontSize: '13px' }}
                        >
                          NET PAY (In Words)
                        </Typography>
                      </TableCell>
                      <TableCell align="center" colSpan={4}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 'bold', textAlign: 'center' }}
                        >
                          {payslipData.amount_in_words}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Computer-generated statement */}
              <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
                This is a computer-generated payslip. No signature is required.
              </Typography>
            </>
          ) : (
            <Typography variant="body1">No Data Found</Typography>
          )}
        </Box>
      </Grid>
    </Container>
  );
};

export default Payslips;
