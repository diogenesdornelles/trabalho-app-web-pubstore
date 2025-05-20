import SessionProps from "@/domain/interfaces/Session.interface";
import { createContext } from "react";

// cria um contexto que define quais valores e funções estarão disponíveis globalmente no seu app
const AuthContext = createContext<{
    signIn: (cpf: string, password: string) => Promise<boolean>; // São funções (callbacks) que serão chamadas para fazer login ou logout
    signOut: () => void;
    setAuthSession: (session: SessionProps | null) => void; // Corrige o tipo e o nome do parâmetro
    authSession?: SessionProps | null; // Valor que identifica a sessão atual do usuário. Pode ser um token ou qualquer string que represente que o usuário está autenticado. Se null, não está autenticado
    isLoading: boolean; // O estado (nesse caso, a sessão) ainda está sendo carregado
    isLoggingIn: boolean; // O estado (nesse caso, a sessão) ainda está sendo carregado
    loginError: Error | null,
}>({
    signIn: async () => false,
    signOut: () => null,
    setAuthSession: () => null,
    authSession: null,
    isLoading: false,
    isLoggingIn: false,
    loginError: null
});

export default AuthContext;