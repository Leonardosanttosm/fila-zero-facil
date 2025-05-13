
import { Stethoscope, Scissors, FileText, Briefcase, MapPin, Clock, Star } from "lucide-react";
import { useState } from "react";
import CategoryCard from "../components/CategoryCard";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import ProviderCard from "../components/ProviderCard";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { title: "Médico", icon: Stethoscope, color: "bg-red-500", path: "/search?category=medical" },
    { title: "Salão de Beleza", icon: Scissors, color: "bg-purple-500", path: "/search?category=salon" },
    { title: "Cartório", icon: FileText, color: "bg-green-500", path: "/search?category=notary" },
    { title: "Despachante", icon: Briefcase, color: "bg-yellow-500", path: "/search?category=dispatcher" },
  ];

  const featuredProviders = [
    {
      id: "1",
      name: "Dra. Ana Silveira",
      specialty: "Clínico Geral",
      rating: 4.8,
      address: "Av. Paulista, 1000 - São Paulo, SP",
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: "2",
      name: "Salão Beleza Pura",
      specialty: "Cabelo e Manicure",
      rating: 4.5,
      address: "Rua Augusta, 500 - São Paulo, SP",
      imageUrl: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: "3",
      name: "Cartório 5º Ofício",
      specialty: "Reconhecimento de Firma",
      rating: 4.2,
      address: "Rua Voluntários da Pátria, 340 - Rio de Janeiro, RJ",
      imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=300&auto=format&fit=crop"
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Search for:", query);
    // Redirecionar para a página de busca com o termo de pesquisa
    // navigate(`/search?q=${query}`);
  };

  return (
    <div className="pb-16 md:pb-0 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Bem-vindo ao Fila Zero</h2>
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                icon={category.icon}
                color={category.color}
                path={category.path}
              />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Populares</h2>
            <Link to="/search" className="text-filaZero-blue hover:underline">
              Ver todos
            </Link>
          </div>
          <div>
            {featuredProviders.map((provider) => (
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
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Próximos a você</h2>
            <Link to="/search?sort=nearby" className="text-filaZero-blue hover:underline">
              Ver todos
            </Link>
          </div>
          <div>
            {featuredProviders.reverse().map((provider) => (
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
        </section>
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;
