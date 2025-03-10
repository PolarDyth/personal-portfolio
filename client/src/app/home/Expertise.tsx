import { Code, Database, Terminal } from 'lucide-react';

export default function Expertise() {



  const cards = [
    {
      icon: <Code />,
      title: "Frontend Development",
      description: "Creating responsive and interactive user interfaces with modern frameworks.",
      languages: [
        "React",
        "Tailwind CSS",
        "Typescript",
        "Javascript"
      ]
    },
    {
      icon: <Database />,
      title: "Backend Development",
      description: "Building robust server-side applications and APIs for seamless data flow.",
      languages: [
        "Java",
        "Spring Boot",
        "Node.js",
        "SQL"
      ]
    },
    {
      icon: <Terminal />,
      title: "Data Science",
      description: "Analyzing and visualizing data to extract meaningful insights and patterns.",
      languages: [
        "Python",
        "Pandas",
        "NumPy",
        "Matplotlib"
      ]
    },
  ]

  return (
    <section id="skills" className="bg-muted/50 px-6 py-20 rounded-3xl">
      <div>
        <h1 className="text-4xl font-bold mb-4">Technical Expertise</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">With a strong foundation in multiple programming languages and frameworks, I build robust and scalable applications.</p>
      </div>
      <div className="flex">
        {cards.map((props, index) => (
          <div       key={index} 
          className="text-left cursor-pointer flex flex-col gap-4 p-8 rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-1 duration-300" style={{ animationDelay: `${index * 200}ms` }}>
            <div className="bg-primary/20 text-primary p-4 rounded-lg mb-4 w-fit">
              {props.icon}
            </div>
            <h2 className="text-xl">{props.title}</h2>
            <p className="text-muted-foreground">{props.description}</p>
            <div className="flex flex-wrap gap-2">
              {props.languages.map((language, index) => (
                <span key={index} className="bg-background rounded-full px-2 py-1 text-sm">{language}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}