
import { useSearch } from "../../contexts/SearchContext";
import ProviderCard from "../ProviderCard";
import NoResults from "./NoResults";

const SearchResults = () => {
  const { providers } = useSearch();

  if (providers.length === 0) {
    return <NoResults />;
  }

  return (
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
  );
};

export default SearchResults;
