import { icons } from "lucide-react";

const Icon = ({
  name,
  size,
  color,
}: {
  name: string;
  size?: string;
  color: string;
}) => {
  const LucideIcon = icons[name as keyof typeof icons];

  return <LucideIcon className={`h-5 w-5 ${color} `} />;
};

export default Icon;
