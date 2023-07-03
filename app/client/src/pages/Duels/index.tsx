import React from "react";
import { useParams } from "react-router-dom";
import { useDrop } from "react-dnd";
import HandCard from "@/components/Duels/HandCard";

interface Card {
  id: string;
  name: string;
}

export const itemTypes = {
  CARD: "card",
};

const Duel = () => {
  const { roomId } = useParams<{ roomId: string }>();

  const handleDrop = (card: Card) => {
    // Handle the drop logic here
    console.log("Card dropped:", card);
  };

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: itemTypes.CARD,
    drop: (item: Card) => handleDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const cards: Card[] = [
    { id: "card1", name: "Card 1" },
    { id: "card2", name: "Card 2" },
    { id: "card3", name: "Card 3" },
  ];

  return (
    <div className="h-full w-full flex flex-col">
      <div className="min-h-[45.5vh] w-full bg-gray-300 flex justify-center items-center" ref={dropRef}>
        Adversaire
      </div>
      <div className="min-h-[45.5vh] w-full bg-gray-100">
        <div className="player-hand">
          {cards.map((card) => (
            <HandCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Duel;
