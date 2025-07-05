import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserPage from "./pages/UserPage";
import MajorPage from "./pages/MajorPage";
import FacultyPage from "./pages/FacultyPage";
import SubjectPage from "./pages/SubjectPage";
import StudentPage from "./pages/StudentPage";
import CoursePage from "./pages/CoursePage";
import ProfileStudent from "./pages/ProfileStudent";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import ComparePage from "./pages/ComparePage";
import AnnualDataPage from "./pages/AnnualDataPage";
import PreviewPage from "./pages/PreviewPage";

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
          path="/annual-data"
          element={
            <ProtectedRoute
              allowedRoles={["Admin", "Teacher", "Committee", "Student"]}
            >
              <AnnualDataPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/majors"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <MajorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculties"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <FacultyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <StudentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subjects"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <SubjectPage />
            </ProtectedRoute>
          }
        />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/profileStudent" element={<ProfileStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
