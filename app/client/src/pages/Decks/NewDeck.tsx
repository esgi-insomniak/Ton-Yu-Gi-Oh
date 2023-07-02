import React from "react";
import { useGetAllMyGroupedUserCardSets } from "@/helpers/api/hooks/users";
import { usePostUserDeck } from "@/helpers/api/hooks/decks";
import { Link } from "react-router-dom";
import { useAlert } from "@/helpers/providers/alerts/AlertProvider";
import { BiCheckCircle } from "react-icons/bi";
import { MdArrowBack } from "react-icons/md";
import Loader from "@/components/Loader";
import { UserDeckCards } from "@/components/Decks/Deck";
import { groupedUserCardSetType, userCardSetType } from "@/helpers/utils/schema/User";

const NewDecks = () => {
    const [pageNumber, setPageNumber] = React.useState(0);
    const { data: groupedCards, isLoading } = useGetAllMyGroupedUserCardSets(24, pageNumber);
    const postDeck = usePostUserDeck();
    const alert = useAlert();

    const [deckName, setDeckName] = React.useState("");
    const [userCardSets, setUserCardSets] = React.useState<groupedUserCardSetType[]>([]);
    const [selectedCards, setSelectedCards] = React.useState<userCardSetType[]>([]);

    const handleCardClick = (tamerCardSet: userCardSetType[]) => {
        setSelectedCards(prevSelectedCardIds => [...prevSelectedCardIds, tamerCardSet[0]]);
    };

    const handleCardRemove = (cardId: string, cardCount: number) => {
        // if (cardCount === 1) {
        //     setSelectedCards(prevSelectedCardIds => {
        //         const { [cardId]: removedCard, ...rest } = prevSelectedCardIds;
        //         return rest;
        //     });
        // } else {
        //     setSelectedCards(prevSelectedCardIds => ({
        //         ...prevSelectedCardIds,
        //         [cardId]: cardCount - 1
        //     }));
        // }
    };

    React.useEffect(() => {
        console.log(selectedCards)
    }, [selectedCards])

    React.useEffect(() => {
        const unloadCallback = (event: { preventDefault: () => void; returnValue: string; }) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };

        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);

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
                                addFunction={() => handleCardClick(groupedCard.userCardSets)}
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
                            <span className={`${Object.keys(selectedCards).length < 40 || selectedCards.length > 60 ? 'text-red-500' : 'text-green-500'}`}>
                                {Object.keys(selectedCards).length} / 40 (min) - 60 (max)
                            </span>
                            {/* {Object.keys(selectedCards).map((cardId) => {
                                const cardCount = selectedCards[cardId];
                                return (
                                    <div
                                        className="h-14 w-full p-2 bg-gray-300/20 rounded-md flex items-center justify-between shadow-inner shadow-white"
                                        key={cardId}
                                        onClick={handleCardRemove.bind(null, cardId, cardCount)}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <img
                                                src={``}
                                                alt=""
                                                className="w-7 h-10"
                                            />
                                            <span>
                                                { }
                                            </span>
                                        </div>
                                        <div className="indicator-item badge">
                                            {cardCount}
                                        </div>
                                    </div>
                                );
                            })} */}
                        </React.Fragment>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewDecks;
