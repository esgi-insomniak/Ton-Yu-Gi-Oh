import React from "react";
import { useParams } from "react-router-dom";
import { HandCard } from "@/components/Duels/HandCard";
import { MonsterZone } from "@/components/Duels/MonsterZone";

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

  const handleDrop = (cardId: string) => {
    const updatedCards = cards.filter((card) => card.id !== cardId);
    setCards(updatedCards);
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <div id="field" className="h-full">
        <div id="adversary-field" className="my-10">
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
                className="border-2 border-sky-500 w-24 h-32 mx-auto"
              >
                <img
                  src="https://images.ygoprodeck.com/images/cards/back_high.jpg"
                  alt="deck"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
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
                className="border-2 border-sky-500 w-24 h-32"
              >
                Monster Zone 1
              </div>
              <div
                id="monster-zone-adversary-2"
                className="border-2 border-sky-500 w-24 h-32"
              >
                Monster Zone 1
              </div>
              <div
                id="monster-zone-adversary-3"
                className="border-2 border-sky-500 w-24 h-32"
              >
                Monster Zone 1
              </div>
              <div
                id="monster-zone-adversary-4"
                className="border-2 border-sky-500 w-24 h-32"
              >
                Monster Zone 1
              </div>
              <div
                id="monster-zone-adversary-5"
                className="border-2 border-sky-500 w-24 h-32"
              >
                Monster Zone 1
              </div>
            </div>
            <div id="gravecard-zone-adversary" className="w-1/5">
              <div
                id="gravecard-zone-adversary-1"
                className="border-2 border-sky-500 w-24 h-32 mx-auto"
              >
                Cimetiere
              </div>
            </div>
          </div>
        </div>
        <div id="player-field" className="my-10">
          <div
            id="player-monster-zone"
            className="flex justify-between items-center my-5"
          >
            <div
              id="monster-zone-player"
              className="flex justify-around items-center w-4/5"
            >
              {Array.from({ length: 5 }, (_, index) => (
                <MonsterZone key={index} setter={setCards} />
              ))}
            </div>
            <div id="gravecard-zone-player" className="w-1/5">
              <div
                id="gravecard-zone-player-1"
                className="border-2 border-sky-500 w-24 h-32 mx-auto"
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
                className="border-2 border-sky-500 w-24 h-32 mx-auto"
              >
                <img
                  src="https://images.ygoprodeck.com/images/cards/back_high.jpg"
                  alt="deck"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-[45.5vh] w-full bg-gray-100">
        <div className="flex justify-center">
          {cards.map((card) => (
            <HandCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Duel;
