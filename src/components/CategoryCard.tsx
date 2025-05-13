
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
  path: string;
}

const CategoryCard = ({ title, icon: Icon, color, path }: CategoryCardProps) => {
  return (
    <Link to={path} className="animate-fade-in">
      <div className="card flex flex-col items-center justify-center p-6 hover:scale-105 transition-all duration-300">
        <div className={`p-4 rounded-full ${color} mb-4`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-center">{title}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
