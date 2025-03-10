import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Linkedin, Mail } from "lucide-react";
import { Link } from "react-router";

export default function Contact() {

  const contactInfo = [
    {
      icon: <Mail />,
      title: "Email",
      link: "williamalexander1603@gmail.com",
      action: "mailto:"
    },
    {
      icon: <Linkedin />,
      title: "LinkedIn",
      link: "linkedin.com"
    },
    {
      icon: <SiGithub />,
      title: "GitHub",
      link: "github.com/polardyth"
    }
  ]

  return (
    <section id="contact" className="py-20 my-20">
      <h2 className="text-4xl font-bold">Lets Work Together</h2>
      <p className="text-muted-foreground">Have a project in mind or just want to connect? Feel free to reach out!</p>
      <div className="flex items-center justify-center mx-auto gap-14 mt-8 max-w-3xl">
        <div className="space-y-6">
        {contactInfo.map((prop, index) => (
          <div key={index}>
            <div className="flex items-center gap-4 text-left">
                <Link to={prop.action ? prop.action + prop.link : prop.link} className="bg-primary/20 p-4 rounded-lg text-primary hover:bg-primary/50 hover:text-foreground transition-colors hover:scale-110 transform duration-200">
                  {prop.icon}                
                </Link>
              <div>
                <h3 className="font-medium">{prop.title}</h3>
                <p className="text-muted-foreground">{prop.link}</p>
              </div>
            </div>
          </div>
        ))}
        </div>
        <form className="space-y-4 w-1/2">
          <Input type="text" placeholder="Your Name" />
          <Input type="email" placeholder="Your Email" />
          <Textarea placeholder="Your Message" rows={4} />
          <Button className="w-full cursor-pointer">Send Message</Button>
        </form>
      </div>
    </section>
  )
}