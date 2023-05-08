import Checkbox from "@/components/Checkbox";
import GameCard from "@/components/GameCard/GameCard";
import { SkeletonCards } from "@/components/Skeleton";
import { useGetAllCards } from "@/helpers/api/hooks/cards";
import React from "react";

const Collection = () => {
    const [page, setPage] = React.useState<number>(1)
    const { data: allCards, isFetching } = useGetAllCards(page, 20)
    console.log(allCards)
    return (
        <div className="flex gap-5 w-full h-screen overflow-scroll p-5">
            <div className="h-full flex flex-col p-3 w-3/12 bg-white/20 rounded-md drop-shadow-md">
                <Checkbox title="Afficher les cartes manquantes" checked={false} handleChange={() => { }} />
                <Checkbox title="Afficher les cartes en double" checked={false} handleChange={() => { }} />
                <Checkbox title="Afficher les cartes en triple" checked={false} handleChange={() => { }} />
            </div>
            {isFetching ? (
                <div className="grid grid-flow-row-dense grid-cols-6 gap-3">
                    {Array.from(Array(18).keys()).map((_, index) => (
                        <SkeletonCards key={index} />
                    ))}
                </div>
            ) : (
                <div className="h-full grid grid-flow-row-dense grid-cols-6 p-3 w-full gap-3">
                    {allCards?.data.map((card) => (
                        //<GameCard key={card.id} {...card} />
                        <div>cards</div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Collection;