import { createContext, useState, useContext } from "react";
import { getToken, isValidToken } from "../../service/service.token";
import { Auth, initialAuth } from "../../component/auth";

const AuthContext = createContext<Auth>(getToken() as Auth);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [state, ] = useState<Auth>(isValidToken() ? getToken() : initialAuth)

    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>
    )
}