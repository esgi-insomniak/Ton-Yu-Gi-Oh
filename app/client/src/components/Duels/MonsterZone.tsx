import React from "react";
import { useDrop } from "react-dnd";
import { Dispatch, SetStateAction } from "react";
import { itemTypes } from "@/pages/Duels";
import { useAlert } from "@/helpers/providers/alerts/AlertProvider";
import { IDuelCardInField } from "@/helpers/types/duel";

export const MonsterZone = ({
  onCardHover,
  player,
}: {
  onCardHover: (card: IDuelCardInField | null) => void;
  player: boolean;
}) => {
  const [droppedCard, setDroppedCard] = React.useState<IDuelCardInField | null>(null);
  const [selectedPosition, setSelectedPosition] = React.useState("");
  const alert = useAlert();

  const [{}, dropRef] = useDrop({
    accept: itemTypes.CARD,
    drop: (item: IDuelCardInField) => handleDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleDrop = (item: IDuelCardInField) => {
    if(player) {
    setDroppedCard(item);
    console.log(item)
    //setter((prev: ICard[]) => prev.filter((card) => card.id !== item.id));
    setSelectedPosition("ATK");
    }else{
      alert?.error("Ce n'est pas votre terrain !");
    }
  };

  const handlePositionSelection = (position: string) => {
    setSelectedPosition(position);
  };

  const handleMouseEnter = () => {
    onCardHover(droppedCard);
  };

  const handleMouseLeave = () => {
    onCardHover(null);
  };

  function handleChangePosition(
    selectedPosition: string
  ): React.MouseEventHandler<HTMLLIElement> | undefined {
    if (selectedPosition === "ATK") {
      return () => handlePositionSelection("DEF");
    } else {
      return () => handlePositionSelection("ATK");
    }
  }

  const handleAttack = () => {
    console.log("attack");
  };

  return (
    <div
      className={`${
        selectedPosition != "DEF" ? "shadow-inner shadow-black" : ""
      } w-24 h-32`}
      ref={dropRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {droppedCard && selectedPosition && (
        <>
          <div
            className="flex items-center"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <div className="dropdown dropdown-right dropdown-end">
              <label
                tabIndex={0}
                className="flex items-center justify-center cursor-pointer text-2xl"
              >
                <img
                  src={droppedCard.userCardSet.cardSet.card.imageUrl}
                  style={{
                    width: "100%",
                    height: "100%",
                    transform:
                      selectedPosition === "DEF" ? "rotate(90deg)" : "none",
                  }}
                  alt={droppedCard.userCardSet.cardSet.card.name}
                />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box ml-2 cursor-pointer"
              >
                {selectedPosition === "ATK" && (
                  <li onClick={handleAttack}>Attaquer</li>
                )}
                <li onClick={handleChangePosition(selectedPosition)}>
                  Changer de position
                </li>
              </ul>
            </div>
          </div>
          <div className="relative">
            <span className="bg-blue-200 text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-full px-2 dark:bg-blue-900 dark:text-blue-200 absolute translate-y-1/2 -translate-x-1/2 right-auto bottom-0 left-0">
              {droppedCard.userCardSet.cardSet.card.atk}
            </span>
            <span className="bg-blue-200 text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-full px-2 dark:bg-blue-900 dark:text-blue-200 absolute translate-y-1/2 translate-x-1/2 left-auto bottom-0 right-0">
              {droppedCard.userCardSet.cardSet.card.def}
            </span>
          </div>
        </>
      )}
    </div>
  );
};