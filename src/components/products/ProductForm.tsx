import React, { useState } from 'react';
import Button from '../ui/Button';
import type { Product, ProductFormData } from '@/types';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductFormData) => Promise<void>;
  isLoading: boolean;
}

export default function ProductForm({ initialData, onSubmit, isLoading }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    category: initialData?.category || '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    let parsedValue: string | number = value;

    if (type === 'number') {
      const normalizedValue = value.replace(',', '.');
      parsedValue = normalizedValue === '' ? 0 : parseFloat(normalizedValue);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Nome é obrigatório';
    }

    if (!formData.description.trim()) {
      errors.description = 'Descrição é obrigatória';
    }

    if (formData.price <= 0) {
      errors.price = 'Preço deve ser maior que zero';
    }

    if (formData.stock < 0) {
      errors.stock = 'Estoque não pode ser negativo';
    }

    if (!formData.category.trim()) {
      errors.category = 'Categoria é obrigatória';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
  };

  const categories = [
    'Eletrônicos',
    'Roupas',
    'Acessórios',
    'Livros',
    'Casa e Jardim',
    'Esportes',
    'Outros',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-white">
            Nome do Produto
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome do produto"
            className={`w-full px-4 py-2 rounded-md bg-blue-900/30 border ${formErrors.name ? 'border-red-500' : 'border-blue-800'
              } text-white focus:outline-none focus:ring-2 focus:ring-cyan-400`}
          />
          {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-white">
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Descrição detalhada do produto"
            className={`w-full px-4 py-2 rounded-md bg-blue-900/30 border ${formErrors.description ? 'border-red-500' : 'border-blue-800'
              } text-white focus:outline-none focus:ring-2 focus:ring-cyan-400`}
          />
          {formErrors.description && <p className="text-sm text-red-500">{formErrors.description}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-medium text-white">
            Preço (R$)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            placeholder="0,00"
            className={`w-full px-4 py-2 rounded-md bg-blue-900/30 border ${formErrors.price ? 'border-red-500' : 'border-blue-800'
              } text-white focus:outline-none focus:ring-2 focus:ring-cyan-400`}
          />
          {formErrors.price && <p className="text-sm text-red-500">{formErrors.price}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="stock" className="block text-sm font-medium text-white">
            Estoque
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            step="1"
            placeholder="0"
            className={`w-full px-4 py-2 rounded-md bg-blue-900/30 border ${formErrors.stock ? 'border-red-500' : 'border-blue-800'
              } text-white focus:outline-none focus:ring-2 focus:ring-cyan-400`}
          />
          {formErrors.stock && <p className="text-sm text-red-500">{formErrors.stock}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="category" className="block text-sm font-medium text-white">
            Categoria
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md bg-blue-900/30 border ${formErrors.category ? 'border-red-500' : 'border-blue-800'
              } text-white focus:outline-none focus:ring-2 focus:ring-cyan-400`}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {formErrors.category && <p className="text-sm text-red-500">{formErrors.category}</p>}
        </div>
      </div>

      <div className="flex justify-end mt-6 pt-4 border-t border-blue-800">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="px-6 py-2"
        >
          {initialData ? 'Atualizar Produto' : 'Criar Produto'}
        </Button>
      </div>
    </form>
  );
}
