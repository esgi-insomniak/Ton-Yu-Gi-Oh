import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Dispatch, SetStateAction } from "react";
import { itemTypes } from "@/pages/Duels";
import { BsFillShieldFill } from "react-icons/bs";
import { TbSwords } from "react-icons/tb";

interface Card {
  id: string;
  name: string;
  type?: string;
  imageUrl: string;
  atk?: number;
  def?: number;
}

export const MonsterZone = ({
  setter,
  onCardHover,
}: {
  setter: Dispatch<SetStateAction<Card[]>>;
  onCardHover: (card: Card | null) => void;
}) => {
  const [droppedCard, setDroppedCard] = React.useState<Card | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedPosition, setSelectedPosition] = React.useState("");

  const [{}, dropRef] = useDrop({
    accept: itemTypes.CARD,
    drop: (item: Card) => handleDrop(item, setter),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleDrop = (item: Card, setter: Dispatch<SetStateAction<Card[]>>) => {
    setDroppedCard(item);
    setter((prev: Card[]) => prev.filter((card) => card.id !== item.id));
    setShowModal(true);
  };

  const handlePositionSelection = (position: string) => {
    setSelectedPosition(position);
    setShowModal(false);
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
                  src={droppedCard.imageUrl}
                  style={{
                    width: "100%",
                    height: "100%",
                    transform:
                      selectedPosition === "DEF" ? "rotate(90deg)" : "none",
                  }}
                  alt={droppedCard.name}
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
              {droppedCard.atk}
            </span>
            <span className="bg-blue-200 text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-full px-2 dark:bg-blue-900 dark:text-blue-200 absolute translate-y-1/2 translate-x-1/2 left-auto bottom-0 right-0">
              {droppedCard.def}
            </span>
          </div>
        </>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded p-4">
            <p className="text-lg font-bold mb-2">Select Position</p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => handlePositionSelection("ATK")}
              >
                <TbSwords />
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => handlePositionSelection("DEF")}
              >
                <BsFillShieldFill />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
