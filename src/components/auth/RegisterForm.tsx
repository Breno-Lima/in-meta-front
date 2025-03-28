'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuth from '../../hooks/useAuth';
import Button from '../ui/Button';

export default function RegisterForm(){
  const router = useRouter();
  const { register, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      errors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      errors.password = 'A senha deve ter pelo menos 6 caracteres';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const success = await register(formData);
    if (success) {
      router.push('/auth/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-dark-gray rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Crie sua conta</h1>
            <p className="text-gray-400">Preencha o formulário para começar</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Seu nome completo"
                className={`w-full p-3 bg-gray border ${
                  formErrors.name ? 'border-error' : 'border-gray/50'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange`}
                value={formData.name}
                onChange={handleChange}
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-error">{formErrors.name}</p>
              )}
            </div>

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
                className={`w-full p-3 bg-gray border ${
                  formErrors.email ? 'border-error' : 'border-gray/50'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange`}
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-error">{formErrors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className={`w-full p-3 bg-gray border ${
                  formErrors.password ? 'border-error' : 'border-gray/50'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange`}
                value={formData.password}
                onChange={handleChange}
              />
              {formErrors.password && (
                <p className="mt-1 text-sm text-error">{formErrors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mb-6"
              isLoading={isLoading}
            >
              Registrar
            </Button>

            <div className="text-center text-sm">
              Já tem uma conta?{' '}
              <Link href="/auth/login" className="text-orange hover:underline">
                Entrar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
