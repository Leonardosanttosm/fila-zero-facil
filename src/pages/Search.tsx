
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import SearchBar from "../components/SearchBar";
import { SearchProvider, categoryLabels } from "../contexts/SearchContext";
import CategoryFilter from "../components/search/CategoryFilter";
import FilterOptions from "../components/search/FilterOptions";
import SearchResults from "../components/search/SearchResults";
import { useSearch } from "../contexts/SearchContext";

const SearchContent = () => {
  const { handleSearch, selectedCategory } = useSearch();

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
        
        <CategoryFilter />
        <FilterOptions />
        <SearchResults />
      </main>
      <BottomNav />
    </div>
  );
};

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "";
  const initialQuery = queryParams.get("q") || "";

  return (
    <SearchProvider initialCategory={initialCategory} initialQuery={initialQuery}>
      <SearchContent />
    </SearchProvider>
  );
};

export default Search;
