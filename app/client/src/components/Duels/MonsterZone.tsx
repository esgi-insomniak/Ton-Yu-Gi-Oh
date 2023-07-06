import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Dispatch, SetStateAction } from "react";
import { itemTypes } from "@/pages/Duels";
import { useAlert } from "@/helpers/providers/alerts/AlertProvider";
import { IDuelCardInField, IDuelCardInFieldAction } from "@/helpers/types/duel";
import { IUserCardSet } from "@/helpers/types/cards";

export const MonsterZone = ({
  onCardHover,
  player,
  positionField,
  index,
  setPositionField,
}: {
  onCardHover: (card: IDuelCardInField | null) => void;
  player: boolean;
  positionField: IDuelCardInField[];
  index: number;
  setPositionField: Dispatch<SetStateAction<IDuelCardInField[]>>;
}) => {
  const [droppedCard, setDroppedCard] = useState<IDuelCardInField | null>(null);
  const [currentPositionField, setCurrentPositionField] = useState<IDuelCardInField[]>(positionField);
  const alert = useAlert();

  const [{ }, dropRef] = useDrop({
    accept: itemTypes.CARD,
    drop: (userCardSet: IUserCardSet) => handleDrop(userCardSet),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleDrop = (userCardSet: IUserCardSet) => {
    if (player) {
      // cannot add the same card twice
      const cardIsAlreadyExist = currentPositionField.find(
        (fieldCard) => fieldCard && fieldCard?.userCardSet?.id === userCardSet?.id
      );

      if (cardIsAlreadyExist) return;
      if (currentPositionField[index]) return;

      const newCardInField: IDuelCardInField = {
        position: index,
        userCardSet: userCardSet,
        actionSetAtTurn: -1,
        action: "ATK",
        lifePoints: -1,
      };

      setDroppedCard(newCardInField);

      // update the positionField state
      const newFieldState = [...currentPositionField];
      newFieldState[index] = newCardInField;
      setCurrentPositionField(newFieldState);
      setPositionField(newFieldState);
    } else {
      alert?.error("Ce n'est pas votre terrain !");
    }
  };

  const handlePositionSelection = (index: number, position: IDuelCardInFieldAction) => {
    const newFieldState = [...currentPositionField];
    newFieldState[index].action = position;
    setCurrentPositionField(newFieldState);
    setPositionField(newFieldState);
  };

  const handleMouseEnter = () => {
    onCardHover(droppedCard);
  };

  const handleMouseLeave = () => {
    onCardHover(null);
  };

  function handleChangePosition(
    card: IDuelCardInField,
  ): React.MouseEventHandler<HTMLLIElement> | undefined {
    if (card.action === "ATK") {
      return () => handlePositionSelection(card.position as number, "DEF");
    } else {
      return () => handlePositionSelection(card.position as number, "ATK");
    }
  }

  const handleAttack = () => {
    console.log("attack");
  };

  return (
    <div
      className={"shadow-inner shadow-black w-24 h-32"}
      ref={dropRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {droppedCard && (
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
                      droppedCard.action === "DEF" ? "rotate(90deg)" : "none",
                  }}
                  alt={droppedCard.userCardSet.cardSet.card.name}
                />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box ml-2 cursor-pointer"
              >
                {droppedCard.action === "ATK" && (
                  <li onClick={handleAttack}>Attaquer</li>
                )}
                <li onClick={handleChangePosition(droppedCard)}>
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