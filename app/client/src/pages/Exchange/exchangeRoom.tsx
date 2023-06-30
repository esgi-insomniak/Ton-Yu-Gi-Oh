import { ChatBubble } from "@/components/Chat"
import { Autocomplete } from "@/components/Input"
import { Modal } from "@/components/Modal"
import { useGetUserCardSets } from "@/helpers/api/hooks/cards/card-set.hook"
import useModal from "@/helpers/api/hooks/modal"
import { useMe } from "@/helpers/api/hooks/users"
import { useAlert } from "@/helpers/providers/alerts/AlertProvider"
import React from "react"

const ExchangeRoom = () => {
    const { me } = useMe()
    const { data: cardSetsResponse } = useGetUserCardSets(me?.id!, 0, 100, "", "", "", "")
    const { toggle, isShowing } = useModal()
    const alert = useAlert()

    const [selectedCard, setSelectedCard] = React.useState<string>("")
    const condition = cardSetsResponse?.data.find((item) => item.cardSet.card.name === selectedCard)

    return (
        <div className="w-full h-full flex p-2 gap-2">
            <div className="flex w-9/12 h-full flex-col gap-2">
                <div className="h-1/2 w-full bg-gray-200 rounded-md">
                </div>
                <div className="h-1/2 w-full bg-white flex border-2 border-green-500 shadow-inner shadow-green-400 rounded-md">
                    <div className="w-1/3 p-5">
                        <Autocomplete
                            options={cardSetsResponse?.data?.map((cardSet) => cardSet.cardSet.card.name)!}
                            setValue={setSelectedCard}
                        />
                    </div>
                    <div className="divider divider-horizontal" />
                    <div className={`w-full flex flex-col `}>
                        <div className="flex justify-center items-center h-full w-full">
                            {condition ? (
                                <img
                                    src={condition?.cardSet.card.imageUrl}
                                    alt={condition?.cardSet.card.name}
                                    className="w-52 h-80  shadow-2xl rounded-md"
                                />
                            ) : (
                                <img
                                    src="https://images.ygoprodeck.com/images/cards/back_high.jpg"
                                    alt="BackImage"
                                    className="w-52 h-80  shadow-2xl rounded-md"
                                />
                            )}
                        </div>
                        <div className="w-full h-16 flex justify-end items-end pr-2 py-2 gap-2">
                            <button className="btn btn-error btn-outline" onClick={toggle}>Annuler l'échange </button>
                            <button className="btn">Faire une proposition </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full w-3/12 p-5 rounded-md bg-gray-600 space-y-3 flex flex-col justify-between" >
                <b className="w-full flex justify-center">User</b>
                <div className="flex flex-col h-3/4 scrollbar-none overflow-scroll w-full space-y-3">
                    <ChatBubble
                        me={false}
                        message="That's never been done in the history of the Jedi. It's insulting!"
                        sendAt="12:45"
                        author="Anakin Skywalker"
                    />
                    <ChatBubble
                        me
                        message="I have the high ground!"
                        sendAt="12:45"
                        author="Obi-Wan Kenobi"
                    />
                </div>
                <div className="flex items-end gap-2 h-1/4">
                    <input type="text" placeholder="Pas chère pas chère ..." className="input w-full focus:outline-none" onKeyUp={
                        (e) => { if (e.key === "Enter") alert?.success(e.currentTarget.value) }
                    } />
                    <button className="btn glass text-white">Envoyer</button>
                </div>
            </div>
            <Modal
                title="Voulez vous annuler l'échange ?"
                isShowing={isShowing}
                toggle={toggle}
                text="Si vous quitez l'échange, vous ne pourrez plus revenir dessus."
                yesNo
                yesNoAction={[
                    { text: "Non", action: () => toggle(), type: 'no' },
                    { text: "Oui", action: () => toggle(), type: 'yes' }
                ]}
            />
        </div>
    )
}

export default ExchangeRoom
