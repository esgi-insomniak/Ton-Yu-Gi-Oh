import { ChatBubble } from "@/components/Chat"
import { Autocomplete } from "@/components/Input"
import { Modal } from "@/components/Modal"
import { useSocket } from "@/helpers/api/hooks"
import { useGetUserCardSets } from "@/helpers/api/hooks/cards/card-set.hook"
import { useGetExchangeById } from "@/helpers/api/hooks/exchange"
import useModal from "@/helpers/api/hooks/modal"
import { useMe } from "@/helpers/api/hooks/users"
import { useAlert } from "@/helpers/providers/alerts/AlertProvider"
import { ISocketEventType } from "@/helpers/types/socket"
import { exchangeType } from "@/helpers/utils/schema/exchange"
import React from "react"
import { useNavigate, useParams } from "react-router-dom"

const ExchangeRoom = () => {
    const { me } = useMe()
    const { roomId } = useParams<{ roomId: string }>()
    const { data: cardSetsResponse } = useGetUserCardSets(0, 100, "", "", "", "")
    const { data: exchangeResponse } = useGetExchangeById(roomId || "")
    const { toggle, isShowing } = useModal()
    const router = useNavigate()
    const alert = useAlert()

    const [exchange, setExchange] = React.useState<exchangeType>()
    const [userIsOwner, setUserIsOwner] = React.useState<boolean>(false);
    const [selectedCard, setSelectedCard] = React.useState<string>("")
    const { getIoClient } = useSocket();
    const condition = cardSetsResponse?.data.find((item) => item.cardSet.card.name === selectedCard)

    const cancelExchange = () => {
        getIoClient()?.emit('exchange__cancel', {
            id: roomId,
        })
    }

    const acceptExchange = () => {
        const alreadyAccepted = userIsOwner ? exchange?.ownerAccepted : exchange?.targetAccepted
        getIoClient()?.emit('exchange__accept', {
            id: roomId,
            accept: !alreadyAccepted
        })
    }

    const updateOwnerCardSets = () => {
        getIoClient()?.emit('exchange__update', {
            id: roomId,
            ownerCardSetsProposed: [condition?.id!]
        })
    }

    React.useEffect(() => {
        getIoClient()?.off('exchange__updated')
        getIoClient()?.on('exchange__updated', (event) => {
            if (event.type === ISocketEventType.UPDATE) {
                if (event.data.isClosed && (!event.data.ownerAccepted || !event.data.targetAccepted)) {
                    alert?.error('l\'échange a été annulé')
                    return router('/')
                }
                if (event.data.ownerAccepted && event.data.targetAccepted && event.data.isClosed) {
                    alert?.success('échange terminé')
                    return router('/')
                }
                return setExchange(event.data)
            }
            alert?.error(event.data.message)
        })
    }, [])

    React.useEffect(() => {
        if (exchangeResponse?.data) {
            setExchange(exchangeResponse?.data)
        }
    }, [exchangeResponse])

    React.useEffect(() => {
        if (exchange?.exchangeOwner.id === me?.id) {
            setUserIsOwner(true)
        }
    }, [exchange])

    return (
        <div className="w-full h-full p-2 flex justify-center items-center">
            <div className="flex h-full flex-col gap-2 p-5 ">
                {
                    userIsOwner ? (
                        <div className={`h-1/2 bg-white/50 flex border-2 shadow-inner rounded-md ${exchange?.targetAccepted && "shadow-green-400 border-green-500"}`}>
                            <div className="flex justify-center items-center h-full w-full">
                                {exchange?.targetCardSetsProposed.map((cardSet) => (
                                    <img
                                        key={cardSet.id}
                                        src={cardSet.cardSet.card.imageUrl}
                                        alt={cardSet.cardSet.card.name}
                                        className="w-52 h-80 shadow-2xl rounded-md"
                                    />
                                ))
                                }
                            </div>
                        </div>
                    ) : (
                        <div className={`h-1/2 bg-white/50 flex border-2 shadow-inner rounded-md ${exchange?.ownerAccepted && "shadow-green-400 border-green-500"}`}>
                            <div className="flex justify-center items-center h-full w-full">
                                {exchange?.ownerCardSetsProposed && exchange?.ownerCardSetsProposed.length > 0 ? exchange?.ownerCardSetsProposed.map((cardSet) => (
                                    <img
                                        key={cardSet.id}
                                        src={cardSet.cardSet.card.imageUrl}
                                        alt={cardSet.cardSet.card.name}
                                        className="w-52 h-80  shadow-2xl rounded-md"
                                    />
                                )) : (<img
                                    src="https://images.ygoprodeck.com/images/cards/back_high.jpg"
                                    alt="BackImage"
                                    className="w-52 h-80  shadow-2xl rounded-md"
                                />)}
                            </div>
                        </div>
                    )
                }
                {
                    userIsOwner ? (
                        <div className={`h-1/2 bg-white/50 flex border-2 shadow-inner rounded-md ${exchange?.ownerAccepted && "shadow-green-400 border-green-500"}`}>
                            <div className="p-5">
                                <Autocomplete
                                    options={cardSetsResponse?.data?.map((cardSet) => cardSet.cardSet.card.name)!}
                                    setValue={setSelectedCard}
                                />
                            </div>
                            <div className="divider divider-horizontal" />
                            <div className="w-full flex">
                                <div className="flex justify-center items-center h-full w-full">
                                    {condition ? (
                                        <img
                                            key={condition.id}
                                            src={condition?.cardSet.card.imageUrl}
                                            alt={condition?.cardSet.card.name}
                                            className="w-52 h-80  shadow-2xl rounded-md"
                                        />
                                    ) : exchange?.ownerCardSetsProposed && exchange?.ownerCardSetsProposed.length > 0 ? exchange?.ownerCardSetsProposed.map((cardSet) => (
                                        <img
                                            key={cardSet.id}
                                            src={cardSet.cardSet.card.imageUrl}
                                            alt={cardSet.cardSet.card.name}
                                            className="w-52 h-80  shadow-2xl rounded-md"
                                        />
                                    )) : (
                                        <img
                                            src="https://images.ygoprodeck.com/images/cards/back_high.jpg"
                                            alt="BackImage"
                                            className="w-52 h-80  shadow-2xl rounded-md"
                                        />
                                    )}
                                </div>
                                <div className="w-full lg:flex md:flex-col flex-col justify-end items-end gap-2 p-2 space-y-2">
                                    <button className="btn btn-error btn-outline w-full" onClick={toggle}>Annuler l'échange </button>
                                    <button className="btn w-full" disabled={!condition} onClick={updateOwnerCardSets}>Faire une proposition</button>
                                    <button className={`btn w-full ${exchange?.ownerAccepted ? 'btn-error' : null}`} disabled={!exchange?.ownerCardSetsProposed || exchange?.ownerCardSetsProposed.length === 0} onClick={acceptExchange}>
                                        {exchange?.ownerAccepted ? "Revenir sur son avis" : "Accepter l'échange"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={`h-1/2 w-full bg-white/50 flex border-2 shadow-inner rounded-md ${exchange?.targetAccepted && "shadow-green-400 border-green-500"}`}>
                            <div className="w-full flex flex-col">

                                <div className="flex justify-center items-center h-full w-full">
                                    {exchange?.targetCardSetsProposed.map((cardSet) => (
                                        <img
                                            key={cardSet.id}
                                            src={cardSet.cardSet.card.imageUrl}
                                            alt={cardSet.cardSet.card.name}
                                            className="w-52 h-80  shadow-2xl rounded-md"
                                        />
                                    ))
                                    }
                                </div>
                                <div className="w-full h-16 flex justify-end items-end pr-2 py-2 gap-2">
                                    <button className="btn btn-error btn-outline" onClick={toggle}>Annuler l'échange </button>
                                    <button className={`btn ${exchange?.targetAccepted ? 'btn-error' : null}`} disabled={!exchange?.ownerCardSetsProposed || exchange?.ownerCardSetsProposed.length === 0} onClick={acceptExchange}>
                                        {exchange?.targetAccepted ? "Revenir sur son avis" : "Accepter l'échange"}
                                    </button>
                                </div>
                            </div>
                        </div>

                    )
                }
            </div>
            <Modal
                title="Voulez vous annuler l'échange ?"
                isShowing={isShowing}
                toggle={toggle}
                text="Si vous quitez l'échange, vous ne pourrez plus revenir dessus."
                yesNo
                yesNoAction={[
                    { text: "Non", action: () => toggle(), type: 'no' },
                    { text: "Oui", action: () => { toggle(), cancelExchange() }, type: 'yes' }
                ]}
            />
        </div>
    )
}

export default ExchangeRoom
