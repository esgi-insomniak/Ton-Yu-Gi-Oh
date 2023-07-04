import React from "react";
import { useGetAllMyGroupedUserCardSets, useMe } from "@/helpers/api/hooks/users";
import { useGetUserDeckById, usePatchUserDeck } from "@/helpers/api/hooks/decks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "@/helpers/providers/alerts/AlertProvider";
import { BiCheckCircle } from "react-icons/bi";
import { MdArrowBack } from "react-icons/md";
import Loader from "@/components/Loader";
import { UserDeckCards } from "@/components/Decks/Deck";
import { groupedUserCardSetType, userCardSetType } from "@/helpers/utils/schema/User";
import { Pagination } from "@/components/Pagination";

const EditDecks = () => {
    const maxItemsPerPage = 24;
    const deckMaxSameCardSets = 3;
    const deckMinCardSets = 40;
    const deckMaxCardSets = 60;
    const { me } = useMe();
    const { deckId } = useParams<{ deckId: string }>()
    const [pageNumber, setPageNumber] = React.useState(0);
    const { data: groupedCardsResponse, isLoading } = useGetAllMyGroupedUserCardSets(maxItemsPerPage, pageNumber);
    const { data: currentUserDeck, isLoading: currentDeckLoading, isError: currentDeckLoadingError } = useGetUserDeckById(deckId || "");
    const navigate = useNavigate();
    const patchDeck = usePatchUserDeck();
    const alert = useAlert();

    const [deckName, setDeckName] = React.useState("");
    const [allUserCardSets, setAllUserCardSets] = React.useState<userCardSetType[]>([]);
    const [selectedCardSets, setSelectedCardSets] = React.useState<userCardSetType[]>([]);

    const handleCardClick = (cardSetId: string) => {
        // check the number of userCardSets in the selectedCards state
        // cannot add more than 3 userCardSets per deck
        if (selectedCardSets.length >= deckMaxCardSets) return;
        const count = selectedCardSets.filter((userCardSet: userCardSetType) => userCardSet.cardSet.id === cardSetId).length;
        if (count >= deckMaxSameCardSets) return;
        const firstUserCardSet = allUserCardSets.find((userCardSet: userCardSetType) => userCardSet.cardSet.id === cardSetId);
        if (!firstUserCardSet) return;
        setSelectedCardSets(prevSelectedCardSets => [...prevSelectedCardSets, firstUserCardSet]);
        setAllUserCardSets(prevUserCardSets => prevUserCardSets.filter((userCardSet: userCardSetType) => userCardSet.id !== firstUserCardSet.id));
    };

    const handleCardRemove = (cardSetId: string) => {
        // remove first userCardSet with the cardSetId from the selectedCards state
        // add it to the allUserCardSets state
        const firstUserCardSet = selectedCardSets.find((userCardSet: userCardSetType) => userCardSet.cardSet.id === cardSetId);
        if (!firstUserCardSet) return;
        setSelectedCardSets(prevSelectedCardSets => prevSelectedCardSets.filter((userCardSet: userCardSetType) => userCardSet.id !== firstUserCardSet.id));
        setAllUserCardSets(prevUserCardSets => [...prevUserCardSets, firstUserCardSet]);
    };

    const handleSubmitDeck = () => {
        if (!currentUserDeck?.data) return;
        if (selectedCardSets.length < deckMinCardSets || selectedCardSets.length > deckMaxCardSets) return;
        if (!deckName) return alert?.error('Veuillez renseigner un nom pour votre deck');
        const selectedCardSetsIds = selectedCardSets.map((selectedCardSet) => selectedCardSet.id)

        patchDeck.mutate({
            userDeckId: currentUserDeck.data.id,
            userCardSetIds: selectedCardSetsIds,
            name: deckName.replace(/[^a-z0-9]/gi, '')
        }, {
            onSuccess: () => {
                navigate(-1);
                alert?.success('Deck édité avec succès !');
            },
            onError: () => alert?.error('Erreur lors de la modification du deck')
        })
    }

    React.useEffect(() => {
        if (!currentDeckLoadingError) {
            if (!currentUserDeck?.data) return;
            if (currentUserDeck.data.userId === me?.id) return;
        };
        navigate('/decks');
    }, [currentDeckLoadingError, currentUserDeck])

    React.useEffect(() => {
        if (!currentUserDeck?.data) return;
        const userCardSets: userCardSetType[] = currentUserDeck.data.cardSets
        setSelectedCardSets(userCardSets);
        setDeckName(currentUserDeck.data.name);
    }, [currentUserDeck])

    React.useEffect(() => {
        // get all userCardSets in the response and add them to the state
        if (!groupedCardsResponse?.data) return;

        const fetchUserCardSets = groupedCardsResponse?.data?.reduce((acc: userCardSetType[], groupedCard: groupedUserCardSetType) => {
            // not adding userCardSets already in allUserCardSets or selectedCards
            const newCardSets = groupedCard.userCardSets.filter((userCardSet: userCardSetType) => !acc.find((accUserCardSet: userCardSetType) => accUserCardSet.id === userCardSet.id));
            return [...acc, ...newCardSets];
        }, []).filter((userCardSet: userCardSetType) => !allUserCardSets.find((accUserCardSet: userCardSetType) => accUserCardSet.id === userCardSet.id) && !selectedCardSets.find((accUserCardSet: userCardSetType) => accUserCardSet.id === userCardSet.id));

        setAllUserCardSets(prevUserCardSets => [...prevUserCardSets, ...fetchUserCardSets]);
    }, [groupedCardsResponse])

    React.useEffect(() => {
        const unloadCallback = (event: { preventDefault: () => void; returnValue: string; }) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };

        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);

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
                    <div className="w-full h-full grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-2 gap-2 px-2 overflow-scroll">
                        {isLoading ? <Loader /> : groupedCardsResponse?.data?.map((groupedCard) => (
                            <UserDeckCards
                                key={groupedCard.cardSetId}
                                count={allUserCardSets.filter((userCardSet: userCardSetType) => userCardSet.cardSet.id === groupedCard.cardSetId).length}
                                deactivate={selectedCardSets.filter((userCardSet: userCardSetType) => userCardSet.cardSet.id === groupedCard.cardSetId).length >= deckMaxSameCardSets || !allUserCardSets.find((userCardSet: userCardSetType) => userCardSet.cardSet.id === groupedCard.cardSetId)}
                                banned={groupedCard.userCardSets[0].cardSet.card.atk === null && groupedCard.userCardSets[0].cardSet.card.def === null}
                                imageUrl={groupedCard.userCardSets[0].cardSet.card.imageUrl}
                                addFunction={() => handleCardClick(groupedCard.cardSetId)}
                                cardId={groupedCard.cardSetId}
                            />
                        ))}
                    </div>
                    <Pagination page={pageNumber} setter={setPageNumber} arr={groupedCardsResponse?.data?.length!} maxItemsPerPage={maxItemsPerPage} />
                </div>
                <div className="w-3/12 h-full border p-2 rounded-md space-y-2 overflow-scroll">
                    <div className="flex gap-2 h-12">
                        <input className="w-full glass rounded-md focus:outline-none p-2 text-white" type="text" placeholder="Nom du deck" value={deckName} onChange={(e) => setDeckName(e.target.value)} />
                        <div className={`btn hover:btn-error group tooltip tooltip-up flex justify-center items-center`}
                            data-tip="Revenir en arrière">
                            <MdArrowBack className="text-red-500 group-hover:text-white" />
                        </div>
                        <div className={`btn ${selectedCardSets.length < deckMinCardSets || selectedCardSets.length > deckMaxCardSets ? 'hover:btn-error' : 'hover:btn-success'} group tooltip tooltip-left flex justify-center items-center`}
                            data-tip="Sauvegarder le deck" onClick={handleSubmitDeck}>
                            <BiCheckCircle className={`${selectedCardSets.length < deckMinCardSets || selectedCardSets.length > deckMaxCardSets ? 'text-red-500' : 'text-green-500'} group-hover:text-white`} />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <React.Fragment>
                            <span className={`${selectedCardSets.length < deckMinCardSets || selectedCardSets.length > deckMaxCardSets ? 'text-red-500' : 'text-green-500'}`}>
                                {selectedCardSets.length} / {deckMinCardSets} (min) - {deckMaxCardSets} (max)
                            </span>
                            {selectedCardSets.reduce((acc: userCardSetType[], userCardSet: userCardSetType) => {
                                if (!acc.find((accUserCardSet: userCardSetType) => accUserCardSet.cardSet.id === userCardSet.cardSet.id)) {
                                    return [...acc, userCardSet];
                                }
                                return acc;
                            }, []).map((userCardSet) => {
                                const cardCount = selectedCardSets.filter((selectedCardSet: userCardSetType) => selectedCardSet.cardSet.id === userCardSet.cardSet.id).length;
                                return (
                                    <div
                                        className="h-14 w-full p-2 bg-gray-300/20 rounded-md flex items-center justify-between shadow-inner shadow-white"
                                        key={userCardSet.cardSet.id}
                                        onClick={handleCardRemove.bind(null, userCardSet.cardSet.id)}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <img
                                                src={userCardSet.cardSet.card.imageUrl}
                                                alt=""
                                                className="w-7 h-10"
                                            />
                                            <span>
                                                {userCardSet.cardSet.card.name}
                                            </span>
                                        </div>
                                        <div className="indicator-item badge">
                                            {cardCount}
                                        </div>
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditDecks;
