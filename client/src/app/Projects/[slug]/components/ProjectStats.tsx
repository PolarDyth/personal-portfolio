import StringToIcon from "../../../utility/StringToIcon"


interface ProjectStatsProps {
  stats: {
    label: string;
    value: string;
    icon: {
      name: keyof typeof StringToIcon,
      styling?: string
    }
  }[];
}

export default function ProjectStats(prop: ProjectStatsProps) {
  return (
    <section id="stats">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-between">
          {prop.stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-x-4 border border-border p-4 rounded-lg"
            >
              <div className="flex items-center justify-center m-0 w-12 h-12 bg-primary/10 rounded-full">
                {StringToIcon(stat.icon)}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
