import React from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types';

interface ProductsTableProps {
  products: Product[];
  productsLoading: boolean;
  onDeleteClick: (id: string, name: string) => void;
}

export default function ProductsTable({ products, productsLoading, onDeleteClick }: ProductsTableProps): React.ReactElement {
  const router = useRouter();

  // Table view for larger screens
  const TableView = () => (
    <div className="hidden md:block overflow-x-auto">
      <table className="min-w-full divide-y divide-blue-800">
        <thead className="bg-blue-900/30">
          <tr>
            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Produto</th>
            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Categoria</th>
            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Preço</th>
            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Estoque</th>
            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-blue-800">
          {productsLoading ? (
            <tr>
              <td colSpan={6} className="px-4 sm:px-6 py-4 text-center text-sm text-gray-400">
                Carregando produtos...
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 sm:px-6 py-4 text-center text-sm text-gray-400">
                Nenhum produto encontrado.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className="hover:bg-blue-800/30 transition-colors duration-150">
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 mr-3">
                      <div className="h-10 w-10 rounded-full bg-blue-800/50 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{product.name}</div>
                      <div className="text-sm text-gray-400 truncate max-w-xs">
                        {product.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-800/50 text-gray-300">
                    {product.category}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-400">
                  R$ {Math.min(product.price, 999999).toLocaleString('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.stock}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${product.stock > 10
                    ? 'bg-cyan-400/20 text-cyan-400'
                    : product.stock > 0
                      ? 'bg-yellow-400/20 text-yellow-400'
                      : 'bg-red-400/20 text-red-400'
                    }`}>
                    {product.stock > 10
                      ? 'Em estoque'
                      : product.stock > 0
                        ? 'Baixo estoque'
                        : 'Sem estoque'}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => router.push(`/products/${product.id}`)}
                      className="bg-cyan-500 cursor-pointer hover:bg-cyan-600 text-blue-950 py-1 px-3 rounded text-xs transition-all duration-200 hover:scale-105"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteClick(product.id, product.name)}
                      className="bg-red-500 cursor-pointer hover:bg-red-600 text-white py-1 px-3 rounded text-xs transition-all duration-200 hover:scale-105"
                    >
                      Del
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  // Card view for mobile screens
  const CardView = () => (
    <div className="md:hidden space-y-4">
      {productsLoading ? (
        <div className="p-4 text-center text-sm text-gray-400">
          Carregando produtos...
        </div>
      ) : products.length === 0 ? (
        <div className="p-4 text-center text-sm text-gray-400">
          Nenhum produto encontrado.
        </div>
      ) : (
        products.map((product) => (
          <div 
            key={product.id} 
            className="p-4 rounded-lg bg-blue-900/20 border border-blue-800"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-800/50 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{product.name}</div>
                  <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-blue-800/50 text-gray-300">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="text-sm font-medium text-cyan-400">
                R$ {Math.min(product.price, 999999).toLocaleString('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
              </div>
            </div>
            
            <div className="text-sm text-gray-400 mb-3">
              {product.description}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="text-sm text-gray-300">
                  Estoque: {product.stock}
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${product.stock > 10
                  ? 'bg-cyan-400/20 text-cyan-400'
                  : product.stock > 0
                    ? 'bg-yellow-400/20 text-yellow-400'
                    : 'bg-red-400/20 text-red-400'
                  }`}>
                  {product.stock > 10
                    ? 'Em estoque'
                    : product.stock > 0
                      ? 'Baixo estoque'
                      : 'Sem estoque'}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => router.push(`/products/${product.id}`)}
                  className="bg-cyan-500 cursor-pointer hover:bg-cyan-600 text-blue-950 py-1 px-3 rounded text-xs transition-all duration-200 hover:scale-105"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteClick(product.id, product.name)}
                  className="bg-red-500 cursor-pointer hover:bg-red-600 text-white py-1 px-3 rounded text-xs transition-all duration-200 hover:scale-105"
                >
                  Del
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <>
      <TableView />
      <CardView />
    </>
  );
};
