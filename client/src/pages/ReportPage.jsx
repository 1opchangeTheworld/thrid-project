import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button as MuiButton } from "@mui/material";
import * as semesterService from "../services/semesterService";

function ReportPage() {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [summary, setSummary] = useState(null);
  const reportRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSemesters() {
      const res = await semesterService.getSemesters();
      const uniqueYears = [
        ...new Set(res.data.map((semester) => semester.year)),
      ];
      setYears(uniqueYears);
    }
    fetchSemesters();
  }, []);

  const handleChange = (e) => {
    setSelectedYear(e.target.value);
    setSummary(null);
  };

  const handleGetSummary = async () => {
    if (selectedYear) {
      const res = await semesterService.getSemesterSummaryByYear(selectedYear);
      setSummary(res.data);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRedirect = () => {
    if (selectedYear) {
      navigate(`/compare?year=${selectedYear}`);
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
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Button
            variant="contained"
            onClick={handleGetSummary}
            disabled={!selectedYear}
          >
            Get Summary
          </Button>
          <Button variant="outlined" onClick={handlePrint}>
            Print
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleRedirect}
            disabled={!selectedYear}
          >
            Go to Compare Page
          </Button>
        </Box>
        <Paper
          ref={reportRef}
          sx={{
            width: 700,
            minHeight: 200,
            p: 3,
            mt: 2,
            textAlign: "center",
          }}
        >
          {summary ? (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Summary for Year: <b>{summary.year}</b>
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Total Students: {summary.totalStudents}
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Faculty</TableCell>
                      <TableCell>Major</TableCell>
                      <TableCell align="right">Student Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {summary.faculties.map((faculty) =>
                      faculty.majors.map((major, idx) => (
                        <TableRow key={faculty.id + "-" + major.id}>
                          <TableCell>{idx === 0 ? faculty.name : ""}</TableCell>
                          <TableCell>{major.name}</TableCell>
                          <TableCell align="right">
                            {major.studentCount}
                          </TableCell>
                          <TableCell align="right">
                            <MuiButton
                              variant="outlined"
                              size="small"
                              onClick={() =>
                                navigate(
                                  `/compare?year=${summary.year}&facultyId=${faculty.id}&majorId=${major.id}`
                                )
                              }
                            >
                              Compare
                            </MuiButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <Typography color="text.secondary">
              Please select a year and click "Get Summary" to view the report.
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default ReportPage;
