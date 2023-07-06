import GameCard from "@/components/GameCard/GameCard";
import { useGetCardSets } from "@/helpers/api/hooks/cards/card-set.hook";
import { useGetAllArchetypes } from "@/helpers/api/hooks/cards/archetype.hook";
import React from "react";
import { IGameCard } from "@/helpers/types/cards";
import { useGameCard } from "@/helpers/context/cards/GameCardContext";
import { useGetAllAttributes, useGetAllRarities } from "@/helpers/api/hooks/cards/attribute.hook";
import { Input, Select } from "@/components/Input";
import { Pagination } from "@/components/Pagination";
import {getScreenSize} from "@/helpers/utils/constants";

interface FiltersProps {
    search: string;
    archetype: string;
    attributeId: string;
    rarity: string;
}

const Collection = () => {
    const [page, setPage] = React.useState<number>(0)
    const [filters, setFilters] = React.useState<FiltersProps>({
        attributeId: "",
        rarity: "",
        archetype: "",
        search: "",
    })

    const { data: cardSetsResponse, refetch } = useGetCardSets(page, 24, filters.attributeId, filters.rarity, filters.archetype, filters.search)
    const { cardSets, setCardSets } = useGameCard()
    const { data: archetypes } = useGetAllArchetypes()
    const { data: rarities } = useGetAllRarities()
    const { data: attributes } = useGetAllAttributes()

    React.useEffect(() => {
        if (cardSetsResponse?.data === undefined) return;
        const apiCardSets = cardSetsResponse.data.map<IGameCard>((cardSet) => {
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
        setCardSets(apiCardSets)
    }, [cardSetsResponse])

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const search = formData.get("searchBar")
        const archetype = formData.get("archetype")
        const attributeId = formData.get("attributeId")
        const rarity = formData.get("rarities")

        setFilters({
            search: search as string,
            archetype: archetype as string,
            attributeId: attributeId as string,
            rarity: rarity as string,
        })
        setPage(0)
        refetch()
    }

    const handleClear = () => {
        setFilters({
            search: "",
            archetype: "",
            attributeId: "",
            rarity: "",
        })
        setPage(0)
        refetch()
    }

    return (
        <div className="lg:flex-col md:flex-row flex-row flex gap-5 w-full p-5 h-full">
            <div>
                <form className="lg:flex-row md:flex-col flex-col flex w-full lg:space-x-2 md:space-x-0 space-x-0 lg:space-y-0 md:space-y-2 space-y-2 items-center justify-center" onSubmit={handleSearch}>
                    <input type="text" className="input input-bordered lg:w-auto md:w-full w-full" name="searchBar" placeholder="Rechercher" />
                    <Select name="archetype" options={archetypes?.data} placeholder="Choisir un Archetype" theme="dark" wfull={getScreenSize(window) !== "lg" && getScreenSize(window) !== "xl"} />
                    <Select name="rarities" options={rarities?.data} placeholder="Choisir une rareté" theme="dark" wfull={getScreenSize(window) !== "lg" && getScreenSize(window) !== "xl"} />
                    <Select name="attributeId" options={attributes?.data} placeholder="Choisir un attribut" theme="dark" wfull={getScreenSize(window) !== "lg" && getScreenSize(window) !== "xl"} />
                    <button className="btn lg:w-auto md:w-full w-full" type="submit">Rechercher</button>
                    <button className="btn lg:w-auto md:w-full w-full" onClick={handleClear}>Vider</button>
                </form>
                <Pagination page={page} setter={setPage} arr={cardSetsResponse?.data.length!} maxItemsPerPage={24} />
            </div>
            {cardSets.length === 0 ? (
                <div className="flex items-center justify-center w-full h-full">
                    <iframe allow="fullscreen" frameBorder="0" height="370" src="https://giphy.com/embed/Z8Py9bJGWHhCBtmjJk/video" width="480"></iframe>
                </div>
            ) : (
                <div className="grid xl:grid-cols-8 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 px-3 w-full gap-2 container scrollbar-none mx-auto h-auto overflow-y-auto">
                    {cardSets.map((cardSet, i) => (
                            <GameCard key={i} {...cardSet} />
                        )
                    )}
                </div>
            )}
        </div>
    )
}

export default Collection;