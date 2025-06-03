import SessionProps from '@/domain/interfaces/Session.interface';
import { createContext } from 'react';

const AuthContext = createContext<{
  signIn: (cpf: string, password: string) => Promise<boolean>;
  signOut: () => void;
  setAuthSession: (session: SessionProps | null) => void;
  authSession?: SessionProps | null;
  isLoading: boolean;
  isLoggingIn: boolean;
  loginError: Error | null;
}>({
  signIn: async () => false,
  signOut: () => null,
  setAuthSession: () => null,
  authSession: null,
  isLoading: false,
  isLoggingIn: false,
  loginError: null,
});

export default AuthContext;
