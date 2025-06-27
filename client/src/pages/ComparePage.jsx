import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  Button,
  ListItem,
  ListItemText,
  CircularProgress,
  TextField,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useLocation, useNavigate } from "react-router-dom";
import * as semesterService from "../services/semesterService";
import api from "../api/axios";

function ComparePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const year = params.get("year");
  const facultyId = params.get("facultyId");
  const majorId = params.get("majorId");

  const [bsSubjects, setBsSubjects] = useState([]);
  const [transSubjects, setTransSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // New state for faculty and major names
  const [facultyName, setFacultyName] = useState("");
  const [majorName, setMajorName] = useState("");

  useEffect(() => {
    if (!year || !facultyId || !majorId) return;
    setLoading(true);
    semesterService
      .getSubjectsByYearFacultyMajor(year, facultyId, majorId)
      .then((res) => {
        const { subjects } = res.data;
        setBsSubjects(subjects.filter((s) => s.type === "bs"));
        setTransSubjects(subjects.filter((s) => s.type === "trans"));
      })
      .catch(() => {
        setBsSubjects([]);
        setTransSubjects([]);
      })
      .finally(() => setLoading(false));
  }, [year, facultyId, majorId]);

  // Fetch faculty and major names
  useEffect(() => {
    if (!facultyId) return;
    api
      .get(`/faculties/${facultyId}`)
      .then((res) => setFacultyName(res.data.name));
    if (!majorId) return;
    api.get(`/majors/${majorId}`).then((res) => setMajorName(res.data.name));
  }, [facultyId, majorId]);

  return (
    <Box sx={{ display: "flex", width: "100vw", minHeight: "100vh" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        {/* Back Button */}
        <Box
          sx={{
            width: "100%",
            mb: 2,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Button
            startIcon={<ArrowBackIosIcon />}
            variant="outlined"
            onClick={() => navigate("/report")}
          >
            ย้อนกลับ
          </Button>
        </Box>
        {/* Header with Faculty, Major, Year */}
        <Typography variant="h5" sx={{ mb: 2 }}>
          ปีการศึกษา: <b>{year}</b> | คณะ: <b>{facultyName}</b> | สาขา:{" "}
          <b>{majorName}</b>
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 4,
          }}
        >
          <Card sx={{ flex: 1, minHeight: 200 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                รายวิชา
              </Typography>
              {loading ? (
                <CircularProgress />
              ) : (
                <List>
                  {bsSubjects.map((subject) => (
                    <ListItem key={subject.id} divider>
                      <ListItemText
                        primary={subject.subName}
                        secondary={`รหัส: ${subject.subId} | หน่วยกิต: ${subject.subUnit}`}
                      />
                    </ListItem>
                  ))}
                  {bsSubjects.length === 0 && (
                    <Typography color="text.secondary">
                      ไม่มีข้อมูลรายวิชา BS
                    </Typography>
                  )}
                </List>
              )}
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, minHeight: 200 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                รายวิชาเทียบโอน
              </Typography>
              {loading ? (
                <CircularProgress />
              ) : (
                <List>
                  {transSubjects.map((subject, idx) => (
                    <ListItem
                      key={subject.id}
                      divider
                      sx={{ alignItems: "flex-start" }}
                    >
                      <ListItemText
                        primary={subject.subName}
                        secondary={`รหัส: ${subject.subId} | หน่วยกิต: ${subject.subUnit}`}
                      />
                      <TextField
                        type="number"
                        label="กรอกเกรด"
                        variant="outlined"
                        size="small"
                        sx={{ width: 80, marginLeft: 2 }}
                      />
                    </ListItem>
                  ))}
                  {transSubjects.length === 0 && (
                    <Typography color="text.secondary">
                      ไม่มีข้อมูลรายวิชาเทียบโอน
                    </Typography>
                  )}
                </List>
              )}
            </CardContent>
          </Card>
        </Box>
        {/* Footer with Attach File and Submit Button */}
        <Box
          sx={{
            bottom: 0,
            left: 0,
            width: "50vw",
            bgcolor: "background.paper",
            boxShadow: 3,
            marginTop: 2,
            py: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            zIndex: 1201,
          }}
        >
          <input
            type="file"
            id="compare-file"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              alert(file ? `Selected file: ${file.name}` : "No file selected");
            }}
          />
          <label htmlFor="compare-file">
            <button
              style={{
                padding: "8px 20px",
                fontSize: "1rem",
                background: "#eee",
                color: "#333",
                border: "1px solid #ccc",
                borderRadius: 6,
                cursor: "pointer",
                marginRight: 16,
              }}
              component="span"
            >
              แนบไฟล์ (Transcript)
            </button>
          </label>
          <button
            style={{
              padding: "10px 32px",
              fontSize: "1.1rem",
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
            }}
            onClick={() => {
              alert("Compare submitted!");
            }}
          >
            ส่งข้อมูล (Submit)
          </button>
        </Box>
      </Box>
    </Box>
  );
}

export default ComparePage;
