import { Table, TableColumn } from "@/components/Table";
import { useGetAllUsers, usePatchUser } from "@/helpers/api/hooks/admin/user";
import { ROLES } from "@/helpers/utils/enum/roles";
import { userSchema, userSchemaType } from "@/helpers/utils/schema/Admin";
import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { ReportCard } from "../Layout";
import { AiFillEdit } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";
import { Modal } from "@/components/Modal";
import useModal from "@/helpers/api/hooks/modal";
import { Input, Select } from "@/components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAlert } from "@/helpers/providers/alerts/AlertProvider";
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
    const { data, refetch } = useGetAllUsers(10, 0)
    const patchUser = usePatchUser()
    const alert = useAlert()
    const { isShowing, toggle } = useModal()
    const { isShowing: deleteShowing, toggle: deleteToggle } = useModal()

    const { register, reset, handleSubmit, formState: { errors } } = useForm<userSchemaType>({
        resolver: zodResolver(userSchema)
    })

    const nbUser = data?.data && data?.data?.length - data?.data.filter((user) => user.roles.includes(ROLES.ADMIN)).length

    const [editUser, setEditUser] = React.useState<userSchemaType>()
    const [deleteUser, setDeleteUser] = React.useState<{ userId: string, username: string }>({
        userId: '',
        username: ''
    })

    const formatedData = data?.data.map((user) => ({
        ...user,
        roles: user.roles.join(' ').toUpperCase(),
        crud: (
            <div className="flex space-x-2">
                <AiFillEdit className="w-6 h-6 text-gray-500 cursor-pointer" onClick={() => handleEditModal(user)} />
                <AiTwotoneDelete className="w-6 h-6 text-red-500 cursor-pointer" onClick={() => handleDelete(user.id, user.username)} />
            </div>
        ),
    }));

    const onSubmit = (data: userSchemaType) => {
        patchUser.mutate({
            ...data
        }, {
            onSuccess: (res) => {
                alert?.success(`L'utilisateur ${res.data.username} a bien été modifié`)
                toggle()
                refetch()
            },
            onError: () => alert?.error("Une erreur est survenue")

        })
    }

    const handleEditModal = (user: userSchemaType) => {
        toggle()
        reset(user)
        setEditUser(user)
    }

    const handleDelete = (userId: string, username: string) => {
        deleteToggle()
        reset()
        setDeleteUser({ userId, username })
    }

    return (
        <div className="p-10 flex flex-col space-y-10">
            <div className="flex space-x-5">
                <ReportCard title="Nombre d'Utilisateurs" value={nbUser?.toString()} icon={<BiUserCircle className="w-10 h-10 text-gray-500" />} />
                <ReportCard title="Nombre d'Admin" value={
                    data?.data.filter((user) => user.roles.includes(ROLES.ADMIN)).length.toString()
                } icon={<BiUserCircle className="w-10 h-10 text-gray-500" />} />
            </div>
            <Table<TableUserProps>
                data={formatedData || []}
                columns={columns}
            />
            <Modal
                isShowing={isShowing}
                toggle={toggle}
                title={`Modifier l'utilisateur ${editUser?.username}`}
                content={
                    <form className="space-y-3 w-96" onSubmit={handleSubmit(onSubmit)}>
                        <Input label="Username" defaultV={editUser?.username} name="username" register={register} error={errors.username?.message} />
                        <Input label="Email" defaultV={editUser?.email} name="email" register={register} error={errors.email?.message} />
                        <Input label="Coins" defaultV={editUser?.coins} name="coins" register={register} type="number" error={errors.coins?.message} />
                        {Object.keys(ROLES).map((role) => (
                            <div className="flex items-center w-full" key={role}>
                                <input type="checkbox" className="checkbox bg-black" {...register('roles')} defaultChecked={editUser?.roles.map((r) => r.toUpperCase()).includes(role.toUpperCase())} value={role.toLocaleLowerCase()} />
                                <label htmlFor="roles" className="ml-2">{role}</label>
                            </div>
                        ))}
                        <div className="flex justify-end w-full">
                            <button type="submit" className="btn">Modifier</button>
                        </div>
                    </form>
                }
            />
            <Modal
                isShowing={deleteShowing}
                toggle={deleteToggle}
                title={`Supprimer l'utilisateur ${deleteUser?.username}`}
                yesNo
                text="Êtes-vous sûr de vouloir supprimer cet utilisateur ? Toutes les cartes ainsi que les decks de cet utilisateur seront supprimés."
                yesNoAction={[
                    { text: 'Annuler', action: deleteToggle, type: 'no' },
                    { text: 'Supprimer', action: () => console.log('oui'), type: 'yes' },
                ]}
            />
        </div>
    );

}

export default UserAdmin;