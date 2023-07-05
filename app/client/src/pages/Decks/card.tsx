import GameCard from "@/components/GameCard/GameCard";
import { Modal } from "@/components/Modal";
import { Pagination } from "@/components/Pagination";
import { useGetUserCardSets, useScrapCards } from "@/helpers/api/hooks/cards/card-set.hook";
import useModal from "@/helpers/api/hooks/modal";
import { useMe } from "@/helpers/api/hooks/users";
import { useGameCard } from "@/helpers/context/cards/GameCardContext";
import { useAlert } from "@/helpers/providers/alerts/AlertProvider";
import { CardIPrice, CardIUserCardSet, IGameCard } from "@/helpers/types/cards";
import React from "react";
import { Link } from "react-router-dom";

const CardCollection = () => {
    const { me, refetch: refetchUser } = useMe()
    const [page, setPage] = React.useState<number>(0)
    const [itemsPerPage, setItemsPerPage] = React.useState<number>(24)
    const { data: cardSetsResponse, refetch } = useGetUserCardSets(page, itemsPerPage, "", "", "", "")
    const { cardSets, setCardSets } = useGameCard()
    const [arrayOfCardDismantle, setArrayOfCardDismantle] = React.useState<string[]>([])
    const [coinsEarned, setCoinsEarned] = React.useState<number>(0)
    const alert = useAlert()
    const { isShowing, toggle } = useModal()
    const scrapCards = useScrapCards()

    const handleRequestScrapCardsModal = (ids: string[]) => {
        scrapCards.mutate(ids, {
            onSuccess: (res) => {
                setArrayOfCardDismantle([])
                alert?.success(`Cartes démantelez avec succès !, ${res.data?.coinsEarned} coins ont été ajouté à votre compte !`)
                refetch()
                refetchUser()
                toggle()
            },
            onError: (error) => alert?.error('Vous ne pouvez pas démantelez certaines cartes car elles appartiennent à un deck !')
        })
    }

    const handleSelectCard = (cardId: string) => {
        if (arrayOfCardDismantle.includes(cardId)) {
            setArrayOfCardDismantle(arrayOfCardDismantle.filter((id) => id !== cardId))
            return;
        } else setArrayOfCardDismantle([...arrayOfCardDismantle, cardId])
    };

    React.useEffect(() => {
        if (arrayOfCardDismantle.length <= 0) return;
        const cardsPrice = cardSets.filter((findCardSet) => arrayOfCardDismantle.find((cardDuplicate) => cardDuplicate === findCardSet.userCardSetId)
        ).map((cardSet) => {
            const prices: Partial<CardIPrice> = cardSet.card.price;
            delete prices.id;
            return prices;
        });
        const coinsEarned = Math.round(
            cardsPrice.reduce((acc, curr) => {
                const maxPrice = Math.max(...Object.values(curr as CardIPrice));
                return maxPrice !== 0 ? acc + maxPrice : acc + 1;
            }, 0),
        );
        setCoinsEarned(coinsEarned)
    }, [arrayOfCardDismantle])

    React.useEffect(() => {
        if (cardSetsResponse?.data === undefined) return;
        const apiCardSets = cardSetsResponse.data.map<IGameCard>((userCardSet) => {
            return {
                ...userCardSet.cardSet,
                userCardSetId: userCardSet.id,
                isActive: false,
                isHidden: false,
                isFocused: false,
                isLoaded: false,
                isDraggable: false,
                canPop: false,
                displayCardInfoOnPop: false,
                popScale: 1.75,
                canFlip: false,
                canActivate: false,
                canInteract: false,
            }
        })
        setCardSets(apiCardSets)
    }, [cardSetsResponse])

    return (
        <div className={`w-full h-full px-20 py-5 flex flex-col space-y-5`}>
            <div className="flex w-full justify-between">
                <div className="text-md breadcrumbs hidden lg:block">
                    <ul>
                        <li><Link to={'/decks'}>Crafting zone</Link></li>
                        <li><span>Mes cartes</span></li>
                    </ul>
                </div>
                <button className="btn" onClick={toggle} disabled={arrayOfCardDismantle.length <= 0}>Démanteler les cartes contres des coins</button>
            </div>
            <div className="grid xl:grid-cols-8 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 px-3 w-full gap-2 scrollbar-none container mx-auto h-auto overflow-y-auto">
                {cardSets.map((cardSet) => (
                    <div
                        className={`${arrayOfCardDismantle.includes(cardSet.userCardSetId as string) && "border-[3px] border-yellow-500 h-fit p-0.5 rounded-md"}`}
                        onClick={() => handleSelectCard(cardSet.userCardSetId as string)}
                        key={`${cardSet.userCardSetId}`}
                    >
                        <GameCard {...cardSet} />
                    </div>
                ))}
            </div>
            <Pagination page={page} setter={setPage} arr={cardSetsResponse?.data.length!} maxItemsPerPage={24} />
            <Modal
                isShowing={isShowing}
                toggle={toggle}
                title="Démanteler les cartes"
                text={`Êtes-vous sûr de vouloir démantelez les cartes sélectionnées en échange de ${coinsEarned} coins ?`}
                yesNo
                yesNoAction={[
                    { text: 'Non', action: () => toggle(), type: 'no' },
                    { text: 'Oui', action: () => handleRequestScrapCardsModal(arrayOfCardDismantle), type: 'yes' }
                ]}
            />
        </div>
    );
}

export default CardCollection;