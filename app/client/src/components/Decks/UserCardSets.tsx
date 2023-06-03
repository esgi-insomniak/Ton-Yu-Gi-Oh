import { UserCardSetsProps } from "@/helpers/types/decks";
import React from "react";

const UserCardSets: React.FC<UserCardSetsProps> = ({ countCard, addCard, allUserCards, isLoading, isError }) => {

  return (
    <React.Fragment>
      <div className="flex justify-around items-center flex-wrap w-8/12 mx-auto my-5">
        {!isLoading &&
          !isError &&
          allUserCards.length > 0 &&
          allUserCards.map((card, index: number) => {
            return (
              <div
                key={index}
                className="my-3 mx-3"
                style={{
                  opacity:
                    card.count === 0 || countCard[card["item"].cardSet.id] >= 3
                      ? 0.5
                      : 1,
                }}
              >
                <div className="w-full" style={{ position: "relative" }}>
                  <span
                    className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      transform: "translate(50%, -50%)",
                    }}
                  >
                    x{card.count}
                  </span>
                  <img
                    onClick={() => {
                      if (
                        (card.count > 0 &&
                          !(countCard[card["item"].cardSet.id] >= 3)) ||
                        (card.count === 0 &&
                          countCard[card["item"].cardSet.id] >= 3)
                      ) {
                        addCard(index);
                      }
                    }}
                    src={card["item"].cardSet.card.imageUrlSmall}
                    alt={card["item"].cardSet.card.enName}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default UserCardSets;
