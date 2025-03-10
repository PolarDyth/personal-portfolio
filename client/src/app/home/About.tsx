import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function About() {
  
  return (
    <section id="about" className="flex flex-col gap-12 justify-between text-left items-center md:flex-row">
      <div className="md:w-1/2 relative">
        <img src="https://kzmqem5a2thfoqjtshg0.lite.vusercontent.net/placeholder.svg" alt="" width="500" height="500" className="rounded-2xl w-full max-w-md m-auto"/>
        <div className="absolute -bottom-6 -right-1 bg-card/30 p-6 rounded-xl shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center">
              <span className="text-3xl text-primary font-bold">2+</span>
              <span className="text-muted-foreground text-sm">Years Coding</span>
            </div>
            <div className="h-12 w-px bg-border"/>
            <div className="flex flex-col items-center">
              <span className="text-3xl text-primary font-bold">15+</span>
              <span className="text-muted-foreground text-sm">Projects</span>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 flex flex-col gap-6">
        <span className="bg-muted text-primary px-3 py-1 rounded-lg text-sm w-fit">About Me</span>
        <h2 className="text-4xl font-bold">Software Engineer & Problem Solver</h2>
        <p>I'm a Master's student in Software Engineering at Heriot Watt University, passionate about creating elegant solutions to complex problems. With a strong foundation in Java, React, and Python, I enjoy building applications that are both functional and user-friendly.</p>
        <p>My academic journey has equipped me with theoretical knowledge, while my personal projects have given me practical experience in software development. I'm constantly learning and exploring new technologies to expand my skill set.</p>
        <Button asChild className="w-fit group">
          <Link to="/">Download Resume <ArrowRight className="transition-transform group-hover:translate-x-1" /></Link>
        </Button>
      </div>
    </section>
    )
}