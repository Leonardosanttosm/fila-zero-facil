
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface ProviderCardProps {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  address: string;
  imageUrl: string;
}

const ProviderCard = ({ id, name, specialty, rating, address, imageUrl }: ProviderCardProps) => {
  return (
    <Link to={`/provider/${id}`} className="block w-full">
      <div className="card flex p-4 mb-4">
        <div className="w-20 h-20 mr-4 flex-shrink-0">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-filaZero-darkGray">{specialty}</p>
          <div className="flex items-center mt-1">
            <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
            <span className="text-sm">{rating}</span>
          </div>
          <p className="text-xs mt-1 text-gray-500 truncate">{address}</p>
        </div>
        <div className="ml-auto flex items-center">
          <button className="btn-primary text-sm">Agendar</button>
        </div>
      </div>
    </Link>
  );
};

export default ProviderCard;
