import { LoginProps } from "@/interfaces/Login.interface";
import { useMutation } from "@tanstack/react-query";
import { useApi } from "./useApi";


export function useLogin() {
  const { login } = useApi();
  return useMutation({
    mutationFn: async (data: LoginProps) => {
      try {
        const result = await login(data);
        return result;
      } catch (error) {
        throw error;
      }
    },
  });
}