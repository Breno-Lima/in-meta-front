'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Layout from '../../../components/layout/Layout';
import Button from '../../../components/ui/Button';
import ProductForm from '../../../components/products/ProductForm';
import useAuth from '../../../hooks/useAuth';
import useProducts from '../../../hooks/useProducts';
import type { ProductFormData } from '@/types';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;
  
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { 
    currentProduct, 
    isLoading: productLoading, 
    fetchProductById,
    updateProduct,
    deleteProduct
  } = useProducts();
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated()) {
      router.push('/auth/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated() && productId) {
      const loadProduct = async () => {
        const result = await fetchProductById(productId);
        if (!result) {
          setError('Não foi possível carregar os detalhes do produto.');
        }
      };
      
      loadProduct();
    }
  }, [isAuthenticated, productId, fetchProductById]);

  const handleBackClick = () => {
    router.push('/dashboard');
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleUpdate = async (formData: ProductFormData) => {
    if (productId) {
      setError(null);
      const updatedProduct = await updateProduct(productId, formData);
      if (updatedProduct) {
        setIsEditMode(false);
      } else {
        setError('Não foi possível atualizar o produto. Tente novamente.');
      }
    }
  };

  const handleDelete = async () => {
    if (productId) {
      setError(null);
      const success = await deleteProduct(productId);
      if (success) {
        router.push('/products');
      } else {
        setError('Não foi possível excluir o produto. Tente novamente.');
        setIsDeleteModalOpen(false);
      }
    }
  };

  if (authLoading || productLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-8 w-8 border-4 border-cyan-400 border-t-transparent rounded-full"></div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated()) {
    return null; // Redirecionamento já está sendo feito no useEffect
  }

  if (!currentProduct) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
          <p className="text-gray-400 mb-6">O produto que você está procurando não existe ou foi removido.</p>
          <Button onClick={handleBackClick}>Voltar para a lista</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <div className="mb-6 flex flex-wrap items-center">
          <Button variant="outline" onClick={handleBackClick} className="flex items-center mr-4 mb-2 sm:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Voltar
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {isEditMode ? 'Editar Produto' : 'Detalhes do Produto'}
          </h1>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {isEditMode ? (
          <div 
            className="rounded-lg shadow-lg p-4 sm:p-6"
            style={{ background: 'linear-gradient(135deg, #0f2744 0%, #0a1c33 100%)' }}
          >
            <ProductForm
              initialData={currentProduct}
              onSubmit={handleUpdate}
              isLoading={productLoading}
            />
            <Button
              variant="outline"
              onClick={() => setIsEditMode(false)}
              className="mt-4"
            >
              Cancelar Edição
            </Button>
          </div>
        ) : (
          <div 
            className="rounded-lg shadow-lg overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0f2744 0%, #0a1c33 100%)' }}
          >
            <div className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/3 mb-6 lg:mb-0 lg:mr-6">
                  <div className="bg-blue-900/30 h-48 sm:h-64 rounded-lg flex items-center justify-center overflow-hidden border border-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      variant="secondary"
                      onClick={handleEdit}
                      className="flex-1 min-w-[120px] flex items-center justify-center bg-cyan-400 hover:bg-cyan-500 text-blue-950"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="flex-1 min-w-[120px] flex items-center justify-center text-red-400 hover:bg-red-400/10 border-red-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                      Excluir
                    </Button>
                  </div>
                </div>
                
                <div className="w-full lg:w-2/3">
                  <div className="flex flex-wrap justify-between items-start mb-4">
                    <div className="mb-2 lg:mb-0">
                      <h2 className="text-xl sm:text-2xl font-bold mb-2">{currentProduct.name}</h2>
                      <div className="inline-block px-3 py-1 rounded-full text-xs bg-blue-800/50 text-gray-300">
                        {currentProduct.category}
                      </div>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-cyan-400">
                      R$ {Math.min(currentProduct.price, 999999).toLocaleString('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2 text-white">Descrição</h3>
                    <p className="text-gray-300 bg-blue-900/30 p-4 rounded-lg border border-blue-800">{currentProduct.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2 text-white">Detalhes</h3>
                      <ul className="space-y-2 bg-blue-900/30 p-4 rounded-lg border border-blue-800">
                        <li className="flex justify-between flex-wrap">
                          <span className="text-gray-400">ID:</span>
                          <span className="font-mono text-gray-300 break-all">{currentProduct.id}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-400">Estoque:</span>
                          <span className={`font-medium ${
                            currentProduct.stock > 10
                              ? 'text-cyan-400'
                              : currentProduct.stock > 0
                              ? 'text-yellow-400'
                              : 'text-red-400'
                          }`}>
                            {currentProduct.stock} unidades
                          </span>
                        </li>
                        <li className="flex justify-between flex-wrap">
                          <span className="text-gray-400">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            currentProduct.stock > 10
                              ? 'bg-cyan-400/20 text-cyan-400'
                              : currentProduct.stock > 0
                              ? 'bg-yellow-400/20 text-yellow-400'
                              : 'bg-red-400/20 text-red-400'
                          }`}>
                            {currentProduct.stock > 10
                              ? 'Em estoque'
                              : currentProduct.stock > 0
                              ? 'Baixo estoque'
                              : 'Sem estoque'}
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2 text-white">Datas</h3>
                      <ul className="space-y-2 bg-blue-900/30 p-4 rounded-lg border border-blue-800">
                        <li className="flex justify-between flex-wrap">
                          <span className="text-gray-400">Criado em:</span>
                          <span className="text-gray-300">{new Date(currentProduct.createdAt).toLocaleDateString('pt-BR')}</span>
                        </li>
                        <li className="flex justify-between flex-wrap">
                          <span className="text-gray-400">Última atualização:</span>
                          <span className="text-gray-300">{new Date(currentProduct.updatedAt).toLocaleDateString('pt-BR')}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmação de exclusão */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
            <div className="w-full max-w-md rounded-lg overflow-hidden shadow-xl" style={{ background: 'linear-gradient(135deg, #0f2744 0%, #0a1c33 100%)' }}>
              <div className="flex justify-between items-center p-4 border-b border-blue-800">
                <h2 className="text-lg font-medium text-white">Confirmar Exclusão</h2>
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={() => setIsDeleteModalOpen(false)}
                  aria-label="Close"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <p className="mb-6 text-gray-300">
                  Tem certeza que deseja excluir o produto <span className="font-bold text-white">{currentProduct.name}</span>? Esta ação não pode ser desfeita.
                </p>
                <div className="flex flex-wrap justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="border-gray-600 text-gray-300 hover:bg-blue-800/50"
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={handleDelete}
                    isLoading={productLoading}
                  >
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
