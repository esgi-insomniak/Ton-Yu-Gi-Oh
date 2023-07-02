import React from "react";
import { useGetAllUserDecks, useDeleteUserDeck } from "@/helpers/api/hooks/decks";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "@/components/Modal";
import { GameCardProvider } from "@/helpers/providers/cards/cardsProvider";
import useModal from "@/helpers/api/hooks/modal";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { useAlert } from "@/helpers/providers/alerts/AlertProvider";
import { useMe } from "@/helpers/api/hooks/users";
import { PreviewSets } from "../Shop/previewSets";
import { CardICardSet } from "@/helpers/types/cards";

const Decks = () => {
    const { me } = useMe();
    const { data: decksData } = useGetAllUserDecks(me?.id!, 10, 0);
    const { toggle: previewDeckToggle, isShowing: previewDeckShowing } = useModal();
    const { toggle: previewDeleteToggle, isShowing: isShowingDelte } = useModal();
    const navigate = useNavigate();
    const deleteUserDeck = useDeleteUserDeck();
    const alert = useAlert();
    const [selectedDeck, setSelectedDeck] = React.useState<number>();

    const handlePreviewBooster = (myDeckId: number) => {
        setSelectedDeck(myDeckId);
        previewDeckToggle();
    };

    const handleDeleteDeck = (id: string) => () => {
        deleteUserDeck.mutate(id, {
            onSuccess: () => {
                alert?.success("Deck supprimé avec succès");
            },
            onError: (error) => alert?.error("Une erreur est survenue lors de la suppression du deck")
        });
    };

    return (
        <div className="w-full h-full px-10 py-10 flex flex-col">
            <div className="flex">
                <div className="w-10/12 h-[80vh] p-5 rounded-md shadow-inner shadow-black overflow-scroll scrollbar-none">
                    <div className="flex flex-wrap space-x-4 flex-1">
                        {decksData?.data?.map((deck, index) => {
                            return (
                                <div className="card bg-base-100 shadow-xl group relative w-52 h-80" key={index}>
                                    <img src={deck?.cardSets[0]?.cardSet?.card.imageUrl} alt={deck.name} className="w-52 h-80 rounded-md" />
                                    <div className="group-hover:card-body hidden absolute backdrop-contrast-125 bg-black/80 h-full w-full rounded-md">
                                        <h2 className="card-title">{deck.name}</h2>
                                        <p>{deck.cardSets.length} cartes</p>
                                        <div className="card-actions justify-end">
                                            <div className="flex w-full justify-between">
                                                <div className="btn btn-accent" onClick={() => handlePreviewBooster(index)}>
                                                    <AiFillEye className="text-white" />
                                                </div>
                                                <div className="btn btn-error" onClick={previewDeleteToggle}>
                                                    <BsFillTrashFill className=" text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
                <div className="w-2/12 h-full pl-10 flex justify-start flex-col space-y-2">
                    <button onClick={() => navigate(-1)} className="btn">
                        Revenir en arrière
                    </button>
                    <Link to="/decks/new" className="btn btn-accent">
                        Créer un deck
                    </Link>
                </div>
            </div>
            <Modal
                isShowing={previewDeckShowing}
                toggle={previewDeckToggle}
                title={`Aperçu du deck ${decksData?.data?.[selectedDeck!]?.name}`}
                content={
                    <GameCardProvider>
                        <PreviewSets cardSets={
                            decksData?.data?.[selectedDeck!]?.cardSets.map((cardSet) => {
                                return {
                                    set: cardSet?.cardSet?.set,
                                    rarity: cardSet?.cardSet?.rarity,
                                    id: cardSet?.cardSet?.id,
                                    card: cardSet?.cardSet?.card,
                                    price: cardSet?.cardSet?.price,
                                } as unknown as CardICardSet
                            }) || []
                        } />
                    </GameCardProvider>
                }
            />
            <Modal
                isShowing={isShowingDelte}
                toggle={previewDeleteToggle}
                title={`Supprimer le deck ${decksData?.data?.[selectedDeck!]?.name}`}
                text="Etes vous sur de vouloir supprimer ce deck ?"
                yesNo
                yesNoAction={[
                    { text: "Annuler", action: previewDeleteToggle, type: 'no' },
                    { text: "Supprimer", action: () => handleDeleteDeck(decksData?.data?.[selectedDeck!].id!), type: 'yes' }
                ]}
            />
        </div>
    );
};

export default Decks;
