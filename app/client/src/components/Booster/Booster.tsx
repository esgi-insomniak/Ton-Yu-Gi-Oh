import { BoosterData } from "@/helpers/types/booster";
import { itemTypes } from "@/pages/Booster";
import { useDrag } from "react-dnd";

const BoosterItem = ({ booster }: { booster: BoosterData }) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: itemTypes.BOOSTER,
      item: booster,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [booster]
  );

  return (
    <div className="indicator rounded-md" key={booster.id}>
      <span className="indicator-item z-0 badge badge-secondary absolute right-10 top-3">
        {booster.count}
      </span>
      <img
        src={booster.set.image}
        ref={dragRef}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "move",
        }}
        className="h-96 w-72 rounded-sm object-contain"
        alt="booster"
      />
    </div>
  );
};

export default BoosterItem;
