import * as LucideReact from "lucide-react";
import React from "react";

interface StringToIconProps {
  name: keyof typeof LucideReact;
  styling?: string;
}

export default function StringToIcon({ name, styling }: StringToIconProps): React.JSX.Element {
  const IconComponent = LucideReact[name] as React.FC<React.SVGProps<SVGSVGElement>>;

  if (!IconComponent) {
    return <LucideReact.CircleHelp className={styling} />;
  }

  return <IconComponent className={styling} />;
}