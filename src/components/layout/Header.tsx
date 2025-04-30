import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Calendar } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { cn } from '../../utils/cn';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';

const navItems = [
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const getDashboardPath = () => {
    if (!user) return '/dashboard';
    switch (user.role) {
      case 'admin':
        return '/admin';
      case 'commercial':
        return '/commercial';
      default:
        return '/dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://github.com/QRUMN/imgaes/blob/main/ICON.png?raw=true" 
              alt="Grinnage Exterminating Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Grinnage Exterminating
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive(item.path) 
                    ? "text-[#56e39f]" 
                    : "text-gray-600 dark:text-gray-300 hover:text-[#56e39f] dark:hover:text-[#56e39f]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <Button
                onClick={() => navigate(getDashboardPath())}
                variant="primary"
                className="hidden md:flex"
              >
                Dashboard
              </Button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="hidden md:flex px-4 py-2 text-[#56e39f] hover:text-[#48c98a] transition-colors"
                >
                  Login
                </button>
                <Button
                  onClick={() => navigate('/consultation')}
                  variant="consultation"
                  className="hidden md:flex items-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Free Consultation
                </Button>
              </>
            )}
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden fixed inset-x-0 top-16 p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out",
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        )}>
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-base font-medium transition-colors px-4 py-2 rounded-lg",
                  isActive(item.path) 
                    ? "bg-[#56e39f]/10 text-[#56e39f]" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-[#56e39f]/10"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <Button
                onClick={() => {
                  navigate(getDashboardPath());
                  setIsMenuOpen(false);
                }}
                variant="primary"
                className="w-full"
              >
                Dashboard
              </Button>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-[#56e39f] hover:text-[#48c98a] transition-colors"
                >
                  Login
                </button>
                <Button
                  onClick={() => {
                    navigate('/consultation');
                    setIsMenuOpen(false);
                  }}
                  variant="consultation"
                  className="w-full flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Free Consultation
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};