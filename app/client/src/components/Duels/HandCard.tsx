import { itemTypes } from "@/pages/Duels";
import { useDrag } from "react-dnd";

export const HandCard = ({ card }) => {
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

  return (
    <div
      key={card.id}
      ref={dragRef}
      className="my-3"
    >
      <img src={card.imageUrl} alt={card.name} />
    </div>
  );
};