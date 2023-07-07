import BoosterItem from "@/components/Booster/Booster";
import {
    useGetUserBooster,
    useOpeningBooster,
} from "@/helpers/api/hooks/booster";
import { useMe } from "@/helpers/api/hooks/users";
import {
    BoosterData,
    BoosterGetAll,
    DropBooster,
    OpenedBooster,
} from "@/helpers/types/booster";
import React from "react";
import { useDrop } from "react-dnd";
import GameCard from "@/components/GameCard/GameCard";
import { useGameCard } from "@/helpers/context/cards/GameCardContext";
import { IGameCard } from "@/helpers/types/cards";

export const itemTypes = { BOOSTER: "booster" };

const Booster = () => {
    const { me } = useMe();
    const { data, isLoading, isError, refetch } = useGetUserBooster(me?.id!);
    const [boosterData, setBoosterData] = React.useState<BoosterData[]>([]);
    const [droppedBooster, setDroppedBooster] = React.useState<DropBooster | null>(null);
    const openBooster = useOpeningBooster();
    const { cardSets, setCardSets } = useGameCard();
    const [openedBooster, setOpenedBooster] = React.useState<OpenedBooster | null>(null);
    const [showButton, setShowButton] = React.useState<Boolean>(false);

    React.useEffect(() => {
        if (!!data) {
            const boosterData = countBoosters(data);
            setBoosterData(boosterData);
        }
    }, [data, isLoading, isError, refetch]);

    const [{ canDrop, isOver }, dropRef] = useDrop({
        accept: itemTypes.BOOSTER,
        drop: (item: BoosterData) => handleDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const handleDrop = (item: BoosterData) => {
        setBoosterData((prevBoosterData) => {
            const updatedBoosterData = prevBoosterData.map((booster) => {
                if (booster.id === item.id) {
                    return {
                        ...booster,
                        count: booster.count - 1,
                        ids: booster.ids.filter((id) => id !== item.ids[0]),
                    };
                }
                return booster;
            });

            return updatedBoosterData;
        });

        setDroppedBooster((prevDroppedBooster) => ({
            ...prevDroppedBooster,
            id: item.ids[0],
            set:
                boosterData.find((booster) => booster.id === item.id)?.set || null,
        } as DropBooster | null));
    };

    React.useEffect(() => { if (droppedBooster) handleOpenBooster(droppedBooster.id) }, [droppedBooster]);
    React.useEffect(() => {
        if (!openedBooster?.data) return;
        const newCardSets = openedBooster.data.map<IGameCard>((userCardSet) => {
            return {
                ...userCardSet.cardSet,
                userCardSetId: userCardSet.id,
                isActive: false,
                isHidden: false,
                isFocused: false,
                isLoaded: false,
                isDraggable: false,
                canPop: true,
                displayCardInfoOnPop: false,
                showExchangeOnPop: false,
                showAuctionOnPop: false,
                submitAuction: () => {},
                popScale: 1.75,
                canFlip: false,
                canActivate: true,
                canInteract: true,
            }
        });
        setCardSets(newCardSets);
    }, [openedBooster]);


    const countBoosters = (data: BoosterGetAll) => {
        const boosterData: { [key: string]: any } = {};

        data.data.map((item) => {
            const boosterId = item.set.id;

            if (boosterData[boosterId]) {
                boosterData[boosterId].count += 1;
                boosterData[boosterId].ids.push(item.id);
            } else {
                boosterData[boosterId] = {
                    id: boosterId,
                    set: item.set,
                    count: 1,
                    ids: [item.id],
                };
            }
        });

        return Object.values(boosterData);
    };

    const handleOpenBooster = async (boosterId: string) => {
        const data = await openBooster.mutateAsync(boosterId, {
            onSuccess: () => {
                refetch();
                setDroppedBooster(null);
            }
        });
        setOpenedBooster(data);
        setShowButton(true);
    };

    return (
        <div className="flex w-full h-full">
            <div className="flex flex-col overflow-y-scroll scrollbar-none items-center space-y-3 py-5">
                {boosterData.length > 0 ? (
                    boosterData.map((booster: BoosterData) => (
                        <div key={booster.id} className="hover:scale-105 duration-150 transition-all relative">
                            {booster.count > 0 && <BoosterItem booster={booster} />}
                        </div>
                    ))
                ) : (
                    <p className="text-center my-auto font-bold text-xl">Pas de booster disponible</p>
                )}
            </div>
            <div className="divider divider-horizontal w-2" />
            <div
                className="flex justify-center items-center w-1/2 mx-auto my-3"
                ref={dropRef}
            >
                {droppedBooster && !openedBooster && (
                    <div className="drop-zone cursor-grab">
                        <img
                            src={droppedBooster.set.image}
                            alt="dropped-booster"
                            className="cursor-grab w-full h-full object-contain"
                        />
                    </div>
                )}
                {openedBooster && (
                    <div className="booster-overlay">
                        <h2 className="text-xl">Cartes obtenues : </h2>
                        <div className="grid xl:grid-cols-5 lg:grid-cols-4 grid-cols-3 justify-center gap-5 h-auto w-1/2 max-h-screen">
                            {cardSets.map((cardSet, i) => (
                                <GameCard key={i} {...cardSet} />
                            ))}
                        </div>
                        <div className="button-container">
                            {showButton && (
                                <button
                                    onClick={() => {
                                        setShowButton(false);
                                        setDroppedBooster(null);
                                        setOpenedBooster(null);
                                    }}
                                    className="z-40 btn btn-primary"
                                >
                                    Continue
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {!droppedBooster && !openedBooster && (
                    <div className={`${canDrop && isOver && "animate-pulse bg-white transition-colors duration-200"} h-96 w-64 shadow-inner shadow-black flex justify-center items-center rounded-md`}>
                        <div className="text-center">
                            <h1>Déposez votre booster ici pour l'ouvrir</h1>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Booster;
