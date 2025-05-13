
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChevronDown, MapPin, Filter, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import SearchBar from "../components/SearchBar";
import ProviderCard from "../components/ProviderCard";

type Provider = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  address: string;
  imageUrl: string;
  category: string;
  distance?: string;
};

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "";
  const initialQuery = queryParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filter, setFilter] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);

  // Mock data
  const mockProviders: Provider[] = [
    {
      id: "1",
      name: "Dra. Ana Silveira",
      specialty: "Clínico Geral",
      rating: 4.8,
      address: "Av. Paulista, 1000 - São Paulo, SP",
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
      category: "medical",
      distance: "1.2 km"
    },
    {
      id: "2",
      name: "Salão Beleza Pura",
      specialty: "Cabelo e Manicure",
      rating: 4.5,
      address: "Rua Augusta, 500 - São Paulo, SP",
      imageUrl: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=300&auto=format&fit=crop",
      category: "salon",
      distance: "0.8 km"
    },
    {
      id: "3",
      name: "Cartório 5º Ofício",
      specialty: "Reconhecimento de Firma",
      rating: 4.2,
      address: "Rua Voluntários da Pátria, 340 - Rio de Janeiro, RJ",
      imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=300&auto=format&fit=crop",
      category: "notary",
      distance: "2.5 km"
    },
    {
      id: "4",
      name: "Despachante Rápido",
      specialty: "Documentação Veicular",
      rating: 4.0,
      address: "Av. Brasil, 100 - Rio de Janeiro, RJ",
      imageUrl: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=300&auto=format&fit=crop",
      category: "dispatcher",
      distance: "3.1 km"
    },
    {
      id: "5",
      name: "Dr. Carlos Mendes",
      specialty: "Dermatologista",
      rating: 4.9,
      address: "Av. Rebouças, 500 - São Paulo, SP",
      imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop",
      category: "medical",
      distance: "1.5 km"
    },
  ];

  useEffect(() => {
    // Filtragem por categoria e termo de busca
    let filtered = [...mockProviders];
    
    if (selectedCategory) {
      filtered = filtered.filter(provider => provider.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        provider => 
          provider.name.toLowerCase().includes(query) || 
          provider.specialty.toLowerCase().includes(query) ||
          provider.address.toLowerCase().includes(query)
      );
    }
    
    // Ordenação
    if (filter === "distance") {
      filtered.sort((a, b) => {
        const distA = parseFloat(a.distance?.split(" ")[0] || "0");
        const distB = parseFloat(b.distance?.split(" ")[0] || "0");
        return distA - distB;
      });
    } else if (filter === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    
    setProviders(filtered);
  }, [searchQuery, selectedCategory, filter]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setShowFilters(false);
  };

  const categoryLabels: Record<string, string> = {
    "medical": "Médico",
    "salon": "Salão de Beleza",
    "notary": "Cartório",
    "dispatcher": "Despachante",
  };

  return (
    <div className="pb-16 md:pb-0 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">
          {selectedCategory 
            ? `Buscar ${categoryLabels[selectedCategory]}`
            : "Buscar Serviços"}
        </h2>
        
        <div className="mb-6">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder={selectedCategory 
              ? `Buscar ${categoryLabels[selectedCategory]}...` 
              : "Buscar serviços, profissionais..."}
          />
        </div>
        
        <div className="flex justify-between mb-6 overflow-x-auto py-2 -mx-4 px-4">
          <button 
            className={`px-4 py-2 rounded-full whitespace-nowrap mr-2 ${selectedCategory === "" 
              ? "bg-filaZero-blue text-white" 
              : "bg-filaZero-gray text-filaZero-darkGray"}`}
            onClick={() => setSelectedCategory("")}
          >
            Todos
          </button>
          <button 
            className={`px-4 py-2 rounded-full whitespace-nowrap mr-2 ${selectedCategory === "medical" 
              ? "bg-filaZero-blue text-white" 
              : "bg-filaZero-gray text-filaZero-darkGray"}`}
            onClick={() => setSelectedCategory("medical")}
          >
            Médico
          </button>
          <button 
            className={`px-4 py-2 rounded-full whitespace-nowrap mr-2 ${selectedCategory === "salon" 
              ? "bg-filaZero-blue text-white" 
              : "bg-filaZero-gray text-filaZero-darkGray"}`}
            onClick={() => setSelectedCategory("salon")}
          >
            Salão de Beleza
          </button>
          <button 
            className={`px-4 py-2 rounded-full whitespace-nowrap mr-2 ${selectedCategory === "notary" 
              ? "bg-filaZero-blue text-white" 
              : "bg-filaZero-gray text-filaZero-darkGray"}`}
            onClick={() => setSelectedCategory("notary")}
          >
            Cartório
          </button>
          <button 
            className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === "dispatcher" 
              ? "bg-filaZero-blue text-white" 
              : "bg-filaZero-gray text-filaZero-darkGray"}`}
            onClick={() => setSelectedCategory("dispatcher")}
          >
            Despachante
          </button>
        </div>
        
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
                  <star className="w-4 h-4 mr-1" />
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
        
        {providers.length > 0 ? (
          <div>
            {providers.map((provider) => (
              <ProviderCard
                key={provider.id}
                id={provider.id}
                name={provider.name}
                specialty={provider.specialty}
                rating={provider.rating}
                address={provider.address}
                imageUrl={provider.imageUrl}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-filaZero-darkGray">Nenhum resultado encontrado.</p>
            <p className="text-sm">Tente outros termos de busca ou filtros.</p>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default Search;
