import React from "react";
import {
    useGetAllMyUserCardSets,
    useMe,
} from "@/helpers/api/hooks/users";
import { usePostUserDeck } from "@/helpers/api/hooks/decks";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "@/helpers/providers/alerts/AlertProvider";
import { BiCheckCircle } from "react-icons/bi";
import { MdArrowBack } from "react-icons/md";
import { Select } from "@/components/Input";
import { useGetAllRarities, useGetAllAttributes } from "@/helpers/api/hooks/cards/attribute.hook";
import Loader from "@/components/Loader";

const NewDecks = () => {
    const { me: user } = useMe();
    const { data, isLoading } = useGetAllMyUserCardSets(24, 0);
    const { data: rarities } = useGetAllRarities()
    const { data: attributes } = useGetAllAttributes()
    const postDeck = usePostUserDeck();
    const navigate = useNavigate();
    const alert = useAlert();

    const [deckName, setDeckName] = React.useState("");
    const [selectedCardIds, setSelectedCardIds] = React.useState<string[]>([]);

    const handleCardClick = (cardId: string) => {
        if (selectedCardIds.filter(id => id === cardId).length >= 3) return

        setSelectedCardIds(prevSelectedCardIds => [...prevSelectedCardIds, cardId]);
    };

    const groupedCardsMap = data?.data.reduce((map, card) => {
        const cardId = card.cardSet.card.id;
        if (map.has(cardId)) {
            map.set(cardId, map.get(cardId) + 1);
        } else {
            map.set(cardId, 1);
        }
        return map;
    }, new Map());

    const groupedCards = groupedCardsMap && Array.from(groupedCardsMap!, ([cardId, count]) => ({
        card: data?.data.find(card => card.cardSet.card.id === cardId)?.cardSet.card,
        count
    }));

    return (
        <div className="w-full flex flex-col h-full p-2">
            <div className="text-sm breadcrumbs">
                <ul>
                    <li><Link to={'/decks'}>Crafting zone</Link></li>
                    <li><Link to={'/decks/create'}>Mes decks</Link></li>
                </ul>
            </div>
            <div className="flex gap-2 overflow-scroll h-full">
                <div className="w-9/12 h-full border rounded-md flex flex-col space-y-2 pt-2">
                    <form className="flex w-full space-x-2 items-center justify-center">
                        <input type="text" className="input input-bordered" name="searchBar" placeholder="Rechercher" />
                        <Select name="rarities" options={rarities?.data} placeholder="Choisir une rareté" theme="dark" />
                        <Select name="attributeId" options={attributes?.data} placeholder="Choisir un attribut" theme="dark" />
                        <button className="btn" type="submit">Rechercher</button>
                        {/* <button className="btn" onClick={handleClear}>Vider</button> */}
                    </form>
                    <div className="w-full h-full grid grid-cols-8 gap-2 px-2 overflow-scroll">
                        {isLoading ? <Loader /> : groupedCards?.map((groupedCard) => (
                            <div className="indicator flex flex-col items-center hover:scale-95 duration-150 ease-in-out cursor-pointer" key={groupedCard?.card?.id}>
                                <span className="indicator-item badge">{groupedCard.count > 99 ? '99+' : groupedCard.count}</span>
                                <img
                                    src={groupedCard.card?.imageUrl}
                                    alt=""
                                    className={`w-32 h-64 rounded-md`}
                                    style={{ maxWidth: "100%", height: "auto" }}
                                    onClick={() => handleCardClick(groupedCard?.card?.id!)}
                                />
                            </div>
                        ))}
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
                            <span className={`${selectedCardIds.length < 40 || selectedCardIds.length > 60 ? 'text-red-500' : 'text-green-500'}`}>
                                {selectedCardIds.length} / 40 (min) - 60 (max)
                            </span>
                            {selectedCardIds.map((cardId) => (
                                <div className="h-14 w-full p-2 bg-gray-300/20 rounded-md">
                                    {cardId}
                                </div>
                            ))}
                        </React.Fragment>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewDecks;
