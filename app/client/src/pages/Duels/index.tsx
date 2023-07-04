import React from "react";
import { useParams } from "react-router-dom";
import { HandCard } from "@/components/Duels/HandCard";
import { MonsterZone } from "@/components/Duels/MonsterZone";
import { useSocket } from "@/helpers/api/hooks";
import { ISocketEvent } from "@/helpers/types/socket";
import { IUserCardSets } from "@/helpers/types/cards";
import { IDuelPlayer } from "@/helpers/types/duel";

interface Card {
  id: string;
  name: string;
  type?: string;
  imageUrl: string;
  atk?: number;
  def?: number;
}

export const itemTypes = {
  CARD: "card",
};

const Duel = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { getIoClient } = useSocket();
  const [hoveredCard, setHoveredCard] = React.useState<Card>();
  const [currentPlayer, setCurrentPlayer] = React.useState<IDuelPlayer>();
  const [opponentPlayer, setOpponentPlayer] = React.useState<IDuelPlayer>();
  const [allUserCardSets, setAllUserCardSets] = React.useState<IUserCardSets[]>([]);

  const [cards, setCards] = React.useState<Card[]>([
    {
      id: "card1",
      name: "Card 1",
      type: "monster",
      imageUrl: "https://images.ygoprodeck.com/images/cards_small/91070115.jpg",
      atk: 1000,
      def: 1000,
    },
    {
      id: "card2",
      name: "Card 2",
      type: "monster",
      imageUrl: "https://images.ygoprodeck.com/images/cards_small/70924884.jpg",
      atk: 1000,
      def: 1000,
    },
  ]);

  const adversaryCards = [
    {
      id: "card3",
      name: "Card 3",
      type: "monster",
      imageUrl: "https://images.ygoprodeck.com/images/cards/back_high.jpg",
      atk: 1000,
      def: 1000,
    },
    {
      id: "card4",
      name: "Card 4",
      type: "monster",
      imageUrl: "https://images.ygoprodeck.com/images/cards/back_high.jpg",
      atk: 1000,
      def: 1000,
    },
  ];

  const handleCardHover = (card: Card | null) => {
    setHoveredCard(card!);
  };

  React.useEffect(() => {
    if (allUserCardSets.length > 0) return;
    getIoClient()?.off("duel__current");
    getIoClient()?.on("duel__current", (event: ISocketEvent) => {
      console.log(event);
      const userCardSets: IUserCardSets[] = event.data.players.reduce((acc: IUserCardSets[], player: IDuelPlayer) => {
        const cardSets = player.deckUserCardSets.map((card) => card.cardSet);
        return [...acc, ...cardSets];
      }, []);
      setAllUserCardSets(userCardSets);
    })
    getIoClient()?.emit("duel__get_current_game");
  }, [allUserCardSets]);

  return (
    <div className="flex">
      <div className="h-screen w-4/5 flex flex-col overflow-x-hidden">
        <div id="field" className="overflow-x-hidden">
          <div className="w-full">
            <div className="flex justify-center">
              {adversaryCards.map((card) => (
                <HandCard
                  key={card.id}
                  card={card}
                  onCardHover={() => handleCardHover(card)}
                />
              ))}
            </div>
          </div>
          <div id="adversary-field" className="mb-10">
            <div
              id="adversary-magic-zone"
              className="flex justify-between items-center my-5"
            >
              <div
                id="magic-zone-adversary"
                className="flex justify-around items-center w-4/5"
              ></div>
              <div id="gravecard-zone-adversary" className="w-1/5">
                <div
                  id="gravecard-zone-adversary-1"
                  className="shadow-inner shadow-black w-24 h-32 mx-auto"
                >
                  <img
                    src="https://images.ygoprodeck.com/images/cards/back_high.jpg"
                    alt="deck"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <div className="relative">
                    <span className="bg-blue-200 text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-full px-2 dark:bg-blue-900 dark:text-blue-200 absolute translate-y-1/2 translate-x-1/2 left-auto bottom-0 right-0">
                      37
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="adversary-monster-zone"
              className="flex justify-between items-center my-5"
            >
              <div
                id="monster-zone-adversary"
                className="flex justify-around items-center w-4/5"
              >
                <div
                  id="monster-zone-adversary-1"
                  className="shadow-inner shadow-black w-24 h-32"
                ></div>
                <div
                  id="monster-zone-adversary-2"
                  className="shadow-inner shadow-black w-24 h-32"
                ></div>
                <div
                  id="monster-zone-adversary-3"
                  className="shadow-inner shadow-black w-24 h-32"
                ></div>
                <div
                  id="monster-zone-adversary-4"
                  className="shadow-inner shadow-black w-24 h-32"
                ></div>
                <div
                  id="monster-zone-adversary-5"
                  className="shadow-inner shadow-black w-24 h-32"
                ></div>
              </div>
              <div id="gravecard-zone-adversary" className="w-1/5">
                <div
                  id="gravecard-zone-adversary-1"
                  className="shadow-inner shadow-black w-24 h-32 mx-auto"
                >
                  Cimetiere
                </div>
              </div>
            </div>
          </div>
          <div id="player-field" className="mt-10">
            <div
              id="player-monster-zone"
              className="flex justify-between items-center my-5"
            >
              <div
                id="monster-zone-player"
                className="flex justify-around items-center w-4/5"
              >
                {Array.from({ length: 5 }, (card, index) => (
                  <MonsterZone
                    key={index}
                    setter={setCards}
                    onCardHover={handleCardHover}
                  />
                ))}
              </div>
              <div id="gravecard-zone-player" className="w-1/5">
                <div
                  id="gravecard-zone-player-1"
                  className="shadow-inner shadow-black w-24 h-32 mx-auto"
                >
                  Cimetiere
                </div>
              </div>
            </div>
            <div
              id="player-magic-zone"
              className="flex justify-between items-center my-5"
            >
              <div
                id="magic-zone-player"
                className="flex justify-around items-center w-4/5"
              ></div>
              <div id="deck-zone-player" className="w-1/5">
                <div
                  id="deck-zone-player-1"
                  className="shadow-inner shadow-black w-24 h-32 mx-auto"
                >
                  <img
                    src="https://images.ygoprodeck.com/images/cards/back_high.jpg"
                    alt="deck"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <div className="relative">
                    <span className="bg-blue-200 text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-full px-2 dark:bg-blue-900 dark:text-blue-200 absolute translate-y-1/2 translate-x-1/2 left-auto bottom-0 right-0">
                      37
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-items-between">
            <div id="life">{currentPlayer?.lifePoints}</div>
            <div id="hand-player" className="flex justify-center mx-auto">
              {cards.map((card) => (
                <HandCard
                  key={card.id}
                  card={card}
                  onCardHover={() => handleCardHover(card)}
                />
              ))}
            </div>
            <div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Fin de tour</button>
            </div>
          </div>
        </div>
      </div>
      <div id="data-card" className="w-1/5 mx-auto">
        <p>Data des cartes</p>
        {hoveredCard && (
          <img
            src={hoveredCard.imageUrl}
            alt={hoveredCard.name}
            style={{
              width: "80%",
              height: "50%",
            }}
          />
        )}
      </div>
      <div id="data-card" className="w-1/5 mx-auto">
        <p>Data des cartes</p>
        {hoveredCard && (
          <img
            src={hoveredCard.imageUrl}
            alt={hoveredCard.name}
            style={{
              width: "80%",
              height: "50%",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Duel;
