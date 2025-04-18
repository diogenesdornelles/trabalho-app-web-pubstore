import { type PropsWithChildren } from "react";
import { AuthContext } from "./auth-context";
import { useStorageState } from "@/hooks/use-storage-state";
import useBasketStore from '@/context/use-basket-store';
import { user } from '@/fakedb/user';


export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('sessionPubStore');
    const updateUserId = useBasketStore((state) => state.updateUserId);
    return (
        <AuthContext.Provider
            value={{
                signIn: (username, pwd) => {
                    // Setar a lógica de login (ex.: autenticar com a API)
                    // Usando usuário como valor para indicar que o usuário está logado.
                    // Aqui deveria realizar uma chamada ao backend via post para retornar o token JWT, obtendo o idUser também
                    const fakeUser = user
    
                    if (fakeUser.pwd === pwd && fakeUser.username === username) {
                        updateUserId(fakeUser.id)
                        let date = new Date()
                        setSession(JSON.stringify({username: fakeUser.username, id: fakeUser.id, loggedAt: date.toLocaleTimeString()}));
                        return true
                    }
                    return false
                },
                signOut: () => {
                    setSession(null);
                    return false
                },
                session,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
}