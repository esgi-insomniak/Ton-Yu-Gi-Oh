import React from "react";
import { useParams } from "react-router-dom";
import { HandCard } from "@/components/Duels/HandCard";
import { MonsterZone } from "@/components/Duels/MonsterZone";
import { useSocket } from "@/helpers/api/hooks";
import { ISocketEvent } from "@/helpers/types/socket";
import { IUserCardSets } from "@/helpers/types/cards";
import { IDuelPlayer } from "@/helpers/types/duel";
import { ICard } from "@/helpers/types/cards";
import { useMe } from "@/helpers/api/hooks/users";
import { TimerDuel } from "@/components/Duels/TimerDuel";

export const itemTypes = {
  CARD: "card",
};

const Duel = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { me } = useMe();
  const { getIoClient } = useSocket();
  const [hoveredCard, setHoveredCard] = React.useState<ICard>();
  const [currentPlayer, setCurrentPlayer] = React.useState<IDuelPlayer>();
  const [opponentPlayer, setOpponentPlayer] = React.useState<IDuelPlayer>();
  const [allUserCardSets, setAllUserCardSets] = React.useState<IUserCardSets[]>([]);
  const [playerTurn, setPlayerTurn] = React.useState<boolean>(false);
  const defaultCountDown = 90;

  const [countDown, setCountDown] = React.useState<number>(defaultCountDown);
  const handleCardHover = (card: ICard | null) => {
    setHoveredCard(card!);
  };

  React.useEffect(() => {
    if (allUserCardSets.length > 0) return;
    getIoClient()?.off("duel__current");
    getIoClient()?.on("duel__current", (event: ISocketEvent) => {
      if (event.event === "duel__current") {
        const userCardSets: IUserCardSets[] = event.data.players.reduce(
          (acc: IUserCardSets[], player: IDuelPlayer) => {
            const cardSets = player.deckUserCardSets.map((card) => card.cardSet);
            return [...acc, ...cardSets];
          },
          []
        );
        setAllUserCardSets(userCardSets);
        setOpponentPlayer(
          event.data.players.find(
            (player: IUserCardSets) => player.userId != me?.id
          )
        );
        setCurrentPlayer(
          event.data.players.find(
            (player: IUserCardSets) => player.userId == me?.id
          )
        );
        if (me?.id == event.data.playerToPlay) {
          setPlayerTurn(true);
        } else {
          setPlayerTurn(false);
        }
      } else if (event.event === "duel__deck_playtime_countdown") {
        setCountDown(event.data.countDown);
      }
    })
    getIoClient()?.emit("duel__get_current_game");
  }, [allUserCardSets]);

  return (
    <div className="flex">
      <div className="h-screen w-4/5 flex flex-col overflow-x-hidden">
        <div id="field" className="overflow-x-hidden">
          <div className="w-full">
            <div className="flex justify-center">
              {Array.from({ length: opponentPlayer?.cardsInHand }, () => (
                <img
                  src={
                    "https://images.ygoprodeck.com/images/cards/back_high.jpg"
                  }
                  alt={"Dos de card"}
                  style={{
                    width: "92px",
                    height: "124px",
                  }}
                />
              ))}
            </div>
            <div id="life">{opponentPlayer?.lifePoints}</div>
          </div>
          <div id="adversary-field" className="mb-10">
            <div
              id="adversary-monster-zone"
              className="flex justify-between items-center my-5"
            >
              <div
                id="monster-zone-adversary"
                className="flex justify-around items-center w-4/5"
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <MonsterZone
                    key={index}
                    onCardHover={handleCardHover}
                    player={false}
                  />
                ))}
              </div>
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
                      {opponentPlayer?.cardsInDeck}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <TimerDuel
              countDown={countDown}
              defaultCountDown={defaultCountDown}
            />
            {playerTurn && (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-3 rounded w-1/5">
                Fin de tour
              </button>
            )}
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
                    onCardHover={handleCardHover}
                    player={true}
                  />
                ))}
              </div>
              <div id="gravecard-zone-player" className="w-1/5">
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
                      {currentPlayer?.cardsInDeck}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-items-between">
            <div id="life">{currentPlayer?.lifePoints}</div>
            <div id="hand-player" className="flex justify-center mx-auto">
              {currentPlayer?.cardsInHand.map((cardId: string) => {
                const cardData = currentPlayer?.deckUserCardSets.find(
                  (card) => card.id === cardId
                );
                if (cardData) {
                  return (
                    <HandCard
                      key={cardId}
                      card={cardData}
                      onCardHover={() => handleCardHover(cardData)}
                      playerTurn={playerTurn}
                    />
                  );
                }
                return null; // handle the case where cardData is not found
              })}
            </div>
          </div>
        </div>
      </div>
      <div id="data-card" className="w-1/5 mx-auto">
        <p>Data des cartes</p>
        {hoveredCard && (
          <img
            src={hoveredCard?.cardSet?.card.imageUrl}
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
