import { useState, useCallback } from 'react';
import { productService } from '../lib/api';
import { PaginationParams, ProductFormData, ProductsState, Product, type ProductsResponse } from '../types';

const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  isLoading: false,
  error: null,
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
  itemsPerPage: 10,
};

export const useProducts = () => {
  const [state, setState] = useState<ProductsState>(initialState);

  const fetchProducts = useCallback(async (params: PaginationParams) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
  
    try {
      const response: ProductsResponse = await productService.getProducts(params);
  
      console.log('Products response:', response); 
  
      if (response && Array.isArray(response.products)) {
        setState({
          products: response.products,
          currentProduct: null,
          isLoading: false,
          error: null,
          totalItems: response.totalItems || 0,
          totalPages: response.totalPages || 1,
          currentPage: response.currentPage || params.page,
          itemsPerPage: response.itemsPerPage || params.limit,
        });
      } else {
        console.error('Estrutura de resposta inesperada: produtos não encontrados');
        setState(prev => ({
          ...prev,
          products: [],
          isLoading: false,
          error: 'Produtos não encontrados na resposta',
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro ao carregar produtos',
      }));
    }
  }, []);
  
  const fetchProductById = useCallback(async (id: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await productService.getProductById(id);
      
      let product: Product | null = null;
      
      if (response && !Array.isArray(response)) {
        if ('id' in response) {
          product = response as unknown as Product;
        } else if (response.data) {
          product = response.data;
        }
      }
      
      if (product) {
        setState((prev) => ({
          ...prev,
          currentProduct: product,
          isLoading: false,
          error: null,
        }));
        return product;
      } else {
        throw new Error('Produto não encontrado');
      }
    } catch (error) {
      console.error('Error in fetchProductById:', error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro ao carregar o produto',
      }));
      return null;
    }
  }, []);

  const createProduct = useCallback(async (productData: ProductFormData) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await productService.createProduct(productData);
      
      let product: Product | null = null;
      
      if (response && !Array.isArray(response)) {
        if ('id' in response) {
          product = response as unknown as Product;
        } else if (response.data) {
          product = response.data;
        }
      }
      
      if (product) {
        setState((prev) => ({
          ...prev,
          products: [product, ...prev.products],
          isLoading: false,
          error: null,
        }));
        return product;
      } else {
        throw new Error('Falha ao criar produto');
      }
    } catch (error) {
      console.error('Error in createProduct:', error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro ao criar produto',
      }));
      return null;
    }
  }, []);

  const updateProduct = useCallback(async (id: string, productData: ProductFormData) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await productService.updateProduct(id, productData);
      
      let product: Product | null = null;
      
      if (response && !Array.isArray(response)) {
        if ('id' in response) {
          product = response as unknown as Product;
        } else if (response.data) {
          product = response.data;
        }
      }
      
      if (product) {
        setState((prev) => ({
          ...prev,
          products: prev.products.map((p) => (p.id === id ? product! : p)),
          currentProduct: product,
          isLoading: false,
          error: null,
        }));
        return product;
      } else {
        throw new Error('Falha ao atualizar produto');
      }
    } catch (error) {
      console.error('Error in updateProduct:', error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro ao atualizar produto',
      }));
      return null;
    }
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await productService.deleteProduct(id);
      
      setState((prev) => ({
        ...prev,
        products: prev.products.filter((p) => p.id !== id),
        isLoading: false,
        error: null,
      }));
      return true;
    } catch (error) {
      console.error('Error in deleteProduct:', error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro ao excluir produto',
      }));
      return false;
    }
  }, []);

  const changePage = useCallback((page: number) => {
    fetchProducts({
      page,
      limit: state.itemsPerPage,
    });
  }, [fetchProducts, state.itemsPerPage]);

  return {
    ...state,
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    changePage,
  };
};

export default useProducts;
