import React from "react";
import { useDrop } from "react-dnd";
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
  const [droppedCard, setDroppedCard] = React.useState<IDuelCardInField | null>(null);
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
      // cannot add same card twice
      const cardIsAlreadyExist = positionField.find(
        (fieldCard) => fieldCard && fieldCard.userCardSet.id === userCardSet.id
      );

      if (cardIsAlreadyExist) return;
      if (positionField[index]) return;

      const newCardInField: IDuelCardInField = {
        position: index,
        userCardSet: userCardSet,
        actionSetAtTurn: -1,
        action: "ATK",
        lifePoints: -1,
      }

      setDroppedCard(newCardInField);

      // user the index at position in the array
      setPositionField((prev: IDuelCardInField[]) => {
        const fields = [...prev];
        fields[index] = newCardInField;
        return fields;
      });
    } else {
      alert?.error("Ce n'est pas votre terrain !");
    }
  };

  const handlePositionSelection = (index: number, position: IDuelCardInFieldAction) => {
    setPositionField((prev: IDuelCardInField[]) => {
      const fields = [...prev];
      fields[index].action = position;
      return fields;
    });
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

  const handleAttack = (droppedCard: IUserCardSets, index: number) => {
    console.log(droppedCard)
    console.log(index)
    const
    const monsterZone = document.querySelectorAll(`.adversary-zone`);
  
    if (monsterZone.length === 0) {
      const lifepoint = document.querySelector(`#${adversary?.userId}-life`);
      lifepoint?.classList.add("glow");
      lifepoint?.addEventListener("click", handleAttackClick);
    } else {
      let isEmpty = true;
      monsterZone.forEach((element) => {
        if (element.childElementCount > 0) {
          isEmpty = false;
          element.classList.add("glow");
          element.addEventListener("click", handleAttackClick);
        }
      });
  
      if (isEmpty) {
        const lifepoint = document.getElementById(`${adversary?.userId}-life`);
        lifepoint?.classList.add("glow");
        lifepoint?.addEventListener("click", handleAttackClick);
      }
    }
  };
  
  const handleAttackClick = (event) => {
    console.log("click")
    const targetElement = event.currentTarget;
    console.log(targetElement)
    const card = targetElement?.querySelector(".card");
    console.log(this)
    if (card) {
      const attackValue = card.getAttribute("data-attack");
      const explosion = document.createElement("div");
      explosion.className = "explosion";
      explosion.textContent = attackValue;
      targetElement.appendChild(explosion);
  
      const rect = targetElement.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
  
      card.classList.add("animated");
      card.style.transform = `translate(${rect.left - cardRect.left}px, ${rect.top - cardRect.top}px)`;
  
      setTimeout(() => {
        targetElement.removeChild(explosion);
        card.classList.remove("animated");
        card.style.transform = "";
      }, 2000);
    }
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
            <div
              className="dropdown dropdown-right dropdown-end"
              id={`${droppedCard.id}-${index}`}
            >
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
