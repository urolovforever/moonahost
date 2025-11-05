import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Bosh sahifa' },
    { path: '/products', label: 'Mahsulotlar' },
    { path: '/about', label: 'Biz haqimizda' },
    { path: '/contact', label: "Bog'lanish" },
  ];

  return (
    <nav className="bg-white shadow-soft-lg sticky top-0 z-50 border-b-2 border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="MoonGift Logo" className="h-12 w-12 object-contain" />
            <span className="text-4xl font-bold text-primary tracking-tight">MoonGift</span>
          </Link>

          <div className="hidden md:flex space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors text-lg font-semibold ${
                  isActive(link.path) ? 'text-accent' : 'text-text-primary hover:text-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-button text-primary hover:bg-surface-light transition-colors">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-5 py-3 rounded-button font-semibold transition-colors ${
                  isActive(link.path) ? 'bg-surface-light text-accent' : 'text-text-primary hover:bg-surface-light'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
