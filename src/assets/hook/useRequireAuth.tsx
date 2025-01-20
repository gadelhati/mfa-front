import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useProvider";

export const RequireAuth = ({ allowedRoles }: any) => {
    const { roles, accessToken } = useAuth();
    const location = useLocation();

    return (
        roles?.find((role: any) => allowedRoles?.includes(role))
            ? <Outlet />
            : accessToken
                ? <Navigate to="/notAllowed" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}