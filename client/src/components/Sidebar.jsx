import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import SubjectIcon from "@mui/icons-material/Subject";
import AddHomeIcon from "@mui/icons-material/AddHome";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useAuth } from "../hooks/useAuth";

const drawerWidth = 240;

function Sidebar() {
  const [adminOpen, setAdminOpen] = useState(false);
  const navigate = useNavigate();
  const { role } = useAuth();

  const handleAdminClick = () => {
    setAdminOpen(!adminOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1872c7",
        },
        [`& .MuiListItemText-primary`]: {
          color: "#fff",
          fontWeight: "light",
        },
      }}
    >
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon sx={{ color: "#fff" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="หน้าหลัก" />
        </ListItem>
        <ListItem button component={Link} to="/report">
          <ListItemIcon sx={{ color: "#fff" }}>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="รายงานเเต่ละปี" />
        </ListItem>
        {role === "Student" && (
          <ListItem button component={Link} to="/profileStudent">
            <ListItemIcon sx={{ color: "#fff" }}>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="ข้อมูลส่วนตัว" />
          </ListItem>
        )}
        {role === "Admin" && (
          <>
            <ListItem button onClick={handleAdminClick}>
              <ListItemIcon sx={{ color: "#fff" }}>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary="การจัดการระบบ" />
              {adminOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={adminOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={Link} to="/users" sx={{ pl: 4 }}>
                  <ListItemIcon sx={{ color: "#fff" }}>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="จัดการผู้ใช้งาน" />
                </ListItem>
                <ListItem button component={Link} to="/students" sx={{ pl: 4 }}>
                  <ListItemIcon sx={{ color: "#fff" }}>
                    <AccountBoxIcon />
                  </ListItemIcon>
                  <ListItemText primary="จัดการนักศึกษา" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/faculties"
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon sx={{ color: "#fff" }}>
                    <AddHomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="จัดการคณะ" />
                </ListItem>
                <ListItem button component={Link} to="/majors" sx={{ pl: 4 }}>
                  <ListItemIcon sx={{ color: "#fff" }}>
                    <BusinessCenterIcon />
                  </ListItemIcon>
                  <ListItemText primary="จัดการสาขา" />
                </ListItem>
                <ListItem button component={Link} to="/subjects" sx={{ pl: 4 }}>
                  <ListItemIcon sx={{ color: "#fff" }}>
                    <SubjectIcon />
                  </ListItemIcon>
                  <ListItemText primary="จัดการรายวิชา" />
                </ListItem>
              </List>
            </Collapse>
          </>
        )}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="ออกจากระบบ" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
