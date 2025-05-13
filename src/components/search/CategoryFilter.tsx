
import { useSearch, categoryLabels } from "../../contexts/SearchContext";

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory } = useSearch();

  return (
    <div className="flex justify-between mb-6 overflow-x-auto py-2 -mx-4 px-4">
      <button 
        className={`px-4 py-2 rounded-full whitespace-nowrap mr-2 ${selectedCategory === "" 
          ? "bg-filaZero-blue text-white" 
          : "bg-filaZero-gray text-filaZero-darkGray"}`}
        onClick={() => setSelectedCategory("")}
      >
        Todos
      </button>
      {Object.entries(categoryLabels).map(([value, label]) => (
        <button 
          key={value}
          className={`px-4 py-2 rounded-full whitespace-nowrap mr-2 ${selectedCategory === value 
            ? "bg-filaZero-blue text-white" 
            : "bg-filaZero-gray text-filaZero-darkGray"}`}
          onClick={() => setSelectedCategory(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
