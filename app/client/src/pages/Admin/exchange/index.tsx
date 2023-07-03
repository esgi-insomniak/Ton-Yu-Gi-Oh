import { Table, TableColumn } from "@/components/Table";
import { BsCashCoin } from "react-icons/bs";
import { ReportCard } from "../Layout";
import { useGetAllExchanges } from "@/helpers/api/hooks/admin/exchange";
import { ExchangeSchemaType } from "@/helpers/utils/schema/Admin";
import { GiCardExchange } from "react-icons/gi";
import React from "react";

interface ExchangeAdminProps extends Omit<ExchangeSchemaType,
    'isClosed' | 'ownerCardSetsProposed' | 'targetCardSetsProposed' | 'exchangeOwner' | 'exchangeTarget'
> {
    isClosed: string
    ownerCardSetsProposed: string
    targetCardSetsProposed: string
    exchangeOwner: string
    exchangeTarget: string
}

const columns: TableColumn<ExchangeAdminProps>[] = [
    { key: 'exchangeOwner', label: 'User 1' },
    { key: 'ownerCardSetsProposed', label: 'Cartes user 1' },
    { key: 'exchangeTarget', label: 'User 2' },
    { key: 'targetCardSetsProposed', label: 'Cartes user 2' },
    { key: 'isClosed', label: 'Status' },
]

const ExchangeAdmin = () => {
    const [page, setPage] = React.useState<number>(0)

    const { data: exchange } = useGetAllExchanges(10, page);

    const formatedData = exchange?.data.map((item) => {
        return {
            ...item,
            exchangeOwner: item.exchangeOwner.username,
            ownerCardSetsProposed: item.ownerCardSetsProposed.map((card) => card.cardSetId).join(' '),
            exchangeTarget: item.exchangeTarget.username,
            targetCardSetsProposed: item.targetCardSetsProposed.map((card) => card.cardSetId).join(' '),
            isClosed: item.isClosed ? 'Fermé' : 'Ouvert'
        }
    })

    return (
        <div className="p-10 flex flex-col space-y-10">
            <div className="flex space-x-5">
                <ReportCard title="Nombre d'échange" value={exchange?.data.length.toString() || '0'} icon={<GiCardExchange className="w-10 h-10 text-gray-500" />} />
            </div>
            <Table<ExchangeAdminProps>
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

export default ExchangeAdmin;