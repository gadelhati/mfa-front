import { createContext, useEffect, useState, useContext } from "react";
import { getToken, isValidToken } from "../../service/service.token";
import { Auth, initialAuth } from "../../component/auth";

export const AuthContext = createContext<Auth>({} as Auth);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [state, setState] = useState<Auth>(initialAuth)

    useEffect(() => {
        if (isValidToken()) setState(getToken())
    }, []);
    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>
    )
}