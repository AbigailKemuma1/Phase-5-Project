import { Link } from 'react-router-dom';

const Navbar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/30">
              ⚡
            </div>
            <span className="text-xl font-bold text-gray-900">Smart Energy Tracker</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-600 hover:text-teal-600 font-semibold transition-colors relative group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-600 hover:text-teal-600 font-semibold transition-colors relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-emerald-600 font-semibold transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/appliances"
                className="text-gray-600 hover:text-emerald-600 font-semibold transition-colors"
              >
                Appliances
              </Link>
              <Link
                to="/analytics"
                className="text-gray-600 hover:text-emerald-600 font-semibold transition-colors"
              >
                Analytics
              </Link>
            <Link
              to="/login"
              className="text-gray-600 hover:text-teal-600 font-semibold transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

