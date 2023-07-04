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
import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";

export const itemTypes = { BOOSTER: "booster" };

const Booster = () => {
    const { me } = useMe();
    const { data, isLoading, isError, refetch } = useGetUserBooster(me?.id!);
    const [boosterData, setBoosterData] = React.useState<BoosterData[]>([]);
    const [droppedBooster, setDroppedBooster] = React.useState<DropBooster | null>(null);
    const openBooster = useOpeningBooster();
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
            <div className="flex flex-col w-1/3 overflow-scroll items-center space-y-3 py-5">
                {boosterData.length > 0 ? (
                    boosterData.map((booster: BoosterData) => (
                        <div key={booster.id} className="h-96 w-72 hover:scale-105 duration-150 transition-all relative">
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
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                            alt=""
                            className="cursor-grab"
                        />
                    </div>
                )}
                {openedBooster && (
                    <div className="booster-overlay">
                        <h2 className="text-xl">Cartes obtenues : </h2>
                        <div className="card-container">
                            {openedBooster.data.map((booster, index: number) => (
                                <div className="card-item" key={index}>
                                    <img
                                        src={booster.cardSet.card.imageUrl}
                                        style={{ width: "200px" }}
                                        className="my-3"
                                        alt=""
                                    />
                                </div>
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
                    <div
                        className={`${canDrop && isOver && "animate-pulse bg-white transition-colors duration-200"} h-96 w-64 shadow-inner shadow-black flex justify-center items-center rounded-md`}
                    >
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
