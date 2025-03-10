import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { useState, useEffect } from "react";

export default function Hero() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ["Digital", "Personal", "Creative", "Innovative"];
  const period = 1500;

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 80 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), period);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  return (
    <section id="home" className="container mx-auto py-20 md:py-32 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 space-y-6 flex flex-col items-start text-left">
        <span className="bg-muted text-primary px-3 py-1 rounded text-sm">MSc Software Engineering Student</span>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          <span>Building</span> <br />
          <span className="text-secondary inline-block min-w-[200px]">{text}<span className="animate-pulse duration-0.5s">|</span></span> <br />
          <span>Experiences</span>
        </h1>
        <p className="text-muted-foreground">
          Heriot Watt University student with expertise in Java, React, and Python, creating innovative software solutions.
        </p>
        <div className="flex gap-5">
          <Button asChild>
            <Link to="/projects" className="group">
              View Projects <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/resume">
              Resume
            </Link>
          </Button>
        </div>
        <div className="flex gap-5 items-center">
          <Link to="github.com">
            <SiGithub className="w-5px h-5px text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200" />
          </Link>
          <Link to="linkedin.com">
            <Linkedin className="w-5px h-5px text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200" />
          </Link>
          <Link to="linkedin.com">
            <Mail className="w-5px h-5px text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200" />
          </Link>
        </div>
      </div>

      {/* Rest of the component remains unchanged */}
      <div>
        <svg width="600" height="500" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg">
          {/* Terminal window background */}
          <rect x="10" y="10" width="480" height="380" rx="10" ry="10" fill="#1F1F3A" stroke="#252a3a" strokeWidth="2" />

          {/* Terminal header bar */}
          <rect x="10" y="10" width="480" height="30" rx="10" ry="10" fill="#252a3a" />

          {/* Terminal buttons */}
          <circle cx="30" cy="25" r="6" fill="#E11D48" opacity="0.8" />
          <circle cx="50" cy="25" r="6" fill="#F0C674" opacity="0.8" />
          <circle cx="70" cy="25" r="6" fill="#A855F7" opacity="0.8" />

          {/* Terminal title */}
          <text x="250" y="27" fontFamily="monospace" fontSize="12" fill="#FFFFFF" textAnchor="middle">william@portfolio ~ </text>

          {/* Command prompt content */}
          <text x="30" y="70" fontFamily="monospace" fontSize="14" fill="#F0C674">$</text>
          <text x="45" y="70" fontFamily="monospace" fontSize="14" fill="#FFFFFF"> cd projects</text>

          <text x="30" y="100" fontFamily="monospace" fontSize="14" fill="#F0C674">$</text>
          <text x="45" y="100" fontFamily="monospace" fontSize="14" fill="#FFFFFF"> ls -la</text>

          <text x="30" y="130" fontFamily="monospace" fontSize="14" fill="#A855F7">total 4</text>

          <Link to="#projects">
            <text x="30" y="160" fontFamily="monospace" fontSize="14" fill="#FFFFFF">drwxr-xr-x  2 william  staff  web-development</text>
          </Link>

          <Link to="#projects">
            <text x="30" y="190" fontFamily="monospace" fontSize="14" fill="#FFFFFF">drwxr-xr-x  2 william  staff  machine-learning</text>
          </Link>

          <Link to="#projects">
            <text x="30" y="220" fontFamily="monospace" fontSize="14" fill="#FFFFFF">drwxr-xr-x  2 william  staff  data-analysis</text>
          </Link>

          <text x="30" y="250" fontFamily="monospace" fontSize="14" fill="#F0C674">$</text>
          <text x="45" y="250" fontFamily="monospace" fontSize="14" fill="#FFFFFF"> cd web-development</text>

          <text x="30" y="280" fontFamily="monospace" fontSize="14" fill="#F0C674">$</text>
          <text x="45" y="280" fontFamily="monospace" fontSize="14" fill="#FFFFFF"> npm run dev</text>

          <Link to="#skills">
            <text x="30" y="310" fontFamily="monospace" fontSize="14" fill="#A855F7">Starting development server...</text>
          </Link>

          <Link to="#contact">
            <text x="30" y="340" fontFamily="monospace" fontSize="14" fill="#A855F7">Ready to connect - http://localhost:3000</text>
          </Link>

          {/* Blinking cursor */}
          <rect x="30" y="370" width="10" height="2" fill="#FFFFFF">
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>
    </section>
  )
}