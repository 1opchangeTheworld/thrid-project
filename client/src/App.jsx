import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserPage from "./pages/UserPage";
import MajorPage from "./pages/MajorPage";
import FacultyPage from "./pages/FacultyPage";
import SubjectPage from "./pages/SubjectPage";
import StudentPage from "./pages/StudentPage";
import ReportPage from "./pages/ReportPage";
import ComparePage from "./pages/ComparePage";
import ProfileStudent from "./pages/ProfileStudent";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { role } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["Admin", "Teacher", "Committee", "Student"]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <FacultyPage />
              <MajorPage />
              <UserPage />
              <StudentPage />
              <SubjectPage />
            </ProtectedRoute>
          }
        />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/profileStudent" element={<ProfileStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
