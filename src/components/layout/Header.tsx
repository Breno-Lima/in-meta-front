import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useAuth from '../../hooks/useAuth';
import Image from 'next/image';
import logoInMeta from '../../../public/inmeta-logo.svg';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    console.log('Current user in Header:', user);
  }, [user]);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-20 shadow-lg h-16"
      style={{ 
        backgroundImage: 'linear-gradient(to right, #0f2744, #0a1c33)', 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src={logoInMeta}
            width={120}
            height={40}
            alt='logo inmeta'
          />
        </Link>

        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="text-gray-300 hover:text-cyan-400 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6">
            {isAuthenticated() ? (
              <>
                <li>
                  <Link 
                    href="/dashboard" 
                    className="text-gray-300 hover:text-cyan-400 text-sm font-medium relative group transition-colors duration-200"
                  >
                    Dashboard
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
                <li className="flex items-center">
                  <div className="relative group">
                    <button className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 text-sm font-medium transition-colors duration-200">
                      <span className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center mr-2 border border-cyan-400/40">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <span className="hidden sm:inline">{user?.name || 'Usuário'}</span>
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:rotate-180">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-gradient-to-b from-blue-900 to-blue-950 rounded-lg shadow-lg overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 border border-blue-800">
                      <div className="py-1">
                        <button
                          onClick={logout}
                          className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-cyan-400/20 hover:text-white transition-colors relative group"
                        >
                          <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-cyan-400">
                              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                              <polyline points="16 17 21 12 16 7"></polyline>
                              <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            Sair
                          </span>
                          <span className="absolute left-0 top-0 h-full w-0 bg-cyan-400/10 group-hover:w-1 transition-all duration-200"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    href="/auth/login" 
                    className="text-gray-300 hover:text-cyan-400 text-sm font-medium relative group transition-colors duration-200"
                  >
                    Entrar
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/auth/register" 
                    className="bg-cyan-400 hover:bg-cyan-500 text-blue-950 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 transform hover:scale-105"
                  >
                    Cadastrar
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-900 to-blue-950 border-t border-blue-800">
          <nav className="px-4 py-3">
            <ul className="space-y-2">
              {isAuthenticated() ? (
                <>
                  <li>
                    <Link 
                      href="/dashboard" 
                      className="block py-2 text-gray-300 hover:text-cyan-400"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <span className="block py-2 text-gray-300">
                      {user?.name || 'Usuário'}
                    </span>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center py-2 text-gray-300 hover:text-red-400 w-full"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-cyan-400">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Sair
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      href="/auth/login" 
                      className="block py-2 text-gray-300 hover:text-cyan-400"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Entrar
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/auth/register" 
                      className="block py-2 text-gray-300 hover:text-cyan-400"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Cadastrar
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
