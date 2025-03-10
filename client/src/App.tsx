import { Routes, Route } from "react-router-dom"
import './App.css'
import Home from "./app/home/Home"
import ProjectPage from "./app/Projects/ProjectPage"
import Page from "./app/Projects/[slug]/Page"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<ProjectPage />} />
      <Route path="/projects/:slug" element={<Page />} />
    </Routes>
  )
}

export default App
