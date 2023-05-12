import Checkbox from "@/components/Checkbox";
import GameCard from "@/components/GameCard/GameCard";
import { SkeletonCards } from "@/components/Skeleton";
import { useGetCardSets } from "@/helpers/api/hooks/cards/card-set.hook";
import { useGetAllArchetypes } from "@/helpers/api/hooks/cards/archetype.hook";
import React from "react";
import { ICard, IGameCard } from "@/helpers/types/cards";
import GameCardContext from "@/helpers/context/cards/GameCardContext";
import { useGetAllAttributes } from "@/helpers/api/hooks/cards/attribute.hook";

const Collection = () => {
    const [page, setPage] = React.useState<number>(0)
    const [searchValue, setSearchValue] = React.useState<string>("")
    const { data: cardSetsResponse } = useGetCardSets(page, 18)
    // const { data: attributesResponse } = useGetAllAttributes()
    const { cardSets, setCardSets, sortCardSets } = React.useContext(GameCardContext)

    React.useEffect(() => {
        if (cardSetsResponse?.data === undefined || cardSetsResponse?.data.length === 0) return;
        const apiCardSets = cardSetsResponse.data.map((cardSet) => {
            return {
                ...cardSet,
                isActive: false,
                isHidden: false,
                isFocused: false,
                isLoaded: false,
                isDraggable: false,
                canPop: true,
                canFlip: false,
            } as IGameCard
        })
        setCardSets(apiCardSets)
    }, [cardSetsResponse])

    const [collapsed, setCollapsed] = React.useState({
        attribute: false,
        frameType: false,
        race: false,
        rarity: false,
        set: false,
        type: false,
    })

    interface IFilter {
        id: string;
        name: string;
        checked: boolean;
    }

    const filters: { [key: string]: IFilter[] }
        = React.useMemo(() => {
            return {
                attribute: [],
                frameType: [],
                race: [],
                rarity: [],
                set: [],
                type: [],
            }
        }, [])

    const handleCheckboxChange = React.useCallback((tabName: keyof typeof filters, name: string, checked: boolean) => {
        filters[tabName].map((item: { name: string; checked: boolean; }) => {
            if (item.name === name) {
                item.checked = !checked
            }
        })
    }, [filters])

    const handleUpdateFilters = React.useCallback(() => {
        const checkedFilters = Object.keys(filters).map((key) => {
            return filters[key as keyof typeof filters].filter((item) => item.checked).map((item) => item.name)
        })
    }, [filters])

    return (
        <div className="flex gap-5 w-full overflow-scroll p-5">
            <div className="h-full flex flex-col p-3 w-3/12 bg-white/20 rounded-md drop-shadow-md overflow-scroll scrollbar-none">
                <div className="divider">Rechercher</div>
                <input
                    type="text"
                    placeholder="Rechercher une carte"
                    className="bg-transparent outline-none w-full text-white border border-white p-3 rounded-md"
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <div className="divider cursor-pointer select-none hover:font-bold" onClick={() => setCollapsed({ ...collapsed, attribute: !collapsed.attribute })}>
                    Attributes {collapsed.attribute ? '-' : '+'}
                </div>
                {
                    collapsed.attribute && (
                        <React.Fragment>
                            {filters.attribute.map((attr, i) => (
                                <Checkbox key={i} title={attr.name} checked={attr.checked} hc={() => handleCheckboxChange('attribute', attr.name, attr.checked)} />
                            ))}
                        </React.Fragment>
                    )
                }
                <div className="divider cursor-pointer select-none hover:font-bold" onClick={() => setCollapsed({ ...collapsed, frameType: !collapsed.frameType })}>
                    Frame Types {collapsed.frameType ? '-' : '+'}
                </div>
                {
                    collapsed.frameType && (
                        <React.Fragment>
                            {filters.frameType.map((ft, i) => (
                                <Checkbox key={i} title={ft.name} checked={ft.checked} hc={() => handleCheckboxChange('frameType', ft.name, ft.checked)} />
                            ))}
                        </React.Fragment>
                    )
                }

                <div className="divider cursor-pointer select-none hover:font-bold" onClick={() => setCollapsed({ ...collapsed, rarity: !collapsed.rarity })}>
                    Rarity {collapsed.rarity ? '-' : '+'}
                </div>
                {
                    collapsed.rarity && (
                        <React.Fragment>
                            {filters.rarity.map((r, i) => (
                                <Checkbox key={i} title={r.name} checked={r.checked} hc={() => handleCheckboxChange('rarity', r.name, r.checked)} />
                            ))}
                        </React.Fragment>
                    )
                }

                <div className="divider cursor-pointer select-none hover:font-bold" onClick={() => setCollapsed({ ...collapsed, type: !collapsed.type })}>
                    Type {collapsed.type ? '-' : '+'}
                </div>
                {
                    collapsed.type && (
                        <React.Fragment>
                            {filters.type.map((type_, i) => (
                                <Checkbox key={i} title={type_.name} checked={type_.checked} hc={() => handleCheckboxChange('type', type_.name, type_.checked)} />
                            ))}
                        </React.Fragment>
                    )
                }

                <div className="divider">Pages</div>
                <div className="flex gap-2">
                    <div className="btn-group mx-auto">
                        <button
                            className="btn bg-white/20 text-white hover:bg-gray-700"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                        >
                            «
                        </button>
                        <button className="btn bg-white/20 text-white hover:bg-gray-700">{page}</button>
                        <button
                            className="btn bg-white/20 text-white hover:bg-gray-700"
                            onClick={() => setPage(page + 1)}
                        // get max page from api
                        >
                            »
                        </button>
                    </div>
                    <button
                        className="t-btn bg-white/20 hover:bg-gray-700"
                        onClick={handleUpdateFilters}
                    >
                        Filtrer
                    </button>
                </div>

            </div>
            <div className="grid grid-cols-6 px-3 w-full gap-5 scrollbar-none">
                {cardSets
                    .map((cardSet, i) => (
                        // <div className="relative hover:scale-105 rounded-sm cursor-pointer duration-150" key={i}>
                        //     <img src={cardSet.card.imageUrl} alt="" />
                        // </div>
                        <GameCard key={i} {
                            ...cardSet
                        } />
                    ))}
            </div>
        </div>
    )
}

export default Collection;