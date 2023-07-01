import { Table, TableColumn } from "@/components/Table";
import { BsCheckCircle } from "react-icons/bs";
import { ReportCard } from "../Layout";
import { AuthLogSchemaType } from "@/helpers/utils/schema/Admin";
import { useGetAuthLogs } from "@/helpers/api/hooks/admin/auth";
import { MdError } from "react-icons/md";

type TableAuthProps = Omit<AuthLogSchemaType, 'isSuccess' | 'user'> & {
    isSuccess: string;
    user?: string
}

const columns: TableColumn<TableAuthProps>[] = [
    { key: 'user', label: 'Username' },
    { key: 'ipAddress', label: 'IP' },
    { key: 'isSuccess', label: 'Status' },
    { key: 'createdAt', label: 'Date' },
]

const AuthAdmin = () => {

    const { data } = useGetAuthLogs()

    const hours = (time: string) => new Date(time).getHours();

    const minutes = (time: string) => new Date(time).getMinutes();

    const date = (time: string) => new Date(time).toLocaleDateString('fr-FR');

    const formatedData = data?.data?.map((auth) => ({
        ...auth,
        user: auth?.user?.username || 'Unknown',
        ipAdress: auth.ipAddress,
        isSuccess: auth.isSuccess ? 'Success' : 'Failed',
        createdAt: `${date(auth.createdAt)} à ${hours(auth.createdAt)}h${minutes(auth.createdAt)}`
    }));

    return (
        <div className="p-10 flex flex-col space-y-10">
            <div className="flex space-x-5">
                <ReportCard
                    title="Authentification success"
                    value={data?.data?.filter((auth) => auth.isSuccess).length.toString()}
                    icon={<BsCheckCircle className="w-10 h-10 text-gray-500" />}
                />
                <ReportCard
                    title="Authentification failed"
                    value={data?.data?.filter((auth) => !auth.isSuccess).length.toString()}
                    icon={<MdError className="w-10 h-10 text-gray-500" />}
                />
            </div>
            <Table<TableAuthProps>
                data={formatedData || []}
                columns={columns}
            />
        </div>
    )
}

export default AuthAdmin;