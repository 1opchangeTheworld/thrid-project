import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DefaultTable from "../components/DefaultTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import * as subjectService from "../services/subjectService";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import { useValidation } from "../hooks/useValidation";

const columns = [
  { field: "subId", headerName: "Subject ID" },
  { field: "subName", headerName: "Subject Name" },
  { field: "subUnit", headerName: "Unit" },
  { field: "actions", headerName: "Actions" },
];

function SubjectPage() {
  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    subId: "",
    subName: "",
    subUnit: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchSubjects = async () => {
    const res = await subjectService.getSubjects();
    setSubjects(res.data);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleOpen = (subject = null) => {
    if (subject) {
      setForm({
        subId: subject.subId || "",
        subName: subject.subName || "",
        subUnit: subject.subUnit || "",
      });
      setEditId(subject.id);
    } else {
      setForm({
        subId: "",
        subName: "",
        subUnit: "",
      });
      setEditId(null);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const { validate, resetErrors } = useValidation();

  const handleSubmit = () => {
    resetErrors();
    if (!validate(form)) return;

    if (editId) {
      subjectService.updateSubject(editId, form);
    } else {
      subjectService.createSubject(form);
    }
    fetchSubjects();
    handleClose();
  };

  const handleDelete = async (id) => {
    await subjectService.deleteSubject(id);
    fetchSubjects();
  };

  const rows = subjects.map((subject) => ({
    ...subject,
    actions: (
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => handleOpen(subject)}
        >
          <EditIcon />
        </Button>
        <Button
          variant="contained"
          size="small"
          color="error"
          onClick={() => handleDelete(subject.id)}
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
          <Typography variant="h4">Subjects</Typography>
          <Button variant="contained" onClick={() => handleOpen()}>
            Add Subject
          </Button>
        </Box>

        <DefaultTable columns={columns} rows={rows} />

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editId ? "Edit Subject" : "Add Subject"}</DialogTitle>
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
                label="Subject ID"
                name="subId"
                value={form.subId}
                onChange={handleChange}
                error={!!errors.subId}
                helperText={errors.subId}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Subject Name"
                name="subName"
                value={form.subName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Unit"
                name="subUnit"
                value={form.subUnit}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editId ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default SubjectPage;
