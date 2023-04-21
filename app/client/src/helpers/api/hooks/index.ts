import React from "react";
import { UserContext } from "@/helpers/context/users/UserManagement";

export const useAuth = () => React.useContext(UserContext)