import { Routes, Route } from "react-router-dom"
import './App.css'
import Home from "./app/home/Home"
import ProjectPage from "./app/Projects/ProjectPage"
import Page from "./app/Projects/[slug]/Project"
import AdminPage from "./app/admin/Admin"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<ProjectPage />} />
      <Route path="/projects/:slug" element={<Page />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}

export default App
