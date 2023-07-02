import GameCard from "@/components/GameCard/GameCard";
import { CardICardSet } from "@/helpers/types/cards";
import { CardRarity } from "@/helpers/utils/enum/card";
import { useGameCard } from "@/helpers/context/cards/GameCardContext";
import React from "react";

const PreviewSets = ({ cardSets: cardSetsProps }: { cardSets: CardICardSet[] | undefined }) => {
    const { cardSets, setCardSets } = useGameCard()
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
                popScale: 1.75,
                canFlip: false,
                canActivate: true,
                canInteract: true,
            }
        })
        setCardSets(gameCardSets)
    }, [cardSetsProps])

    return (
        <div className="h-[calc(100vh-15rem)] flex flex-col  w-full overflow-scroll">
            {Object.values(CardRarity).map((rarity) => {
                const cardSetsByRarity = cardSets?.filter((cardSet) => cardSet.rarity.name === rarity)
                if (!cardSetsByRarity?.length) return null
                return (
                    <div key={rarity} className="flex flex-col space-y-2 my-1">
                        <span className="text-2xl font-bold">{rarity}</span>
                        <div className="grid grid-cols-10 gap-2">
                            {cardSetsByRarity?.map((cardSet, i) => (
                                <GameCard key={i} {...cardSet} />
                            ))}
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export { PreviewSets }