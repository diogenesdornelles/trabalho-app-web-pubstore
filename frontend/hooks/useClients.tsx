import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEndSession } from "./useEndSession";
import { useStorageState } from "./useStorageState";



export default function useClients() {
  const [[isLoading, session], setSession] = useStorageState('sessionPubStore');
  const endSession = useEndSession();
  let token: string | undefined;

  if (session) 
    ({ token } = JSON.parse(session) as { token?: string });

  const queryClient = new QueryClient();

  const restClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL, // URL base da API para mobile
    timeout: 10000, // Tempo limite de 10 segundos
  });

  // Interceptor para adicionar o token no cabeçalho
  restClient.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


  restClient.interceptors.response.use(
    (response) => response, // Retorna a resposta normalmente se não houver erro
    (error) => {
      if (error.response) {
        const { status, data } = error.response;

        if (data.statusCode === 401 || data.error === "Unauthorized") {
          endSession()
        }

        console.error(`Erro ${status}:`, data.message || "Erro desconhecido");
        return Promise.reject(data);
      }
    }
  );

  return { queryClient, restClient };
}

