import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./app/home/Home";
import ProjectPage from "./app/Projects/ProjectPage";
import Page from "./app/Projects/[slug]/Project";
import AdminDashboard from "./app/admin/components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./app/Login/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<ProjectPage />} />
      <Route path="/projects/:slug" element={<Page />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
