import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import useAuth from '../../hooks/useAuth';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  hideSidebar?: boolean;
}

export default function Layout({ children, hideSidebar = false }: LayoutProps) {
  const { isAuthenticated } = useAuth();
  const showSidebar = isAuthenticated() && !hideSidebar;

  return (
    <div className="min-h-screen bg-gradient-to-b mt-20 from-black via-gray-900 to-black text-white flex flex-col">
      <Header />
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}
        <main 
          className={`flex-1 transition-all duration-300 ${
            showSidebar ? 'lg:ml-20 xl:ml-20' : ''
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
