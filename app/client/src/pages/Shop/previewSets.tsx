import GameCard from "@/components/GameCard/GameCard";
import { CardICardSet, IGameCard } from "@/helpers/types/cards";
import { CardRarity } from "@/helpers/utils/enum/card";
import { useGameCard } from "@/helpers/context/cards/GameCardContext";
import React from "react";
import { useMe } from "@/helpers/api/hooks/users";
import useModal from "@/helpers/api/hooks/modal";
import { Modal } from "@/components/Modal";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { useSocket } from "@/helpers/api/hooks";

const PreviewSets = ({ cardSets: cardSetsProps }: { cardSets: CardICardSet[] | undefined }) => {
    const { cardSets, setCardSets } = useGameCard()
    const { register, handleSubmit } = useForm<{ duration: number, currentPrice: number }>();
    const { me } = useMe();
    const { getIoClient } = useSocket();
    const { isShowing: isShowingAuction, toggle: toggleAuction } = useModal();
    const [currentGameCard, setCurrentGameCard] = React.useState<IGameCard>();

    const auctionSubmit = (formData: { duration: number, currentPrice: number }) => {
        getIoClient()?.emit('auction__create', { ...formData, cardSetId: currentGameCard?.id });
        toggleAuction();
    }

    React.useEffect(() => {
        if (!currentGameCard) return;
        toggleAuction();
    }, [currentGameCard])

    React.useEffect(() => {
        if (!cardSetsProps?.length) return;
        const gameCardSets = cardSetsProps.map((cardSet) => {
            return {
                ...cardSet,
                isActive: false,
                isHidden: false,
                isFocused: false,
                isLoaded: false,
                isDraggable: false,
                canPop: true,
                displayCardInfoOnPop: true,
                showExchangeOnPop: true,
                showAuctionOnPop: me?.roles && me?.roles.includes('admin') ? true : false,
                submitAuction: setCurrentGameCard,
                popScale: 1.75,
                canFlip: false,
                canActivate: true,
                canInteract: true,
            }
        })
        setCardSets(gameCardSets)
    }, [cardSetsProps])

    return (
        <div className="h-[calc(100vh-15rem)] flex flex-col w-full overflow-scroll">
            {Object.values(CardRarity).map((rarity) => {
                const cardSetsByRarity = cardSets?.filter((cardSet) => cardSet.rarity.name === rarity)
                if (!cardSetsByRarity?.length) return null
                return (
                    <div key={rarity} className="flex flex-col space-y-2 my-1">
                        <span className="text-2xl font-bold">{rarity}</span>
                        <div className="grid xl:grid-cols-10 lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-2">
                            {cardSetsByRarity?.map((cardSet, i) => (
                                <GameCard key={i} {...cardSet} />
                            ))}
                        </div>
                    </div>
                )
            })}
            <Modal
                isShowing={isShowingAuction}
                toggle={toggleAuction}
                title="Créer une enchère"
                content={
                    <form className="space-y-5 w-96" onSubmit={handleSubmit(auctionSubmit)}>
                        <div>Carte: {currentGameCard?.card.name}</div>
                        <Input label="Durée du timer" name="duration" type="number" defaultV={20} register={register} />
                        <Input label="Prix initial" name="currentPrice" type="number" defaultV={100} register={register} />
                        <div className="w-full flex justify-end">
                            <button className="btn" type="submit">Créer une enchère</button>
                        </div>
                    </form>
                }
            />
        </div>
    )
}

export { PreviewSets }