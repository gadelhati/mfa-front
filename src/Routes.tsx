import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AuthProvider } from "./assets/hook/useProvider";
import { Login } from "./container/page/login";
import { Profile } from "./container/page/profile";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="*" element={<Login />}></Route>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}