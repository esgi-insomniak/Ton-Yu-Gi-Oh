import Checkbox from "@/components/Checkbox";
import GameCard from "@/components/GameCard/GameCard";
import { SkeletonCards } from "@/components/Skeleton";
import { useGetAllCards } from "@/helpers/api/hooks/cards";
import { ApiResponseCardSet, CardIdentifier, CardSetType } from "@/helpers/types/cards";
import React from "react";

const Collection = () => {
    const [page, setPage] = React.useState<number>(1)
    const [searchValue, setSearchValue] = React.useState<string>("")
    const searchRegex = new RegExp(searchValue, 'i');
    const { data: allCards, isFetching } = useGetAllCards(page, 18)

    const [collapsed, setCollapsed] = React.useState({
        rarity: false,
        type: false,
        attribute: false,
        archetype: false
    })

    return (
        <div className="flex gap-5 w-full h-screen overflow-scroll p-5">
            <div className="h-full flex flex-col p-3 w-3/12 bg-white/20 rounded-md drop-shadow-md overflow-scroll">
                <div className="divider">Rechercher</div>
                <input
                    type="text"
                    placeholder="Rechercher une carte"
                    className="bg-transparent outline-none w-full text-white border border-white p-3 rounded-md"
                    onChange={(e) => setSearchValue(e.target.value)}
                />

                <div className="divider cursor-pointer select-none hover:font-bold" onClick={() => setCollapsed({ ...collapsed, rarity: !collapsed.rarity })}>
                    Rarity {collapsed.rarity ? '-' : '+'}
                </div>
                {
                    collapsed.rarity && (
                        <React.Fragment>
                            <Checkbox title="Commune" checked={false} />
                            <Checkbox title="Rare" checked={false} />
                            <Checkbox title="Super Rare" checked={false} />
                            <Checkbox title="Ultra Rare" checked={false} />

                        </React.Fragment>
                    )
                }

                <div className="divider cursor-pointer select-none hover:font-bold" onClick={() => setCollapsed({ ...collapsed, type: !collapsed.type })}>
                    Type {collapsed.type ? '-' : '+'}
                </div>
                {
                    collapsed.type && (
                        <React.Fragment>
                            <Checkbox title="Monstre" checked={false} />
                            <Checkbox title="Magie" checked={false} />
                            <Checkbox title="Piège" checked={false} />
                        </React.Fragment>
                    )
                }

                <div className="divider cursor-pointer select-none hover:font-bold" onClick={() => setCollapsed({ ...collapsed, attribute: !collapsed.attribute })}>
                    Attribut {collapsed.attribute ? '-' : '+'}
                </div>
                {
                    collapsed.attribute && (
                        <React.Fragment>
                            <Checkbox title="Lumière" checked={false} />
                            <Checkbox title="Ténèbres" checked={false} />
                            <Checkbox title="Eau" checked={false} />
                            <Checkbox title="Feu" checked={false} />
                            <Checkbox title="Vent" checked={false} />
                            <Checkbox title="Terre" checked={false} />
                            <Checkbox title="Divin" checked={false} />
                        </React.Fragment>
                    )
                }

                <div className="divider cursor-pointer select-none hover:font-bold" onClick={() => setCollapsed({ ...collapsed, archetype: !collapsed.archetype })}>
                    Archetype {collapsed.archetype ? '-' : '+'}
                </div>
                {
                    collapsed.archetype && (
                        <React.Fragment>
                            <Checkbox title="Dragon" checked={false} />
                            <Checkbox title="Magicien" checked={false} />
                            <Checkbox title="Guerrier" checked={false} />
                            <Checkbox title="Bête" checked={false} />
                            <Checkbox title="Bête-Guerrier" checked={false} />
                            <Checkbox title="Bête Ailée" checked={false} />
                            <Checkbox title="Démon" checked={false} />
                            <Checkbox title="Machine" checked={false} />
                        </React.Fragment>
                    )
                }
            </div>
            {isFetching ? (
                <div className="grid grid-flow-row-dense grid-cols-6 gap-3 w-full h-full">
                    {Array.from(Array(18).keys()).map((_, index) => (
                        <SkeletonCards key={index} />
                    ))}
                </div>
            ) : (
                <div className="h-full grid grid-flow-row-dense grid-cols-6 px-3 w-full gap-3">
                    {allCards?.data
                        ?.filter((item) => searchRegex.test(item.card.name))
                        .map((c) => (
                            <div className="relative hover:scale-105 rounded-sm cursor-pointer duration-150">
                                <img src={c.card.imageUrl} alt="" />
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}

export default Collection;