import React, { useState, useEffect, type JSX } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItem {
  name: string;
  href: string;
  icon: JSX.Element;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIsMobile();
    
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Close mobile sidebar when navigating
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const menuItems: SidebarItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      ),
    }
  ];

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const MobileMenuButton = () => (
    <button 
      onClick={toggleMobileSidebar}
      className="fixed z-50 bottom-6 right-6 p-3 rounded-full bg-cyan-500 text-blue-950 shadow-lg lg:hidden"
      aria-label="Toggle menu"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${isMobileOpen ? 'rotate-90' : 'rotate-0'}`}
      >
        {isMobileOpen ? (
          <>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </>
        ) : (
          <>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </>
        )}
      </svg>
    </button>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-screen pt-16 transition-all duration-300 z-10 bg-gradient-to-b from-blue-900 to-blue-950 shadow-lg rounded-r-xl hidden lg:block ${
          isExpanded ? 'w-64' : 'w-20'
        }`}
        onMouseEnter={() => !isMobile && setIsExpanded(true)}
        onMouseLeave={() => !isMobile && setIsExpanded(false)}
        style={{ 
          backgroundImage: 'linear-gradient(to bottom, #0f2744, #0a1c33)', 
        }}
      >
        <div className="p-4 mb-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="bg-cyan-400 p-1 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
              </div>
              <span className={`ml-3 font-bold text-white text-lg transition-opacity duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
                INMETA
              </span>
            </div>
          </div>
        </div>

        <nav className="px-3">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`relative flex items-center ${isExpanded ? 'px-4' : 'justify-center'} py-3 rounded-lg text-sm transition-all group`}
                    title={!isExpanded ? item.name : ''}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-cyan-400/20 rounded-lg"></div>
                    )}
                    
                    <span className={`z-10 ${isActive ? 'text-cyan-400' : 'text-gray-400 group-hover:text-cyan-400'} transition-colors`}>
                      {item.icon}
                    </span>
                    
                    <span className={`z-10 ml-4 whitespace-nowrap transition-all ${isActive ? 'text-white font-medium' : 'text-gray-300'} ${isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                      {item.name}
                    </span>
                    
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-r"></div>
                    )}
                    
                    {!isExpanded && (
                      <div className={`absolute left-full ml-2 px-3 py-1 bg-blue-900 text-white text-xs font-medium rounded whitespace-nowrap transition-opacity ${isActive ? 'bg-cyan-500' : ''} opacity-0 group-hover:opacity-100 pointer-events-none`}>
                        {item.name}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileOpen(false)}
      ></div>

      <aside 
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out transform bg-gradient-to-t from-blue-900 to-blue-950 shadow-lg rounded-t-xl ${
          isMobileOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ 
          backgroundImage: 'linear-gradient(to top, #0f2744, #0a1c33)',
          maxHeight: '70vh'
        }}
      >
        <div className="py-6 px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-cyan-400 p-1 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
              </div>
              <span className="ml-3 font-bold text-white text-lg">
                INMETA
              </span>
            </div>
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <nav>
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg text-base transition-all ${
                        isActive ? 'bg-cyan-400/20 text-white' : 'text-gray-300 hover:bg-blue-800/30 hover:text-white'
                      }`}
                    >
                      <span className={`${isActive ? 'text-cyan-400' : 'text-gray-400'} mr-4`}>
                        {item.icon}
                      </span>
                      {item.name}
                      {isActive && (
                        <div className="ml-auto bg-cyan-400 h-2 w-2 rounded-full"></div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      <MobileMenuButton />
    </>
  );
};
