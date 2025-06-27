import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DefaultTable from "../components/DefaultTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import * as studentService from "../services/studentService";
import { getFaculties } from "../services/facultyService";
import { getMajors } from "../services/majorService";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const columns = [
  { field: "student_id", headerName: "Student Id" },
  { field: "firstname_th", headerName: "First Name" },
  { field: "lastname_th", headerName: "Last Name" },
  { field: "email", headerName: "Email" },
  { field: "facultyName", headerName: "Faculty" },
  { field: "majorName", headerName: "Major" },
  { field: "actions", headerName: "Actions" },
];

function StudentPage() {
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [majors, setMajors] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    student_id: "",
    password: "P@ssw0rd",
    firstname_th: "",
    lastname_th: "",
    telephone: "",
    email: "",
    faculties_id: "",
    majors_id: "",
    profile_img: "",
    actives: true,
  });
  const [editId, setEditId] = useState(null);
  const [studentIdError, setStudentIdError] = useState("");

  const fetchStudents = async () => {
    const res = await studentService.getStudents();
    console.log("Fetched students:", res.data);
    setStudents(res.data);
  };
  const fetchFaculties = async () => {
    const res = await getFaculties();
    setFaculties(res.data);
  };
  const fetchMajors = async () => {
    const res = await getMajors();
    setMajors(res.data);
  };

  useEffect(() => {
    fetchStudents();
    fetchFaculties();
    fetchMajors();
  }, []);

  const handleOpen = (student = null) => {
    if (student) {
      setForm({
        student_id: student.student_id || "",
        password: student.password || "",
        firstname_th: student.firstname_th || "",
        lastname_th: student.lastname_th || "",
        telephone: student.telephone || "",
        email: student.email || "",
        faculties_id: student.faculties_id || "",
        majors_id: student.majors_id || "",
        profile_img: student.profile_img || "",
        actives: student.actives ?? true,
      });
      setEditId(student.id);
    } else {
      setForm({
        student_id: "",
        password: "P@ssw0rd",
        firstname_th: "",
        lastname_th: "",
        telephone: "",
        email: "",
        faculties_id: "",
        majors_id: "",
        profile_img: "",
        actives: true,
      });
      setEditId(null);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "student_id") {
      // Only allow numbers and max 12 digits
      if (!/^\d{0,12}$/.test(value)) {
        setStudentIdError(
          "Student ID must be numbers only and up to 12 digits."
        );
      } else {
        setStudentIdError("");
      }
    }
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    // Prevent submit if error
    if (studentIdError) return;
    if (editId) {
      await updateStudent(editId, form);
    } else {
      await createStudent(form);
    }
    fetchStudents();
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    fetchStudents();
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    await importStudents(formData);
    fetchStudents();
  };

  const rows = students.map((student) => ({
    ...student,
    facultyName: student.faculty?.name || "",
    majorName: student.major?.name || "",
    actions: (
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => handleOpen(student)}
        >
          <EditIcon />
        </Button>
        <Button
          variant="contained"
          size="small"
          color="error"
          onClick={() => handleDelete(student.id)}
        >
          <DeleteForeverIcon />
        </Button>
      </Box>
    ),
  }));

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">Students</Typography>
          <Box>
            <Button
              variant="contained"
              onClick={() => handleOpen()}
              sx={{ mr: 2 }}
            >
              Add Student
            </Button>
            <input
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              style={{ display: "none" }}
              id="import-student-file"
              type="file"
              onChange={handleImport}
            />
            <label htmlFor="import-student-file">
              <Button
                variant="outlined"
                component="span"
                startIcon={<UploadFileIcon />}
              >
                Import File
              </Button>
            </label>
          </Box>
        </Box>

        <DefaultTable columns={columns} rows={rows} />

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editId ? "Edit Student" : "Add Student"}</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minWidth: 400,
                py: 1,
              }}
            >
              <TextField
                margin="dense"
                label="Student ID"
                name="student_id"
                value={form.student_id}
                onChange={handleChange}
                fullWidth
                inputProps={{
                  maxLength: 12,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                error={!!studentIdError}
                helperText={studentIdError}
              />
              <TextField
                margin="dense"
                label="First Name"
                name="firstname_th"
                value={form.firstname_th}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Last Name"
                name="lastname_th"
                value={form.lastname_th}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Telephone"
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
              />
              <FormControl fullWidth margin="dense">
                <InputLabel id="faculty-label">Faculty</InputLabel>
                <Select
                  labelId="faculty-label"
                  id="faculties_id"
                  label="Faculty"
                  name="faculties_id"
                  value={form.faculties_id}
                  onChange={handleChange}
                >
                  {faculties.map((faculty) => (
                    <MenuItem key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel id="major-label">Major</InputLabel>
                <Select
                  labelId="major-label"
                  id="majors_id"
                  label="Major"
                  name="majors_id"
                  value={form.majors_id}
                  onChange={handleChange}
                >
                  {majors.map((major) => (
                    <MenuItem key={major.id} value={major.id}>
                      {major.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={!!studentIdError}
            >
              {editId ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default StudentPage;
