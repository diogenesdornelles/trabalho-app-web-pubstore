import { LoginProps } from '@/domain/interfaces/Login.interface';
import { useMutation } from '@tanstack/react-query';
import { useApi } from '../../useApi';

export function useCreateLogin() {
  const { login } = useApi();
  return useMutation({
    mutationFn: async ({ cpf, password }: LoginProps) => {
      try {
        const result = await login({ cpf, password });
        return result;
      } catch (error) {
        throw error;
      }
    },
  });
}
