import { ApiResponse, LoginCredentials, PaginationParams, Product, ProductFormData, RegisterCredentials, User, type ProductsResponse } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://in-meta-back.vercel.app';
class ApiService {
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  protected async request<T, D = unknown>(
    endpoint: string,
    method: string = 'GET',
    data?: D
  ): Promise<ApiResponse<T>> {
    const url = `${API_URL}${endpoint}`;
    const options: RequestInit = {
      method,
      headers: this.getHeaders(),
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Servidor retornou uma resposta em formato inválido. Por favor, tente novamente.');
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Ocorreu um erro na requisição');
      }

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Ocorreu um erro desconhecido');
    }
  }
}

export class AuthService extends ApiService {
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; access_token: string }>> {
    const response = await this.request<{ user: User; access_token: string }>('/auth/login', 'POST', credentials);

    if (typeof window !== 'undefined' && response.data?.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }

    return response;
  }

  async register(credentials: RegisterCredentials): Promise<ApiResponse<User>> {
    return this.request<User>('/auth/register', 'POST', credentials);
  }

async getCurrentUser(): Promise<User> {
  {/*@ts-expect-error - This endpoint returns a User directly instead of ApiResponse<User>*/}
  return this.request<User>('/users/me');
}


  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
}

export class ProductService extends ApiService {
 async getProducts(params?: PaginationParams): Promise<ProductsResponse> {
    let queryString = '';

    if (params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
      queryString = `?${queryParams.toString()}`;
    }

    return this.request<ProductsResponse>(`/products${queryString}`);
  }


  async getProductById(id: string): Promise<ApiResponse<Product>> {
    return this.request<Product>(`/products/${id}`);
  }

  async createProduct(product: ProductFormData): Promise<ApiResponse<Product>> {
    return this.request<Product>('/products', 'POST', product);
  }

  async updateProduct(id: string, product: ProductFormData): Promise<ApiResponse<Product>> {
    return this.request<Product>(`/products/${id}`, 'PATCH', product);
  }

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/products/${id}`, 'DELETE');
  }
}

export class UserService extends ApiService {
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>('/users');
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}`);
  }

  async updateUser(id: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}`, 'PATCH', userData);
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/users/${id}`, 'DELETE');
  }
}

export const authService = new AuthService();
export const productService = new ProductService();
export const userService = new UserService();
