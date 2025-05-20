import SessionProps from "@/domain/interfaces/Session.interface";
import useBasketStore from '@/hooks/useBasketStore';
import { useCreateLogin } from "@/hooks/service/post/useCreateLogin";
import { useStorageState } from "@/hooks/service/localstorage_/useStorageState";
import { useCallback, useEffect, useState, type PropsWithChildren } from "react";
import AuthContext from "../context/AuthContext";


export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('sessionPubStore');
    const queryLoginMutation = useCreateLogin();
    const updateCustomerId = useBasketStore((state) => state.updateCustomerId);
    const [authSession, setAuthSession] = useState<SessionProps | null>(null);

    // load session form local storage
    useEffect(() => {
        // if there is a session saved in memory
        if (session) {
            try {
                const parsedSession = JSON.parse(session);
                const customer_id = parsedSession?.id;
                if (customer_id) {
                    // inject cust. id on basket store
                    updateCustomerId(customer_id);
                }
                const token = parsedSession?.token;
                if (token) {
                    // set the recovered session from ls to local session context
                    setAuthSession(parsedSession)
                }
            } catch (error) {
                console.error("Unable to parse session:", error);
            }
        }

    }, [isLoading, session, updateCustomerId, setAuthSession]);


    const signIn = useCallback(async (cpf: string, password: string): Promise<boolean> => {
        try {
            const loginData = await queryLoginMutation.mutateAsync({ cpf, password });
            if (loginData && loginData.access_token) {
                const date = new Date();
                const newSessionData = {
                    token: loginData.access_token,
                    cpf: loginData.customer.cpf,
                    name: loginData.customer.name,
                    email: loginData.customer.email,
                    address: loginData.customer.address,
                    id: loginData.customer.id,
                    loggedAt: date.toISOString()
                };
                updateCustomerId(loginData.customer.id);
                setSession(JSON.stringify(newSessionData))
                setAuthSession(newSessionData)
                return true;
            } else {
                setSession(null)
                setAuthSession(null)
                return false;
            }

        } catch (error: any) {
            setSession(null)
            setAuthSession(null)
            return false
        }
    }, [queryLoginMutation, setSession, updateCustomerId, setAuthSession]);

    const signOut = useCallback(() => {
        setSession(null)
        updateCustomerId(null)
        setAuthSession(null)
    }, [setSession, updateCustomerId]);

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                setAuthSession,
                authSession,
                isLoading,
                isLoggingIn: queryLoginMutation.isPending,
                loginError: queryLoginMutation.error,
            }}>
            {children}
        </AuthContext.Provider>
    );
}