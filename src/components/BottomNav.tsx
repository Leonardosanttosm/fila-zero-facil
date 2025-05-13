
import { Calendar, Home, Search, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  
  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] px-4 py-2 z-10">
      <div className="flex justify-between items-center">
        <Link 
          to="/" 
          className={`flex flex-col items-center p-2 ${location.pathname === '/' ? 'text-filaZero-blue' : 'text-filaZero-darkGray'}`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs">Início</span>
        </Link>
        <Link 
          to="/search" 
          className={`flex flex-col items-center p-2 ${location.pathname === '/search' ? 'text-filaZero-blue' : 'text-filaZero-darkGray'}`}
        >
          <Search className="h-6 w-6" />
          <span className="text-xs">Buscar</span>
        </Link>
        <Link 
          to="/appointments" 
          className={`flex flex-col items-center p-2 ${location.pathname === '/appointments' ? 'text-filaZero-blue' : 'text-filaZero-darkGray'}`}
        >
          <Calendar className="h-6 w-6" />
          <span className="text-xs">Agenda</span>
        </Link>
        <Link 
          to="/profile" 
          className={`flex flex-col items-center p-2 ${location.pathname === '/profile' ? 'text-filaZero-blue' : 'text-filaZero-darkGray'}`}
        >
          <User className="h-6 w-6" />
          <span className="text-xs">Perfil</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
