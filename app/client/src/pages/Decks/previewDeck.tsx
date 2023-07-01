import { CardICardSet } from "@/helpers/types/cards";
import { useGameCard } from "@/helpers/context/cards/GameCardContext";
import React from "react";

const PreviewDecks = ({
  cardSets: cardSetsProps,
}: {
  cardSets: CardICardSet[] | undefined;
}) => {

  const { cardSets, setCardSets } = useGameCard();
  if (cardSetsProps?.status === "loading") return <div>Loading...</div>;
  React.useEffect(() => {
    if (!cardSetsProps?.data.data.cardSets.length) return;

    const gameCardSets = cardSetsProps?.data.data.cardSets.map((cardSet) => ({
      ...cardSet,
      isActive: false,
      isHidden: false,
      isFocused: false,
      isLoaded: false,
      isDraggable: false,
      canPop: true,
      canFlip: false,
      canActivate: true,
      canInteract: true,
    }));

    setCardSets(gameCardSets);
  }, [cardSetsProps?.data.data.cardSets, setCardSets]);

  return (
    <div className="h-[calc(100vh-15rem)] flex flex-col  w-full overflow-scroll">
      <div className="grid grid-cols-10 gap-2">
        {cardSets?.map((cardSet, i) => (
          <img key={i} src={cardSet.cardSet.card.imageUrlSmall} />
        ))}
      </div>
    </div>
  );
};

export { PreviewDecks };
