// @ts-nocheck
import { api } from './client';

// ХАКАТОН-ХАК: если бэкенд еще не готов, поставь true, чтобы интерфейс работал
const USE_MOCKS = true; 

/**
 * КОНТРАКТ ДЛЯ БЭКЕНДЕРА:
 * 
 * 1. POST /auth/login
 * Body: { email, password }
 * Response: { token: "jwt_token_string", user: { id: "1", name: "Иван", email: "..." } }
 * 
 * 2. POST /auth/register
 * Body: { name, email, password }
 * Response: { token: "jwt_token_string", user: { id: "1", name: "Иван", email: "..." } }
 */

export const authApi = {
  login: async (credentials) => {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 600)); // имитация задержки сети
      return {
        token: 'mock-jwt-token-xyz',
        user: { id: 'mock-1', name: 'Тестовый Юзер', email: credentials.email },
      };
    }
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, 600));
      return {
        token: 'mock-jwt-token-xyz',
        user: { id: 'mock-1', name: userData.name, email: userData.email },
      };
    }
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};