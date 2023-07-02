import React from "react";
import { useGetAllMyGroupedUserCardSets, useGetAllMyUserCardSets, } from "@/helpers/api/hooks/users";
import { usePostUserDeck } from "@/helpers/api/hooks/decks";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "@/helpers/providers/alerts/AlertProvider";
import { BiCheckCircle } from "react-icons/bi";
import { MdArrowBack } from "react-icons/md";
import Loader from "@/components/Loader";
import { UserDeckCards } from "@/components/Decks/Deck";
import { groupedUserCardSetType } from "@/helpers/utils/schema/User";
import { userCardSetsType } from "@/helpers/utils/schema/cards/card-set.schema";

const NewDecks = () => {
    const [pageNumber, setPageNumber] = React.useState(0);
    const { data: groupedCards, isLoading } = useGetAllMyGroupedUserCardSets(24, pageNumber);
    const postDeck = usePostUserDeck();
    const navigate = useNavigate();
    const alert = useAlert();

    const [deckName, setDeckName] = React.useState("");
    const [userCardSets, setUserCardSets] = React.useState<groupedUserCardSetType[]>([]);
    const [selectedCards, setSelectedCards] = React.useState<userCardSetsType[]>([]);

    const handleCardClick = (cardId: string) => {
        const foundedCardSet = userCardSets.find(cardSet => cardSet.cardSetId === cardId);
        const myCardSet = foundedCardSet?.userCardSets[0]
        // setSelectedCards(prevSelectedCards => [...prevSelectedCards, myCardSet])

    };

    React.useEffect(() => {
        console.log(selectedCards)
    }, [selectedCards])

    const handleCardRemove = (cardId: string, cardCount: number) => {
        // if (cardCount === 1) {
        //     setSelectedCardIds(prevSelectedCardIds => {
        //         const { [cardId]: removedCard, ...rest } = prevSelectedCardIds;
        //         return rest;
        //     });
        // } else {
        //     setSelectedCardIds(prevSelectedCardIds => ({
        //         ...prevSelectedCardIds,
        //         [cardId]: cardCount - 1
        //     }));
        // }
    };

    React.useEffect(() => {
        if (isLoading) return
        setUserCardSets(groupedCards?.data || []);
    }, [groupedCards, isLoading]);

    return (
        <div className="w-full flex flex-col h-full p-2">
            <div className="text-md breadcrumbs">
                <ul>
                    <li><Link to={'/decks'}>Crafting zone</Link></li>
                    <li><Link to={'/decks/create'}>Mes decks</Link></li>
                </ul>
            </div>
            <div className="flex gap-2 overflow-scroll h-full">
                <div className="w-9/12 h-full border rounded-md flex flex-col space-y-2 py-2">
                    <div className="w-full h-full grid grid-cols-8 gap-2 px-2 overflow-scroll">
                        {isLoading ? <Loader /> : userCardSets?.map((groupedCard) => (
                            <UserDeckCards
                                key={groupedCard.cardSetId}
                                count={groupedCard.userCardSets.length}
                                imageUrl={groupedCard.userCardSets[0].cardSet.card.imageUrl}
                                addFunction={handleCardClick}
                                cardId={groupedCard.cardSetId}
                            />
                        ))}
                    </div>
                    <div className="join w-full flex justify-center items-center">
                        <button className="join-item btn" onClick={() => setPageNumber(pageNumber - 1)}
                            disabled={pageNumber <= 0}>«</button>
                        <button className="join-item btn">{pageNumber + 1}</button>
                        <button className="join-item btn" onClick={() => setPageNumber(pageNumber + 1)}
                            disabled={groupedCards?.data.length! < 24}>»</button>
                    </div>
                </div>
                <div className="w-3/12 h-full border p-2 rounded-md space-y-2 overflow-scroll">
                    <div className="flex gap-2 h-12">
                        <input className="w-full glass rounded-md focus:outline-none p-2 text-white" type="text" placeholder="Nom du deck" onChange={(e) => setDeckName(e.target.value)} />
                        <div className={`btn hover:btn-error group tooltip tooltip-up flex justify-center items-center`}
                            data-tip="Revenir en arrière">
                            <MdArrowBack className="text-red-500 group-hover:text-white" />
                        </div>
                        <div className={`btn hover:btn-success group tooltip tooltip-left flex justify-center items-center`}
                            data-tip="Sauvegarder le deck">
                            <BiCheckCircle className="text-green-500 group-hover:text-white" />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <React.Fragment>

                        </React.Fragment>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewDecks;
