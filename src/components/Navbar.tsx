
import { Bell, Search, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm py-3 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-filaZero-blue text-2xl font-bold">Fila Zero</h1>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/search" className="p-2 text-filaZero-darkGray hover:text-filaZero-blue">
            <Search className="h-6 w-6" />
          </Link>
          <Link to="/notifications" className="p-2 text-filaZero-darkGray hover:text-filaZero-blue">
            <Bell className="h-6 w-6" />
          </Link>
          <Link 
            to="/profile" 
            className="p-2 text-filaZero-darkGray hover:text-filaZero-blue rounded-full bg-filaZero-lightBlue"
          >
            <User className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
