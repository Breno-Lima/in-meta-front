import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  productName: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationModal({
  isOpen,
  productName,
  isDeleting,
  onCancel,
  onConfirm
}: DeleteConfirmationModalProps): React.ReactElement | null {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 fade-in">
      <div className="w-full max-w-md rounded-lg overflow-hidden shadow-xl" style={{ background: 'linear-gradient(135deg, #0f2744 0%, #0a1c33 100%)' }}>
        <div className="flex justify-between items-center p-4 border-b border-blue-800">
          <h2 className="text-lg font-medium text-white">Confirmar Exclusão</h2>
          <button
            className="text-gray-400 hover:text-white"
            onClick={onCancel}
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <p className="mb-6 text-gray-300">
            Tem certeza que deseja excluir o produto <span className="font-bold text-white">{productName}</span>? Esta ação não pode ser desfeita.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-blue-800/50 transition-colors duration-200"
              disabled={isDeleting}
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 flex items-center justify-center"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Excluindo...
                </>
              ) : (
                'Excluir'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

