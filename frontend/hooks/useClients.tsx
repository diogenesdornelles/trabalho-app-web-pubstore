import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEndSession } from './useEndSession';
import { useStorageState } from './service/ls/useStorageState';

export default function useClients() {
  const [[isLoading, session], setSession] = useStorageState('sessionPubStore');
  const endSession = useEndSession();
  let token: string | undefined;

  if (session) ({ token } = JSON.parse(session) as { token?: string });

  const queryClient = new QueryClient();

  const restClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 10000,
  });

  restClient.interceptors.request.use(
    config => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  restClient.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        const { status, data } = error.response;

        if (data.statusCode === 401 || data.error === 'Unauthorized') {
          endSession();
        }

        console.error(`Erro ${status}:`, data.message || 'Erro desconhecido');
        return Promise.reject(data);
      }
    }
  );

  return { queryClient, restClient };
}
