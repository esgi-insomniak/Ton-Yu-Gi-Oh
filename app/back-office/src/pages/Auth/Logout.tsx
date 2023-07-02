import { useAuth } from "@/helpers/api/hooks";
import React from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
    const { logout } = useAuth();
    React.useEffect(() => {
        logout();
    }, [logout]);
    return <Navigate to="/login" />;
};

export default Logout;