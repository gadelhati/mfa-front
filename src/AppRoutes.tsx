import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AuthContext, AuthProvider } from "./assets/hook/useProvider";
import { Login } from "./container/page/login";
import { Profile } from "./container/page/profile";
import { useContext } from "react";
import { Page } from "./container/page/page";

export const AppRoutes = () => {
    const { accessToken } = useContext(AuthContext)
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="*" element={<Login />}></Route>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/profile" element={<Profile ui={accessToken} />}></Route>
                    <Route path="/page" element={<Page ui={accessToken} />}></Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}