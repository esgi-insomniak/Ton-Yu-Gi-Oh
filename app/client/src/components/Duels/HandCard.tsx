import { itemTypes } from "@/pages/Duels";
import { useDrag } from "react-dnd";
import React, { useState } from "react";

export const HandCard = ({ card, onCardHover }) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: itemTypes.CARD,
      item: card,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [card]
  );

  const handleMouseEnter = () => {
    onCardHover(card);
  };

  const handleMouseLeave = () => {
    onCardHover(null);
  };

  return (
    <div
      key={card.id}
      ref={dragRef}
      className="my-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={card.imageUrl}
        alt={card.name}
        style={{
          width: "92px",
          height: "124px",
        }}
      />
    </div>
  );
};
