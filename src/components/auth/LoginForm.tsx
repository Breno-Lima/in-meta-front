  'use client';

  import React, { useState } from 'react';
  import { useRouter } from 'next/navigation';
  import Link from 'next/link';
  import useAuth from '../../hooks/useAuth';
  import Button from '../ui/Button';

export default function LoginForm() {
    const router = useRouter();
    const { login, isLoading, error } = useAuth();
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      console.log('Attempting login with:', formData);
      
      try {
        const success = await login(formData);
        console.log('Login result:', success);
        if (success) {
          router.push('/dashboard');
        }
      } catch (err) {
        console.error('Login submission error:', err);
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-dark-gray rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Bem-vindo de volta</h1>
              <p className="text-gray-400">Entre com suas credenciais para continuar</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="email@exemplo.com"
                  className="w-full p-3 bg-gray border border-gray/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Senha
                  </label>
                  <Link href="/auth/forgot-password" className="text-sm text-orange hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full p-3 bg-gray border border-gray/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full mb-6"
                isLoading={isLoading}
              >
                Entrar
              </Button>

              <div className="text-center text-sm">
                Não tem uma conta?{' '}
                <Link href="/auth/register" className="text-orange hover:underline">
                  Registre-se
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
