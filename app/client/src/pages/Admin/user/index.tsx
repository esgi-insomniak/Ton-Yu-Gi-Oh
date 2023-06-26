import { Table, TableColumn } from "@/components/Table";
import { useGetAllUsers } from "@/helpers/api/hooks/admin/user";
import { ROLES } from "@/helpers/utils/enum/roles";
import { userSchemaType } from "@/helpers/utils/schema/Admin";
import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { ReportCard } from "../Layout";
import { AiFillEdit } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";
interface TableUserProps extends Omit<userSchemaType, 'roles'> {
    roles: string;
    crud: JSX.Element;
}

const columns: TableColumn<TableUserProps>[] = [
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'roles', label: 'Role' },
    { key: 'coins', label: 'Coins' },
    { key: 'crud', label: 'Actions' },
];

const UserAdmin = () => {
    const getUsers = useGetAllUsers(10, 0)

    const formatedData = getUsers?.data?.data.map((user) => ({
        ...user,
        roles: user.roles.join(' ').toUpperCase(),
        crud: (
            <div className="flex space-x-2">
                <AiFillEdit className="w-6 h-6 text-gray-500 cursor-pointer" />
                <AiTwotoneDelete className="w-6 h-6 text-red-500 cursor-pointer" />
            </div>
        ),
    }));

    return (
        <div className="p-10 flex flex-col space-y-10">
            <div className="flex space-x-5">
                <ReportCard title="Nombre d'Utilisateurs" value={getUsers?.data?.data.length.toString()} icon={<BiUserCircle className="w-10 h-10 text-gray-500" />} />
                <ReportCard title="Nombre d'Admin" value={
                    getUsers?.data?.data.filter((user) => user.roles.includes(ROLES.ADMIN)).length.toString()
                } icon={<BiUserCircle className="w-10 h-10 text-gray-500" />} />
            </div>
            <Table<TableUserProps>
                data={formatedData || []}
                columns={columns}
            />
        </div>
    );

}

export default UserAdmin;