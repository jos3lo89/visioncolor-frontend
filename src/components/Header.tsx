import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="sticky top-0 left-0 w-full z-50 transition-all duration-300 bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <h1 className="text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-600 mb-4">
          Visión Color
        </h1>
        <nav>
          <ul className="flex space-x-6 text-gray-300 font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/history"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Historial
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
