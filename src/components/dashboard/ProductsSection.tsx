import React from 'react';
import ProductsTable from './ProductsTable';
import type { Product } from '@/types';
import Pagination from './PaginationComponent';

interface ProductsSectionProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  productsLoading: boolean;
  onAddClick: () => void;
  onDeleteClick: (id: string, name: string) => void;
  onPageChange: (page: number) => void;
}

export default function ProductsSection({
  products,
  currentPage,
  totalPages,
  productsLoading,
  onAddClick,
  onDeleteClick,
  onPageChange
}: ProductsSectionProps): React.ReactElement {
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gerenciamento de Produtos</h2>
        <button
          onClick={onAddClick}
          className="flex items-center cursor-pointer bg-cyan-400 hover:bg-cyan-500 text-blue-950 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Adicionar Produto
        </button>
      </div>

      <div
        className="shadow-lg rounded-lg overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f2744 0%, #0a1c33 100%)' }}
      >
        <div className="px-6 py-4 border-b border-blue-800 flex justify-between items-center">
          <h2 className="text-lg font-medium text-white">Produtos Recentes</h2>
          <div className="text-sm text-gray-400">
            Mostrando página {currentPage} de {totalPages || 1}
          </div>
        </div>
        
        <ProductsTable 
          products={products}
          productsLoading={productsLoading}
          onDeleteClick={onDeleteClick}
        />

        {!productsLoading && products.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            productsLength={products.length}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};
