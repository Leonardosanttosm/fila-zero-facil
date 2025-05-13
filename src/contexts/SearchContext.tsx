
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Provider, FilterType } from "../types/search";

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

export const categoryLabels: Record<string, string> = {
  "medical": "Médico",
  "salon": "Salão de Beleza",
  "notary": "Cartório",
  "dispatcher": "Despachante",
};

interface SearchContextProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  providers: Provider[];
  handleSearch: (query: string) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export function SearchProvider({ children, initialCategory = "", initialQuery = "" }: { 
  children: ReactNode;
  initialCategory?: string;
  initialQuery?: string;
}) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filter, setFilter] = useState<FilterType>("relevance");
  const [providers, setProviders] = useState<Provider[]>([]);

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

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      filter,
      setFilter,
      providers,
      handleSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
