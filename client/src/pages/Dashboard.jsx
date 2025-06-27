import React from "react";
import Sidebar from "../components/Sidebar";
import { Box, Toolbar, Typography } from "@mui/material";

function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4">Report Tranfers Student</Typography>
        {
          <Typography variant="body1" sx={{ mt: 2 }}>
            Welcome to the dashboard! Here you can manage your application.
          </Typography>
        }
      </Box>
    </Box>
  );
}

export default Dashboard;
