import About from "./About";
import Contact from "./Contact";
import Expertise from "./Expertise";
import Hero from "./Hero";
import Nav from "../../components/Nav";
import Projects from "./Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Expertise />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </>
  )
}