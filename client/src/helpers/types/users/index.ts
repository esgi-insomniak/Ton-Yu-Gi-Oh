export interface UserManagementContextProps {
    children: React.ReactNode;
}

export interface UserType {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    username: string;
}

export type UserContextType = Omit<UserType, 'createdAt' | 'updatedAt' | 'firstName' | 'lastName'> 