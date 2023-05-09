import Checkbox from "@/components/Checkbox";
import GameCard from "@/components/GameCard/GameCard";
import { SkeletonCards } from "@/components/Skeleton";
import { useGetAllCards } from "@/helpers/api/hooks/cards";
import React from "react";

const Collection = () => {
    const [page, setPage] = React.useState<number>(1)
    const [searchValue, setSearchValue] = React.useState<string>("")
    const { data: allCards, isFetching } = useGetAllCards(page, 18)

    const [collapsed, setCollapsed] = React.useState({
        rarity: false,
        type: false,
        attribute: false,
        archetype: false
    })

    const filters = React.useMemo(() => {
        return {
            rarity: [
                { name: "Commune", checked: false },
                { name: "Rare", checked: false },
                { name: "Super Rare", checked: false },
                { name: "Ultra Rare", checked: false },
            ],
            type: [
                { name: "Monstre", checked: false },
                { name: "Magie", checked: false },
                { name: "Piège", checked: false },
            ],
            attribute: [
                { name: "Lumière", checked: false },
                { name: "Ténèbres", checked: false },
                { name: "Eau", checked: false },
                { name: "Feu", checked: false },
                { name: "Vent", checked: false },
            ],
            archetype: [
                { name: "Dragon", checked: false },
                { name: "Magicien", checked: false },
                { name: "Guerrier", checked: false },
                { name: "Bête", checked: false },
                { name: "Bête-Guerrier", checked: false },
                { name: "Bête Ailée", checked: false },
                { name: "Démon", checked: false },
            ]
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

        console.log(checkedFilters)
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

                <div className="divider cursor-pointer select-none hover:font-bold" onClick={() => setCollapsed({ ...collapsed, attribute: !collapsed.attribute })}>
                    Attribut {collapsed.attribute ? '-' : '+'}
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

                <div className="divider cursor-pointer select-none hover:font-bold" onClick={() => setCollapsed({ ...collapsed, archetype: !collapsed.archetype })}>
                    Archetype {collapsed.archetype ? '-' : '+'}
                </div>
                {
                    collapsed.archetype && (
                        <React.Fragment>
                            {filters.archetype.map((arch, i) => (
                                <Checkbox key={i} title={arch.name} checked={arch.checked} hc={() => handleCheckboxChange('archetype', arch.name, arch.checked)} />
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
            {isFetching ? (
                <div className="grid grid-flow-row-dense grid-cols-6 gap-3 w-full h-full">
                    {Array.from(Array(18).keys()).map((_, index) => (
                        <SkeletonCards key={index} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-6 px-3 w-full gap-5 scrollbar-none">
                    {allCards?.data
                        .map((c, i) => (
                            <div className="relative hover:scale-105 rounded-sm cursor-pointer duration-150" key={i}>
                                <img src={c.card.imageUrl} alt="" />
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}

export default Collection;