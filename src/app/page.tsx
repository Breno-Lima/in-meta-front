'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuth from '../hooks/useAuth';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-black/40 z-0"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-4 md:mb-6 drop-shadow-lg">
            Sistema Inteligente de <br className="hidden md:block" />
            Gerenciamento de Produtos
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-10 leading-relaxed max-w-3xl mx-auto px-4">
            Gerencie seu inventário com eficiência e precisão. Aumente suas vendas com insights de dados em tempo real.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/auth/login"
              className="w-full sm:w-auto inline-flex justify-center items-center text-center min-w-[160px] bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 px-8 rounded-full text-lg transition-transform duration-200 transform hover:scale-105 hover:shadow-lg shadow-md"
            >
              Entrar
            </Link>

            <Link
              href="/auth/register"
              className="w-full sm:w-auto inline-flex justify-center items-center text-center min-w-[160px] bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full text-lg transition-transform duration-200 transform hover:scale-105 hover:bg-white/10 shadow-md"
            >
              Registrar
            </Link>
          </div>
        </div>
        
        {/* Animated dots background effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute w-4 h-4 bg-cyan-500 rounded-full top-1/4 left-1/4 animate-pulse opacity-20"></div>
          <div className="absolute w-3 h-3 bg-blue-500 rounded-full top-1/3 left-1/2 animate-pulse opacity-10" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute w-5 h-5 bg-cyan-300 rounded-full top-2/3 left-1/3 animate-pulse opacity-20" style={{ animationDelay: '1s' }}></div>
          <div className="absolute w-2 h-2 bg-blue-400 rounded-full top-3/4 left-3/4 animate-pulse opacity-10" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute w-6 h-6 bg-cyan-500 rounded-full top-1/3 right-1/4 animate-pulse opacity-20" style={{ animationDelay: '2s' }}></div>
        </div>
      </header>
    </div>
  );
}
