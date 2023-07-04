import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Dispatch, SetStateAction } from "react";
import { itemTypes } from "@/pages/Duels";

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
}: {
  setter: Dispatch<SetStateAction<Card[]>>;
}) => {
  const [droppedCard, setDroppedCard] = useState<Card | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: itemTypes.CARD,
    drop: (item: Card) => handleDrop(item, setter),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleDrop = (item: Card, setter: Dispatch<SetStateAction<Card[]>>) => {
    console.log(item);
    setDroppedCard(item);
    setter((prev: Card[]) => prev.filter((card) => card.id !== item.id));
    setShowModal(true);
  };

  const handlePositionSelection = (position: string) => {
    setSelectedPosition(position);
    setShowModal(false);
  };

  return (
    <div
      className="border-2 border-sky-500 w-24 h-32"
      ref={dropRef}
      style={{
        transform: selectedPosition === "DEF" ? "rotate(90deg)" : "none",
      }}
    >
      {droppedCard && selectedPosition && (
        <>
          <img
            src={droppedCard.imageUrl}
            style={{
              width: "100%",
              height: "100%",
            }}
            alt={droppedCard.name}
          />
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
                ATK
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => handlePositionSelection("DEF")}
              >
                DEF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
