import React from 'react';
import { DarkModeToggle } from '../shared/DarkModeToggle';
import { ThemeProvider } from '../contexts/ThemeContext';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        {/* Header with navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <nav className="flex items-center gap-8">
              <a 
                href="/"
                className="text-gray-900 dark:text-white font-semibold text-lg hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                Brendan Bockes
              </a>
              <div className="hidden md:flex items-center gap-6">
                <a 
                  href="#work"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Work
                </a>
                <a 
                  href="#about"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  About
                </a>
                <a 
                  href="https://blog.brendanbockes.com"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </div>
            </nav>
            <DarkModeToggle />
          </div>
        </header>
        
        {/* Main content with top padding for fixed header */}
        <main className="pt-16">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                © {new Date().getFullYear()} Brendan Bockes. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a 
                  href="#" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Privacy Policy
                </a>
                <a 
                  href="#" 
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
