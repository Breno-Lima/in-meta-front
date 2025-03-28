import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  productsLength: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, productsLength, onPageChange }: PaginationProps): React.ReactElement {
  return (
    <div className="px-6 py-4 border-t border-blue-800 flex justify-between items-center">
      <div className="flex space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`px-3 py-1 rounded text-sm ${currentPage <= 1
            ? 'bg-blue-900/30 text-gray-500 cursor-not-allowed'
            : 'bg-blue-800/50 text-white hover:bg-blue-700/50 cursor-pointer'
            }`}
        >
          Anterior
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum;

            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === pageNum
                  ? 'bg-cyan-400 text-blue-950 font-bold'
                  : 'bg-blue-800/50 text-white hover:bg-blue-700/50'
                  }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={productsLength === 0}
          className={`px-3 py-1 rounded text-sm ${productsLength === 0
            ? 'bg-blue-900/30 text-gray-500 cursor-not-allowed'
            : 'bg-blue-800/50 text-white hover:bg-blue-700/50 cursor-pointer'
            }`}
        >
          Próxima
        </button>
      </div>

      <div className="text-sm text-gray-400">
        Página {currentPage} de {totalPages || 1}
      </div>
    </div>
  );
};
