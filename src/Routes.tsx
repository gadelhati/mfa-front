import { Route, HashRouter, Routes } from "react-router-dom";
import { Login } from "./container/page/login";

export const AppRoutes = () => {
    return (
        <HashRouter>
            {/* <AuthProvider> */}
                <Routes>
                    <Route path="*" element={<Login />}></Route>
                    <Route path="/" element={<Login />}></Route>
                </Routes>
            {/* </AuthProvider> */}
        </HashRouter>
    )
}