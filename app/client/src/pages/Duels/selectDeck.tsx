import React from "react";
import { useGetAllUserDecks } from "@/helpers/api/hooks/decks";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "@/components/Modal";
import { GameCardProvider } from "@/helpers/providers/cards/cardsProvider";
import useModal from "@/helpers/api/hooks/modal";
import { AiFillEye } from "react-icons/ai";
import { useAlert } from "@/helpers/providers/alerts/AlertProvider";
import { useMe } from "@/helpers/api/hooks/users";
import { PreviewSets } from "../Shop/previewSets";
import { CardICardSet } from "@/helpers/types/cards";
import { userCardSetsType } from "@/helpers/utils/schema/cards/card-set.schema";
import { BiSolidCheckSquare, BiSolidSelectMultiple } from "react-icons/bi";
import { useSocket } from "@/helpers/api/hooks";
import { ISocketEvent } from "@/helpers/types/socket";

const SelectDeck = () => {
    const { me } = useMe();
    const { data: decksData, refetch } = useGetAllUserDecks(me?.id!, 10, 0);
    const { toggle: previewDeckToggle, isShowing: previewDeckShowing } = useModal();
    const { toggle: previewSelectDeckToggle, isShowing: isShowingSelectedDeck } = useModal();
    const navigate = useNavigate();
    const alert = useAlert();
    const { roomId } = useParams<{ roomId: string }>();
    const { ioClient } = useSocket();
    const [selectedDeck, setSelectedDeck] = React.useState<userCardSetsType>();

    const handlePreviewBooster = (deck: userCardSetsType) => {
        setSelectedDeck(deck);
        previewDeckToggle();
    };

    const handleSelectDeck = (deck: userCardSetsType) => {
        setSelectedDeck(deck);
        previewSelectDeckToggle();
    };

    const selectDeck = async () => {
        previewSelectDeckToggle();
        if (!selectedDeck) return;
        ioClient?.emit('duel__select_deck', { userDeckId: selectedDeck.id, duelRoomId: roomId });
    };

    React.useEffect(() => {
        ioClient?.on('duel__deck_selected', (event: ISocketEvent) => {
            console.log(event);
        });
    }, []);

    return (
        <div className="w-full h-full px-10 py-10 flex flex-col">
            <div className="flex">
                <div className="w-full h-[80vh] p-5 rounded-md shadow-inner shadow-black overflow-scroll scrollbar-none">
                    <div className="flex flex-wrap space-x-4 flex-1">
                        {decksData?.data?.map((deck) => {
                            return (
                                <div className="card bg-base-100 shadow-xl group relative w-52 h-80" key={deck.id}>
                                    <img src={deck?.cardSets[0]?.cardSet?.card.imageUrl} alt={deck.name} className="w-52 h-80 rounded-md" />
                                    <div className="group-hover:card-body hidden absolute backdrop-contrast-125 bg-black/80 h-full w-full rounded-md">
                                        <h2 className="card-title">{deck.name}</h2>
                                        <p>{deck.cardSets.length} cartes</p>
                                        <div className="card-actions justify-end">
                                            <div className="flex w-full justify-center gap-3">
                                                <div className="btn btn-accent" onClick={() => handlePreviewBooster(deck)}>
                                                    <AiFillEye className="text-white" />
                                                </div>
                                                <div className="btn btn-accent" onClick={() => handleSelectDeck(deck)}>
                                                    <BiSolidCheckSquare className="text-white" />
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
            </div>
            <Modal
                isShowing={previewDeckShowing}
                toggle={previewDeckToggle}
                title={`Aperçu du deck ${selectedDeck?.name}`}
                content={
                    <GameCardProvider>
                        <PreviewSets cardSets={
                            selectedDeck?.cardSets.map((cardSet) => {
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
                isShowing={isShowingSelectedDeck}
                toggle={previewSelectDeckToggle}
                title="Sélection du deck"
                text={`Etes vous sur de vouloir sélectionner le deck ${selectedDeck?.name} ?`}
                yesNo
                yesNoAction={[
                    { text: "Annuler", action: previewSelectDeckToggle, type: 'no' },
                    { text: "Sélectionner", action: selectDeck, type: 'yes' }
                ]}
            />
        </div >
    );
};

export default SelectDeck;
