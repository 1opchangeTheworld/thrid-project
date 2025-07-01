import React, { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const years = [2022, 2023, 2024, 2025];

function AnnualDataPage() {
  const [selectedYear, setSelectedYear] = useState("");
  const [summary, setSummary] = useState(null);
  const reportRef = useRef(null);

  const dummySummary = {
    year: selectedYear,
    totalStudents: 120,
    faculties: [
      {
        id: 1,
        name: "Engineering",
        majors: [
          { id: 11, name: "Computer", studentCount: 40 },
          { id: 12, name: "Electrical", studentCount: 20 },
        ],
      },
      {
        id: 2,
        name: "Science",
        majors: [
          { id: 21, name: "Biology", studentCount: 30 },
          { id: 22, name: "Chemistry", studentCount: 30 },
        ],
      },
    ],
  };

  const handleChange = (e) => {
    setSelectedYear(e.target.value);
    setSummary(null);
  };

  const handleGetSummary = () => {
    setSummary(dummySummary);
  };

  const handlePrint = () => {
    if (reportRef.current) {
      window.print();
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Typography variant="h4" sx={{ mb: 3 }}>
          Yearly Semester Report
        </Typography>
        <FormControl sx={{ minWidth: 300, mb: 3 }}>
          <InputLabel id="year-label">Select Year</InputLabel>
          <Select
            labelId="year-label"
            id="year"
            value={selectedYear}
            label="Select Year"
            onChange={handleChange}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleGetSummary} sx={{ mb: 3 }}>
          Get Summary
        </Button>
        <Button variant="outlined" onClick={handlePrint} sx={{ mb: 3, ml: 1 }}>
          Print Report
        </Button>
        {summary && (
          <Box
            ref={reportRef}
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              width: "100%",
              maxWidth: 800,
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Summary for {summary.year}
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Faculty</TableCell>
                    <TableCell>Major</TableCell>
                    <TableCell align="right">Students</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {summary.faculties.map((faculty) =>
                    faculty.majors.map((major) => (
                      <TableRow key={major.id}>
                        <TableCell>{faculty.name}</TableCell>
                        <TableCell>{major.name}</TableCell>
                        <TableCell align="right">
                          {major.studentCount}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Total Students: {summary.totalStudents}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default AnnualDataPage;
