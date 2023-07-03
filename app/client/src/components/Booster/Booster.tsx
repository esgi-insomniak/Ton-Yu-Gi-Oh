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
    <div className="indicator my-5" key={booster.id}>
      <span className="indicator-item badge badge-secondary">
        {booster.count}
      </span>
      <img
        src={booster.set.image}
        ref={dragRef}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "move",
        }}
        className="w-52 h-80 rounded-sm"
        alt=""
      />
    </div>
  );
};

export default BoosterItem;
