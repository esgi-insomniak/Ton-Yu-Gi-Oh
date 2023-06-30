import BoosterItem from "@/components/Booster/Booster";
import { useAuth } from "@/helpers/api/hooks";
import {
  useGetUserBooster,
  useOpeningBooster,
} from "@/helpers/api/hooks/booster";
import {
  BoosterData,
  BoosterGetAll,
  DropBooster,
  OpenedBooster,
} from "@/helpers/types/booster";
import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";

export const itemTypes = {
  BOOSTER: "booster",
};

const Booster = () => {
  const { user } = useAuth();
  const { data, isLoading, isError } = useGetUserBooster(user?.id);
  const [boosterData, setBoosterData] = useState<BoosterData[]>([]);
  const [droppedBooster, setDroppedBooster] = useState<DropBooster | null>(
    null
  );
  const openBooster = useOpeningBooster();
  const [openedBooster, setOpenedBooster] = useState<OpenedBooster | null>(
    null
  );
  const [showButton, setShowButton] = useState<Boolean>(false);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      if (boosterData.length === 0) {
        const boosterData = countBoosters(data);
        setBoosterData(boosterData);
      }
    }
  }, [data, isLoading, isError]);

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

      const droppedBoosterData = {
        id: item.ids[0],
        set:
          updatedBoosterData.find((booster) => booster.id === item.id)?.set ||
          null,
      };

      return updatedBoosterData;
    });

    setDroppedBooster(
      (prevDroppedBooster) =>
        ({
          ...prevDroppedBooster,
          id: item.ids[0],
          set:
            boosterData.find((booster) => booster.id === item.id)?.set || null,
        } as DropBooster | null)
    );
  };

  useEffect(() => {
    if (droppedBooster) {
      handleOpenBooster(droppedBooster.id);
    }
  }, [droppedBooster]);

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
    const data = await openBooster.mutateAsync(boosterId);
    setOpenedBooster(data);
    setShowButton(true);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col w-1/3 overflow-scroll">
        {boosterData.length > 0 ? (
          boosterData.map((booster: BoosterData) => (
            <div key={booster.id} className="mx-auto">
              {booster.count > 0 && <BoosterItem booster={booster} />}
            </div>
          ))
        ) : (
          <p className="text-center my-auto font-bold text-xl">Pas de booster disponible</p>
        )}
      </div>

      <div
        className="flex justify-center items-center w-1/2 mx-auto my-3"
        ref={dropRef}
      >
        {droppedBooster && !openedBooster && (
          <div className="drop-zone">
            <img
              src={droppedBooster.set.image}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              alt=""
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
            className={`${canDrop && isOver ? "drop-zone-hover" : "drop-zone"}`}
          >
            {/* shadow inner */}
            <div className="drop-zone-content">
              <h1>Déposez votre booster ici pour l'ouvrir</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booster;
