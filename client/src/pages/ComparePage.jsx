import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Stack,
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
    const groupId = item.subject?.subGroupId || "no-group";
    if (!acc[groupId]) acc[groupId] = [];
    acc[groupId].push(item);
    return acc;
  }, {});
}

function ComparePage() {
  const [subjects, setSubjects] = useState([]);
  const [course, setCourse] = useState({});
  const [grades, setGrades] = useState({});
  const fileInputRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const res = await dashboardService.getCompareSubjectByYear();
      const courseData = Array.isArray(res.data) ? res.data[0] : res.data;
      setCourse(courseData);
      if (courseData && courseData.subjects) {
        setSubjects(courseData.subjects);
      }
    }
    fetchData();
  }, []);

  const groupedSubjects = groupBySubGroup(subjects);
  const groupIds = Object.keys(groupedSubjects);

  const handleGradeChange = (subjectId, value) => {
    let val = value.replace(/[^0-9.]/g, "");
    const parts = val.split(".");
    if (parts.length > 2) val = parts[0] + "." + parts[1];
    if (parts[1]?.length > 2) val = parts[0] + "." + parts[1].slice(0, 2);
    if (parseFloat(val) > 4) val = "4";
    setGrades((prev) => ({
      ...prev,
      [subjectId]: val,
    }));
  };

  const handleSubmitGrades = async () => {
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
          เปรียบเทียบรายวิชา (ปี {course.year || ""})
        </Typography>
        <Typography variant="h6" mb={3} align="center" fontWeight="normal">
          คณะ {course?.faculty?.name} สาขา {course?.major?.name}
        </Typography>

        {groupIds.map((groupId, idx) => {
          const subjectList = groupedSubjects[groupId];
          const subGroupName = subjectList[0]?.subject?.subGroup?.nameSubject;
          const unit = subjectList[0]?.subject?.subGroup?.unit;
          const codeSubject = subjectList[0]?.subject?.subGroup?.codeSubject;
          return (
            <Accordion
              key={groupId}
              defaultExpanded
              sx={{ width: "100%", maxWidth: 1200, mb: 3 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography marginRight={4} fontWeight="bold">
                  {codeSubject}
                </Typography>
                <Typography marginRight={4} fontWeight="bold">
                  {subGroupName}
                </Typography>
                <Typography marginRight={4} fontWeight="bold">
                  หน่วยกิต {unit}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <Card
                  variant="outlined"
                  sx={{ width: "100%", boxShadow: "none", border: "none" }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
                      <Table>
                        <TableHead>
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
                              เกรด
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {subjectList.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell align="center">
                                {item.subject?.subId || ""}
                              </TableCell>
                              <TableCell align="left">
                                {item.subject?.subName || ""}
                              </TableCell>
                              <TableCell align="center">
                                {item.subject?.subUnit || ""}
                              </TableCell>
                              <TableCell align="center">
                                {item.subject?.id ? (
                                  <TextField
                                    size="small"
                                    variant="outlined"
                                    sx={{ width: 80 }}
                                    value={grades[item.subject.id] || ""}
                                    onChange={(e) =>
                                      handleGradeChange(
                                        item.subject.id,
                                        e.target.value
                                      )
                                    }
                                    placeholder="เกรด"
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
              {idx < groupIds.length - 1 && <Divider sx={{ my: 2 }} />}
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
