import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import * as dashboardService from "../services/dashboardService";
import Sidebar from "../components/Sidebar";

function groupBySubGroup(subjects) {
  return subjects.reduce((acc, item) => {
    const groupId = item.subject?.subGroupId || "ไม่ระบุหมวด";
    if (!acc[groupId]) acc[groupId] = [];
    acc[groupId].push(item);
    return acc;
  }, {});
}

function ComparePage() {
  const [baseSubjects, setBaseSubjects] = useState([]);
  const [transSubjects, setTransSubjects] = useState([]);
  const [course, setCourse] = useState({});
  const [grades, setGrades] = useState({});
  const fileInputRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const res = await dashboardService.getCompareSubjectByYear();
      const course = Array.isArray(res.data) ? res.data[0] : res.data;
      setCourse(course);
      if (course && course.subjects) {
        setBaseSubjects(course.subjects.filter((s) => s.type === "BASE"));
        setTransSubjects(course.subjects.filter((s) => s.type === "TRANSFER"));
      }
    }
    fetchData();
  }, []);

  const groupedBase = groupBySubGroup(baseSubjects);
  const groupedTrans = groupBySubGroup(transSubjects);
  const allGroupIds = Array.from(
    new Set([...Object.keys(groupedBase), ...Object.keys(groupedTrans)])
  );

  const handleGradeChange = (subjectId, value) => {
    // Allow only numbers and dot, and max 2 decimals
    let val = value.replace(/[^0-9.]/g, "");
    // Prevent multiple dots
    const parts = val.split(".");
    if (parts.length > 2) val = parts[0] + "." + parts[1];
    // Limit to 2 decimal places
    if (parts[1]?.length > 2) val = parts[0] + "." + parts[1].slice(0, 2);
    // Prevent value > 4
    if (parseFloat(val) > 4) val = "4";
    setGrades((prev) => ({
      ...prev,
      [subjectId]: val,
    }));
  };

  // Submit grades handler
  const handleSubmitGrades = async () => {
    // grades: { subjectId: grade, ... }
    // Convert to array of { subject_id, grade }
    const gradeArray = Object.entries(grades).map(([subject_id, grade]) => ({
      subject_id,
      grade,
    }));

    try {
      console.log("Saving grades:", gradeArray);
      // await dashboardService.saveGrades(gradeArray);
      alert("Saved grades:\n" + JSON.stringify(gradeArray, null, 2));
    } catch (err) {
      alert("Error saving grades");
    }
  };

  // File import handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Selected file: ${file.name}`);
      // TODO: handle file upload logic here
    }
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={3} align="center">
          เปรียบเทียบรายวิชา (ปี 2025)
        </Typography>
        <Typography variant="h6" mb={3} align="center" fontWeight="normal">
          คณะ {course?.faculty?.name} สาขา {course?.major?.name}
        </Typography>
        {allGroupIds.map((groupId, idx) => {
          const baseList = groupedBase[groupId] || [];
          const transList = groupedTrans[groupId] || [];
          const maxLength = Math.max(baseList.length, transList.length);

          return (
            <Accordion
              key={groupId}
              defaultExpanded
              sx={{ width: "100%", maxWidth: 1200, mb: 3 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">
                  {baseList[0]?.subject?.subGroup?.name ||
                    transList[0]?.subject?.subGroup?.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <Card
                  variant="outlined"
                  sx={{
                    width: "100%",
                    boxShadow: "none",
                    border: "none",
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="center"
                              colSpan={4}
                              sx={{
                                bgcolor: "#f5f5f5",
                                fontWeight: "bold",
                              }}
                            >
                              รายวิชา
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={4}
                              sx={{
                                bgcolor: "#f5f5f5",
                                fontWeight: "bold",
                                borderLeft: "2px solid #a9a3a1",
                              }}
                            >
                              วิชาเทียบ
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              align="center"
                              sx={{ fontWeight: "bold" }}
                            >
                              รหัสวิชา
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ fontWeight: "bold" }}
                            >
                              ชื่อวิชา
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ fontWeight: "bold" }}
                            >
                              หน่วยกิต
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ fontWeight: "bold" }}
                            >
                              {/* หมายเหตุ or empty */}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontWeight: "bold",
                                borderLeft: "2px solid #a9a3a1",
                              }}
                            >
                              รหัสวิชา
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ fontWeight: "bold" }}
                            >
                              ชื่อวิชา
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ fontWeight: "bold" }}
                            >
                              หน่วยกิต
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ fontWeight: "bold" }}
                            >
                              เกรด
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Array.from({ length: maxLength }).map((_, i) => (
                            <TableRow key={i}>
                              {/* BASE */}
                              <TableCell align="center">
                                {baseList[i]?.subject?.subId || ""}
                              </TableCell>
                              <TableCell align="left">
                                {baseList[i]?.subject?.subName || ""}
                              </TableCell>
                              <TableCell align="center">
                                {baseList[i]?.subject?.subUnit || ""}
                              </TableCell>
                              <TableCell align="center"></TableCell>
                              {/* TRANSFER */}
                              <TableCell
                                align="center"
                                sx={{ borderLeft: "2px solid #a9a3a1" }}
                              >
                                {transList[i]?.subject?.subId || ""}
                              </TableCell>
                              <TableCell align="center">
                                {transList[i]?.subject?.subName || ""}
                              </TableCell>
                              <TableCell align="center">
                                {transList[i]?.subject?.subUnit || ""}
                              </TableCell>
                              <TableCell align="center">
                                {transList[i]?.subject?.id ? (
                                  <TextField
                                    size="small"
                                    variant="outlined"
                                    sx={{ width: 80 }}
                                    value={
                                      grades[transList[i].subject.id] || ""
                                    }
                                    onChange={(e) =>
                                      handleGradeChange(
                                        transList[i].subject.id,
                                        e.target.value
                                      )
                                    }
                                    placeholder="เกรด"
                                    inputProps={{
                                      inputMode: "decimal",
                                      pattern: "[0-4](\\.\\d{0,2})?",
                                      maxLength: 4,
                                    }}
                                  />
                                ) : null}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </AccordionDetails>
              {idx < allGroupIds.length - 1 && <Divider sx={{ my: 2 }} />}
            </Accordion>
          );
        })}

        {/* Import Transcript Section */}
        <Box sx={{ mb: 3, display: "flex", gap: 1, mt: 4 }}>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.png"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            color="secondary"
            startIcon={<UploadFileIcon />}
            onClick={handleImportClick}
          >
            นำเข้าไฟล์ Transcript
          </Button>
          {/* Submit Grades Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitGrades}
          >
            บันทึกเกรด
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ComparePage;
