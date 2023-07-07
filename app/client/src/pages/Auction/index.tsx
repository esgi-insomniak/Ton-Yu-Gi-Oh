import GameCard from "@/components/GameCard/GameCard";
import { StatProps, Stats } from "@/components/Stats";
import { Timer } from "@/components/Timer";
import { useSocket } from "@/helpers/api/hooks";
import { useGetCardById } from "@/helpers/api/hooks/cards/card-set.hook";
import { useGetActiveAuction, useGetAuctionHistory } from "@/helpers/api/hooks/exchange";
import { useMe } from "@/helpers/api/hooks/users";
import { useGameCard } from "@/helpers/context/cards/GameCardContext";
import { useAlert } from "@/helpers/providers/alerts/AlertProvider";
import { IAuction, IAuctionHistory } from "@/helpers/types/auction";
import { IGameCard } from "@/helpers/types/cards";
import { ISocketEvent, ISocketEventType } from "@/helpers/types/socket";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";

const Auction = () => {
    const { data: auction, isError: isAuctionError, isLoading } = useGetActiveAuction()
    // const { data: bidHistory } = useGetActiveAuction()
    const { data: cardSet } = useGetCardById(auction?.data.cardSetId!)
    const { data: bids, isLoading: isLoadingBids } = useGetAuctionHistory(auction?.data.id!)

    const navigate = useNavigate()
    const { cardSets, setCardSets } = useGameCard()
    const { getIoClient } = useSocket()
    const { me, refetch: refetchUser } = useMe()
    const alert = useAlert()

    const [updatedAuction, setUpdatedAuction] = React.useState<IAuction>()
    const [bidList, setBidList] = React.useState<IAuctionHistory[]>([])
    const [disableBtn, setDisableBtn] = React.useState<boolean>(false)
    const [timer, setTimer] = React.useState<number>(0)

    const AuctionStats: StatProps[] = [
        { title: "Total des enchères", value: updatedAuction?.currentPrice!, desc: "ISM", icon: <img src="/InsomniakCoins.png" alt="" className="h-7 w-7" /> },
    ]

    const makeBid = () => {
        getIoClient()?.emit('auction__make_bid')
        setDisableBtn(true)
        setTimeout(() => {
            setDisableBtn(false)
        }, 2000);
    }

    React.useEffect(() => {
        getIoClient()?.off('auction__bids')
        getIoClient()?.on('auction__bids', (event: ISocketEvent) => {
            if (event.event === 'auction__bids' && event.type === ISocketEventType.CREATE) {
                refetchUser()
                setUpdatedAuction(event.data.auction)
                setBidList([...bidList, event.data].slice(-5))
            } else if (event.event === 'auction__interval' && event.type === ISocketEventType.UPDATE) {
                setTimer(event.data)
            } else if (event.event === 'auction__closed' && event.type === ISocketEventType.UPDATE) {
                setTimeout(() => {
                    alert?.success(`${event.data.winner?.username} a remporté l'enchère !`)
                    navigate('/')
                }, 2000);
            }
        });
    }, [bidList])

    React.useEffect(() => {
        if (auction?.data === undefined) return;
        setTimer(auction.data.duration)
        setUpdatedAuction(auction.data)
    }, [auction])

    React.useEffect(() => {
        if (bids?.data === undefined) return;
        setBidList(bids.data.reverse())
    }, [bids])

    React.useEffect(() => {
        if (isLoading) return;
        if (isLoadingBids) return;
        if (isAuctionError) navigate('/')
    }, [isLoading, isAuctionError, isLoadingBids])

    React.useEffect(() => {
        if (cardSet?.data === undefined) return;
        const auctionCardSet: IGameCard = {
            ...cardSet.data,
            isActive: false,
            isHidden: false,
            isFocused: false,
            isLoaded: false,
            isDraggable: false,
            canPop: false,
            displayCardInfoOnPop: false,
            popScale: 1.75,
            canFlip: false,
            canActivate: true,
            canInteract: true,
            showExchangeOnPop: false,
            showAuctionOnPop: false,
            submitAuction: () => { },
        }
        setCardSets([auctionCardSet])
    }, [cardSet])

    return (
        <div className="w-full h-full flex flex-col p-5">
            <div className="lg:flex-row lg:space-y-0 md:flex-col md:space-y-5 space-y-5 flex-col w-full flex items-center justify-between">
                <Stats data={AuctionStats} />
                <div className="h-fit w-fit flex flex-col justify-center">
                    <Timer
                        seconds={timer.toString()}
                    />
                </div>
            </div>
            <div className="w-full h-full flex">
                <div className="flex xl:w-3/4 md:w-full w-full justify-center p-5 items-center">
                    <div className="w-72">
                        {cardSets.map((cardSet, i) => (
                            <GameCard key={i} {...cardSet} />
                        ))}
                    </div>
                </div>
                <div className="flex xl:w-1/4 md:w-full w-full xl:p-5 md:p-0 p-0 flex-col space-y-5 justify-end xl:items-center">
                    <div className="flex flex-col h-fit space-y-3 overflow-y-auto">
                        {/** Laster Bider */}
                        {bidList.map((bid, i) =>
                            <div key={i} className="bg-white/30 rounded-lg shadow-xl p-5 flex space-x-2 items-center justify-between">
                                <div className="flex flex-col -space-y-1">
                                    <p className="text-green-500 xl:block">{bid.user.username}</p>
                                    <p className="text-white italic text-xs">{moment(bid.createdAt).format('HH:mm:ss')}</p>
                                </div>
                                <div className="space-x-2 flex">
                                    <p className="text-yellow-600">{bid.price}</p>
                                    <p>ISM</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <p>20 coins par click !</p>
                    <button className={`btn ${disableBtn ? 'btn-error' : 'btn-success'}`} onClick={makeBid} disabled={disableBtn || me?.coins! < parseInt(updatedAuction?.currentPrice.toString()!) + 120}>
                        enchérir de  <span className="text-yellow-600 mx-1 font-bold">{parseInt(updatedAuction?.currentPrice.toString()!) + 120}</span> ISM
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Auction;