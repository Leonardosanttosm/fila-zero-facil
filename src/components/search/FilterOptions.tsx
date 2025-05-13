
import { useState } from "react";
import { Filter, ChevronDown, MapPin, Star, Clock } from "lucide-react";
import { useSearch } from "../../contexts/SearchContext";
import { FilterType } from "../../types/search";

const FilterOptions = () => {
  const { filter, setFilter } = useSearch();
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    setShowFilters(false);
  };

  return (
    <div className="mb-6 relative">
      <button 
        className="flex items-center px-4 py-2 rounded-lg bg-filaZero-gray text-filaZero-darkGray"
        onClick={() => setShowFilters(!showFilters)}
      >
        <Filter className="w-4 h-4 mr-1" />
        Filtrar
        <ChevronDown className="w-4 h-4 ml-1" />
      </button>
      
      {showFilters && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg p-3 z-10 w-64 border">
          <div className="mb-2 font-medium">Ordenar por:</div>
          <div 
            className={`p-2 rounded cursor-pointer ${filter === "relevance" ? "bg-filaZero-lightBlue text-filaZero-blue" : ""}`}
            onClick={() => handleFilterChange("relevance")}
          >
            <p>Relevância</p>
          </div>
          <div 
            className={`p-2 rounded cursor-pointer ${filter === "distance" ? "bg-filaZero-lightBlue text-filaZero-blue" : ""}`}
            onClick={() => handleFilterChange("distance")}
          >
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <p>Distância</p>
            </div>
          </div>
          <div 
            className={`p-2 rounded cursor-pointer ${filter === "rating" ? "bg-filaZero-lightBlue text-filaZero-blue" : ""}`}
            onClick={() => handleFilterChange("rating")}
          >
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1" />
              <p>Melhor avaliados</p>
            </div>
          </div>
          <div 
            className={`p-2 rounded cursor-pointer ${filter === "availability" ? "bg-filaZero-lightBlue text-filaZero-blue" : ""}`}
            onClick={() => handleFilterChange("availability")}
          >
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <p>Disponibilidade</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterOptions;
