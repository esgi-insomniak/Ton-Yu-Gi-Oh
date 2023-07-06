import { itemTypes } from "@/pages/Duels";
import { useDrag } from "react-dnd";
import { IUserCardSet } from "@/helpers/types/cards";

export const HandCard = ({ card, onCardHover, playerTurn = false }: { card: IUserCardSet, onCardHover: (card: IUserCardSet | null) => void, playerTurn: boolean }) => {
  const [{}, dragRef] = useDrag(
    () => ({
      type: itemTypes.CARD,
      item: card,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      canDrag: playerTurn,
    }),
    [card]
  );

  const handleMouseEnter = () => onCardHover(card);

  const handleMouseLeave = () => onCardHover(null)

  return (
    <div
      key={card?.id}
      ref={dragRef}
      className="my-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={card?.cardSet.card.imageUrlSmall}
        alt={card?.cardSet.card.imageUrlSmall}
        style={{
          width: "92px",
          height: "124px",
        }}
      />
    </div>
  );
};
