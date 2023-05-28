import { CardICardSet, CardSet } from "@/helpers/types/cards";
import { CardRarity } from "@/helpers/utils/enum/card";
import React from "react";

const PreviewSets = ({ cardSets }: { cardSets: CardICardSet[] | undefined }) => {
    return (
        <div className="h-[calc(100vh-15rem)] flex flex-col  w-full overflow-scroll">
            {Object.values(CardRarity).map((rarity) => {
                const tamer = cardSets?.filter((cardSet) => cardSet.rarity.name === rarity)
                if (!tamer?.length) return null
                return (
                    <div key={rarity} className="flex flex-col space-y-2 my-1">
                        <span className="text-2xl font-bold">{rarity}</span>
                        <div className="grid grid-cols-10 gap-2">
                            {tamer?.map((cardSet) => (
                                <div key={cardSet.id}>
                                    <img src={cardSet.card.imageUrl} alt={cardSet.card.enName} className="h-auto w-auto" />
                                </div>
                            ))}
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export { PreviewSets }