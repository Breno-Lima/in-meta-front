export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  
  
  export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    createdAt: string;
    updatedAt: string;
  }
  export interface AuthResponse {
    data: {
      user: User;
      access_token: string;
    };
    success: boolean;
    message?: string;
  }
  
  export interface ProductsResponse {
    products: Product[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  }
  
  export interface ProductsState {
    products: Product[];
    currentProduct: Product | null;
    isLoading: boolean;
    error: string | null;
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  }
  
  export interface PaginationParams {
    page: number;
    limit: number;
    search?: string;
    category?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }
  
  
  export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
    products: Product[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
  }
  
  export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
  }
