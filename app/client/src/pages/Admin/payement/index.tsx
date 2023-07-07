import { Table, TableColumn } from "@/components/Table";
import { ReportCard } from "../Layout";
import { useGetAllPayements } from "@/helpers/api/hooks/admin/payement";
import { BsCashCoin } from "react-icons/bs";
import React from "react";

interface TablePayementProps {
    id: string;
    userId: string;
    coinsAmount: number;
    stripeInfo: string
}

const columns: TableColumn<TablePayementProps>[] = [
    { key: 'id', label: 'ID' },
    { key: 'userId', label: 'User ID' },
    { key: 'coinsAmount', label: 'Coins Amount' },
    { key: 'stripeInfo', label: 'Status payement' },
]

const PayementAdmin = () => {
    const [page, setPage] = React.useState<number>(0);
    const { data: arr } = useGetAllPayements(10, page)

    const formatedData = arr?.data?.map((payement) => ({
        ...payement,
        stripeInfo: JSON.parse(arr?.data[0]?.stripeInfo as string).paymentStatus,
    }));

    return (
        <div className="p-10 flex flex-col space-y-10">
            <div className="flex space-x-5">
                <ReportCard title="Nombre de payement" value={arr?.data?.length?.toString() || '0'} icon={<BsCashCoin className="w-10 h-10 text-gray-500" />} />
            </div>
            <Table<TablePayementProps>
                data={formatedData || []}
                columns={columns}
                page={page}
                setter={setPage}
                arr={formatedData?.length || 0}
                maxItemsPerPage={10}
            />
        </div>
    )
}

export default PayementAdmin;