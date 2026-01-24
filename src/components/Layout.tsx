import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import { DarkModeToggle } from '../shared/DarkModeToggle';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isWorkPage = location.pathname === '/';
  const isAboutPage = location.pathname === '/about';
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        {/* Header with navigation */}
        <header className="px-8 md:px-16 py-8">
          <div className="max-w-[960px] mx-auto flex items-center justify-between">
            <Link 
              to="/"
              className="text-gray-900 dark:text-white font-bold text-2xl md:text-3xl hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Brendan Bockes
            </Link>
            <nav className="flex items-center gap-6">
              <Link 
                to="/"
                className={`text-gray-900 dark:text-white transition-colors ${
                  isWorkPage 
                    ? 'font-bold underline cursor-default' 
                    : 'hover:text-blue-600 dark:hover:text-blue-400 hover:underline'
                }`}
              >
                Work
              </Link>
              <Link 
                to="/about"
                className={`text-gray-900 dark:text-white transition-colors ${
                  isAboutPage 
                    ? 'font-bold underline cursor-default' 
                    : 'hover:text-blue-600 dark:hover:text-blue-400 hover:underline'
                }`}
              >
                About
              </Link>
              <DarkModeToggle />
            </nav>
          </div>
        </header>
        
        {/* Main content */}
        <main>
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-gray-800 px-8 md:px-16 py-8">
          <div className="max-w-[960px] mx-auto flex items-center justify-between">
            <p className="text-gray-900 dark:text-gray-300 text-base">
              Brendan Bockes · {new Date().getFullYear()}
            </p>
            <button
              onClick={scrollToTop}
              className="bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 rounded hover:bg-blue-600 dark:hover:bg-blue-500 transition-all hover:-translate-y-1 text-sm font-medium"
            >
              Back to Top
            </button>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
