import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AuthProvider } from "./assets/hook/useProvider";
import { Login } from "./container/page/login";
import { Profile } from "./container/page/profile";
import { isValidToken } from "./service/service.token";
import { NotAllowed } from "./container/page/notAllowed";
import { RequireAuth } from "./assets/hook/useRequireAuth";
import { GenericComponent } from "./container/template/GenericComponent";
import { initialRole } from "./component/role";
import '../src/container/template/routes.css'

export const ROLES = {
    'USER': '7c12004d-e843-4e00-be40-01845ad75834',
    'MODERATOR': '52c57a80-4e3b-4a41-a864-58d0cea25b14',
    'ADMIN': '8652ec73-0a53-433c-93be-420f1d90c681',
    'VIEWER': '55c16ae7-b918-4b31-b920-deb4af049075',
    'OPERATOR': '83366ed6-b0f2-4ef3-9658-e8bd9a8e3d39',
    'REVIEWER': 'b8b37d04-628d-4939-b200-2a5e48909cd9',
    'VERIFIER': '927c96c5-6884-433a-9479-836efbb1ed87',
}

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className='routes main'>
                <Routes>
                    <Route path="*" element={<Login />}></Route>
                    <Route path="/" element={<Login />}></Route>
                    {isValidToken() &&
                        <>
                            <Route path="/profile" element={<Profile />}></Route>
                            {/* <Route path="/profile2" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} element={<Profile2/>} />} /> */}
                            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                                <Route path="/role" element={<GenericComponent object={initialRole} url={'role'} />}></Route>
                                <Route path="/notAllowed    " element={<NotAllowed />}></Route>
                            </Route>
                        
                        </>
                    }
                </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    )
}