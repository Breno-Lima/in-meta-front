'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/layout/Layout';
import useAuth from '../../hooks/useAuth';
import useProducts from '../../hooks/useProducts';
import ProductForm from '@/components/products/ProductForm';
import type { Product, ProductFormData } from '@/types';

// Imported Components
import MetricsSection from '@/components/dashboard/MetricsSection';
import ProductsSection from '@/components/dashboard/ProductsSection';
import type { MetricCardProps } from '@/components/dashboard/MetricsCard';
import DeleteConfirmationModal from '@/components/dashboard/DeleteModal';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Modal } from '@/components/ui/Modal';


export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const {
    products,
    totalPages,
    currentPage,
    isLoading,
    isLoading: productsLoading,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [metrics, setMetrics] = useState<MetricCardProps[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [productNameToDelete, setProductNameToDelete] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const handleOpenCreateModal = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };

  const handleSubmitForm = async (formData: ProductFormData) => {
    let success = false;

    if (currentProduct) {
      const result = await updateProduct(currentProduct.id, formData);
      success = !!result;
    } else {
      const result = await createProduct(formData);
      success = !!result;
    }

    if (success) {
      setIsModalOpen(false);
      fetchProducts({ page: currentPage, limit: 5 });
    }
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated()) {
      router.push('/auth/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated()) {
      fetchProducts({ page: 1, limit: 5 });
    }
  }, [isAuthenticated, fetchProducts]);

  useEffect(() => {
    if (!productsLoading && products.length > 0) {
      const stockValue = products.reduce((acc, product) => {
        const safePrice = Math.min(product.price, 999999);
        return acc + (safePrice * product.stock);
      }, 0);

      const totalPrice = products.reduce((acc, product) => {
        const safePrice = Math.min(product.price, 999999);
        return acc + safePrice;
      }, 0);
      const averagePrice = totalPrice / products.length;

      const dashboardMetrics: MetricCardProps[] = [
        {
          title: 'Total de Produtos',
          value: products.length,
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          ),
          change: {
            value: '+12.5%',
            isPositive: true,
          },
        },
        {
          title: 'Valor do Estoque',
          value: 'R$ ' + stockValue.toLocaleString('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 2 }),
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          change: {
            value: '+8.2%',
            isPositive: true,
          },
        },
        {
          title: 'Produtos sem Estoque',
          value: products.filter(p => p.stock === 0).length,
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
          change: {
            value: '-5.0%',
            isPositive: false,
          },
        },
        {
          title: 'Média de Preço',
          value: 'R$ ' + averagePrice.toLocaleString('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 2 }),
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ),
          change: {
            value: '+2.8%',
            isPositive: true,
          },
        },
      ];

      setMetrics(dashboardMetrics);
    }
  }, [products, productsLoading]);

  const handleOpenDeleteModal = (id: string, name: string) => {
    setProductToDelete(id);
    setProductNameToDelete(name);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteProduct = async () => {
    if (productToDelete) {
      setIsDeleting(true);
      const success = await deleteProduct(productToDelete);
      setIsDeleting(false);

      if (success) {
        setIsDeleteModalOpen(false);
        fetchProducts({ page: currentPage, limit: 5 });
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchProducts({ page: newPage, limit: 5 });
    }
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="w-full">
        <MetricsSection metrics={metrics} />
        
        <ProductsSection 
          products={products}
          currentPage={currentPage}
          totalPages={totalPages}
          productsLoading={productsLoading}
          onAddClick={handleOpenCreateModal}
          onDeleteClick={handleOpenDeleteModal}
          onPageChange={handlePageChange}
        />
      </div>

      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen}
        productName={productNameToDelete}
        isDeleting={isDeleting}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteProduct}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentProduct ? 'Editar Produto' : 'Adicionar Produto'}
      >
        <ProductForm
          initialData={currentProduct || undefined}
          onSubmit={handleSubmitForm}
          isLoading={isLoading}
        />
      </Modal>
    </Layout>
  );
};
