import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../lib/api';
import { AuthState, LoginCredentials, RegisterCredentials } from '../types';



export const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth((prev) => ({
        ...prev,
        token,
        isLoading: true,
      }));
      loadUser();
    } else {
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, []);


  const loadUser = useCallback(async () => {
    try {
      // Agora a função getCurrentUser() já retorna o User direto
      const userFromApi = await authService.getCurrentUser();
      console.log('Resposta da API:', userFromApi);

      setAuth({
        user: userFromApi,
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      localStorage.removeItem('token');
      setAuth({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro ao carregar usuário',
      });
    }
  }, []);



  const login = useCallback(async (credentials: LoginCredentials) => {
    setAuth((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await authService.login(credentials);
      const { user, access_token } = response.data;

      if (user && access_token) {
        localStorage.setItem('token', access_token);
        setAuth({
          user,
          token: access_token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return true;
      } else {
        throw new Error('A resposta da API não contém os dados esperados (user ou access_token)');
      }
    } catch (error) {
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro ao fazer login',
      }));
      return false;
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    setAuth((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const registerResponse = await authService.register(credentials);
      const user = registerResponse.data;

      if (!user) {
        throw new Error('A resposta da API não contém os dados esperados');
      }
      
      const { email, password } = credentials;
      const loginSuccess = await login({ email, password });

      if (!loginSuccess) {
        throw new Error('Registro realizado, mas não foi possível fazer login automaticamente');
      }

      return true;
    } catch (error) {
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro ao criar conta',
      }));
      return false;
    }
  }, [login]);

  const logout = useCallback(() => {
    authService.logout();
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    router.push('/auth/login');
  }, [router]);

  const isAuthenticated = useCallback(() => {
    return auth.isAuthenticated;
  }, [auth.isAuthenticated]);

  return {
    ...auth,
    login,
    register,
    logout,
    isAuthenticated,
  };
};

export default useAuth;
