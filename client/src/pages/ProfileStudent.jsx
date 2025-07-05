import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";
import { Box, Button, TextField, Typography } from "@mui/material";

function ProfileStudent() {
  const { user, role } = useAuth();
  const [student, setStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (role === "Student" && user?.id) {
      api.get(`/students/${user.id}`).then((res) => {
        setStudent(res.data);
        setForm(res.data);
      });
    }
  }, [user, role]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditMode(true);
    setForm(student);
    setSuccessMsg("");
  };

  const handleCancel = () => {
    setEditMode(false);
    setForm(student);
    setSuccessMsg("");
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await api.put(`/students/${student.id}`, form);
      setStudent(res.data);
      setEditMode(false);
      setSuccessMsg("บันทึกข้อมูลสำเร็จ!");
    } catch (err) {
      setSuccessMsg("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
    setLoading(false);
  };

  if (!student) {
    return (
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          sx={{ flexGrow: 1, display: "flex", justifyContent: "center", mt: 5 }}
        >
          <Typography>Loading...</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        sx={{ flexGrow: 1, display: "flex", justifyContent: "center", mt: 5 }}
      >
        <Card sx={{ minWidth: 800, p: 3 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
                {student.firstname_th?.charAt(0)}
              </Avatar>
              <Typography variant="h5" sx={{ mb: 1 }}>
                {student.title_th ? "นาย" : "นางสาว"} {student.firstname_th}{" "}
                {student.lastname_th}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 1 }}>
                รหัสนักศึกษา: {student.student_id}
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {successMsg && (
              <Typography color="success.main" sx={{ mb: 2 }}>
                {successMsg}
              </Typography>
            )}
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="อีเมล"
                name="email"
                value={form.email || ""}
                onChange={handleChange}
                disabled={!editMode}
                fullWidth
              />
              <TextField
                label="เบอร์โทรศัพท์"
                name="telephone"
                value={form.telephone || ""}
                onChange={handleChange}
                disabled={!editMode}
                fullWidth
              />
              <TextField
                label="วุฒิการศึกษา"
                name="certificate"
                value={form.certificate || ""}
                onChange={handleChange}
                disabled={!editMode}
                fullWidth
              />
              <TextField
                label="ที่อยู่"
                name="address"
                value={form.address || ""}
                onChange={handleChange}
                disabled={!editMode}
                fullWidth
              />
              <TextField
                label="คณะ"
                value={student.faculty?.name || "-"}
                disabled
                fullWidth
              />
              <TextField
                label="สาขา"
                value={student.major?.name || "-"}
                disabled
                fullWidth
              />
              <TextField
                label="สถานะ"
                value={student.actives ? "กำลังศึกษา" : "ไม่ใช้งาน"}
                disabled
                fullWidth
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 3,
              }}
            >
              {!editMode ? (
                <Button variant="contained" onClick={handleEdit}>
                  แก้ไขข้อมูล
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? "กำลังบันทึก..." : "บันทึก"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    ยกเลิก
                  </Button>
                </>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default ProfileStudent;
