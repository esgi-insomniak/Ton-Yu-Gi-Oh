import { BoosterData } from "@/helpers/types/booster";
import { itemTypes } from "@/pages/Duels";
import { useDrag } from "react-dnd";

const HandCard = ({ card }) => {
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
      className="h-1/2 w-1/4 bg-white rounded-md shadow-md p-4 m-4"
    >
      {card.name}
    </div>
  );
};

export default HandCard;
