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
import { ISocketEvent, ISocketEventType } from "@/helpers/types/socket";
import { IDuelPlayer } from "@/helpers/types/duel";

const SelectDeck = () => {
    const { me } = useMe();
    const { data: decksData, refetch } = useGetAllUserDecks(me?.id!, 10, 0);
    const { toggle: previewDeckToggle, isShowing: previewDeckShowing } = useModal();
    const { toggle: previewSelectDeckToggle, isShowing: isShowingSelectedDeck } = useModal();
    const navigate = useNavigate();
    const alert = useAlert();
    const { roomId } = useParams<{ roomId: string }>();
    const { getIoClient } = useSocket();
    const [selectedDeck, setSelectedDeck] = React.useState<userCardSetsType>();
    const [userIsWaiting, setUserIsWaiting] = React.useState<boolean>();
    const defaultCountDown = 60;

    interface CountDownStyle extends React.CSSProperties {
        "--value": number;
    }

    const [countDown, setCountDown] = React.useState<number>(defaultCountDown);
    const [countDownStyle, setCountDownStyle] = React.useState<CountDownStyle>({
        "--value": countDown
    });


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
        getIoClient()?.emit('duel__select_deck', { userDeckId: selectedDeck.id, duelRoomId: roomId });
    };

    React.useEffect(() => {
        setCountDownStyle({
            "--value": countDown
        });
    }, [countDown]);

    React.useEffect(() => {
        getIoClient()?.off('duel__deck_selected');
        getIoClient()?.on('duel__deck_selected', (event: ISocketEvent) => {
            if (event.event === 'duel__deck_selected_countdown') {
                return setCountDown(event.data.countDown);
            }
            if (event.type === ISocketEventType.DELETE) {
                getIoClient()?.off('duel__deck_selected');
                alert?.error('Aucun deck n\'a été sélectionné 😭');
                return navigate('/');
            } else if (event.type === ISocketEventType.INFO) {
                const haveDeck = event.data.players.find((player: IDuelPlayer) => player.userId === me?.id).deckId !== null ? true : false;
                setUserIsWaiting(!haveDeck);
                if (!event.data.hasStarted) return;
                getIoClient()?.off('duel__deck_selected');
                alert?.success('La partie va commencé !');
                return navigate(`/duel/${roomId}`);
            }
        });
    }, []);

    return (
        <div className="px-10 py-10 flex-col">
            <div className="flex justify-center mb-2">
                <span className="countdown font-mono text-6xl">
                    <span style={{ ...countDownStyle }}></span>
                </span>
            </div>
            <progress className="progress progress-warning w-full mb-2" value={countDown} max={defaultCountDown}></progress>
            <div className="w-full h-full flex flex-col">
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
        </div>
    );
};

export default SelectDeck;
