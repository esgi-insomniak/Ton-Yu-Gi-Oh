import React from "react";
import { UserContext } from "../../context/users/UserManagement";

export const useAuth = () => React.useContext(UserContext)