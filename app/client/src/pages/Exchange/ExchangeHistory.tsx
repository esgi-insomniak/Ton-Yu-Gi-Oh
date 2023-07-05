import { useGetUserExchanges } from "@/helpers/api/hooks/admin/exchange"
import { useNavigate } from "react-router-dom"

const ExchangeHistory = () => {

    const { data: myExchange } = useGetUserExchanges(20, 0)
    const navigate = useNavigate()

    return (
        <div className="w-full h-full p-5 flex flex-col space-x-2  items-center">
            <h1 className="text-3xl font-bold my-2">Historique des échanges</h1>
            <div className="border w-full h-full rounded-md p-5 overflow-y-scroll scrollbar-none">
                {myExchange?.data?.map((exchange, i) => (
                    <div className={`h-20 w-full p-2 bg-gray-300/20 rounded-md flex items-center justify-between shadow-inner ${!exchange?.isClosed ? 'shadow-green-500' : 'shadow-red-500'}`} key={i}>
                        <div className="flex flex-col">
                            <span className="text-sm">Propriétaire de l'exchange</span>
                            <span>{exchange?.exchangeOwner.username}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm">Owner</span>
                            <span>{exchange?.exchangeTarget.username}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm">Carte du propriétaire de l'exchange</span>
                            <span>{exchange?.ownerCardSetsProposed[0]?.cardSetId || 'Aucune'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm">Carte demandé</span>
                            <span>{exchange?.targetCardSetsProposed[0]?.cardSetId || 'Aucune'}</span>
                        </div>
                        <button
                            className={`btn ${!exchange?.isClosed ? 'btn-success' : 'btn-error cursor-not-allowed'}`}
                            disabled={exchange?.isClosed}
                            onClick={() => navigate(`/exchange-room/${exchange?.id}`)}
                        >
                            {!exchange?.isClosed ? 'Rejoindre' : 'Fermé'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExchangeHistory
