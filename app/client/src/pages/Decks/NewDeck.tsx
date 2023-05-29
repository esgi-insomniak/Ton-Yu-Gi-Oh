import React from "react";
import { useAuth } from "@/helpers/api/hooks";
import {
  useGetAllMyUserCardSets,
  getAllCardInDoubleAndIncrement,
} from "@/helpers/api/hooks/users";
import { usePostUserDeck } from "@/helpers/api/hooks/decks";

const NewDecks = () => {
  const { user } = useAuth();
  const { data, isLoading, isError } = useGetAllMyUserCardSets(user?.id);
  const [allUserCards, setAllUserCards] = React.useState<Array<any>>([]);
  const [decksImages, setDecksImages] = React.useState<
    Array<[any, number, any]>
  >([]);
  const [decks, setDecks] = React.useState<Array<string>>([]);
  const [countCard, setCountCard] = React.useState<any>({});
  const [initialState, setInitialState] = React.useState<Array<any>>([]);
  const [deckName, setDeckName] = React.useState("");
  const postDeck = usePostUserDeck();

  if (!isLoading && !isError && data) {
    if (allUserCards.length === 0) {
      setAllUserCards(getAllCardInDoubleAndIncrement(data));
    }
    if (initialState.length === 0) {
      setInitialState(getAllCardInDoubleAndIncrement(data));
    }
  }

  const AddCard = (index: number, isUpdated = false, isUpdateDeck = false) => {
    const [userCardSetId] = allUserCards[index]["userCardSetIds"];

    setCountCard((prevCountCard: any) => {
      const itemId = allUserCards[index]["item"].cardSet.id;
      const newCount = itemId in prevCountCard ? prevCountCard[itemId] + 1 : 1;

      if (newCount > 3) {
        return prevCountCard;
      }

      return { ...prevCountCard, [itemId]: newCount };
    });

    if (!(countCard[allUserCards[index]["item"].id] >= 3)) {
      setAllUserCards((prevSelectedCards) => {
        const newAllUserCards = [...prevSelectedCards];
        const selectedCard = newAllUserCards[index];

        if (selectedCard.count > 0 && !isUpdated) {
          selectedCard.count -= 1;
          isUpdated = true;
        }

        return newAllUserCards;
      });

      setDecksImages((prevSelectedCards) => [
        ...prevSelectedCards,
        [allUserCards[index]["item"], index, userCardSetId],
      ]);
      if (!isUpdateDeck) {
        setDecks((prevSelectedCards) => [...prevSelectedCards, userCardSetId]);
        allUserCards[index]["userCardSetIds"].splice(0, 1);
        isUpdateDeck = true;
      }
    }
  };

  const RemoveCard = (
    index: number,
    isUpdated = false,
    isUpdateDeck = false,
    card: any,
    cardIdDeck: any
  ) => {
    setCountCard(
      allUserCards[index]["item"].cardSet.id in countCard
        ? {
            ...countCard,
            [allUserCards[index]["item"].cardSet.id]:
              countCard[allUserCards[index]["item"].cardSet.id] - 1,
          }
        : { ...countCard, [allUserCards[index]["item"].cardSet.id]: 1 }
    );
    const cardIndex = decksImages.findIndex((card) => card[1] === index);

    if (cardIndex !== -1) {
      setDecksImages((prevSelectedCards) =>
        prevSelectedCards.filter(
          (_, selectedIndex) => selectedIndex !== cardIndex
        )
      );

      setDecks((prevSelectedCards) => {
        const newAllUserCards = [...prevSelectedCards];
        if (!isUpdateDeck) {
          let index = newAllUserCards.indexOf(cardIdDeck);
          if (index !== -1) {
            newAllUserCards.splice(index, 1);
            if (!allUserCards[index]["userCardSetIds"].includes(cardIdDeck)) {
              allUserCards[index]["userCardSetIds"].push(cardIdDeck);
            }
            return newAllUserCards;
          }
          isUpdateDeck = true;
        }
        return newAllUserCards;
      });

      setAllUserCards((prevSelectedCards) => {
        const newAllUserCards = [...prevSelectedCards];
        const selectedCard = newAllUserCards[index];

        if (
          (selectedCard.count <= 0 ||
            selectedCard.count < initialState[index].count) &&
          !isUpdated
        ) {
          selectedCard.count += 1;
          isUpdated = true;
        }

        return newAllUserCards;
      });
    }
  };

  const handleSubmitDeck = () => {
    if (decks.length > 40 && decks.length < 60) {
      setDeckName(
        (document.getElementById("deckName") as HTMLInputElement).value
      );
      postDeck.mutate({ userCardSetIds: decks, name: deckName });
      console.log(typeof decks);
      console.log(decks.length);
      console.log(Array.isArray(decks))
    } else {
      console.log(
        "Veuillez ajouter plus de carte ou en retirer (limites : 40-60 cartes)"
      );
      console.log(decks.length);
    }
  };

  return (
    <React.Fragment>
      <h1>Decks</h1>
      <button onClick={() => history.back()}>Revenir en arrière</button>
      <button className="btn" onClick={handleSubmitDeck}>
        Valider mon deck
      </button>
      <input type="text" placeholder="Nom du deck" id="deckName" />
      <div className="flex w-full">
        <div className="flex justify-around items-center flex-wrap w-4/6">
          {!isLoading &&
            !isError &&
            allUserCards.map((card: any, index: number) => {
              return (
                <div key={index}>
                  <h2>{card["item"].cardSet.card.name}</h2>
                  <p>Nombre d'exemplaire : x{card.count}</p>
                  <img
                    onClick={() => {
                      if (
                        card.count > 0 ||
                        countCard[card["item"].cardSet.id] >= 3
                      ) {
                        AddCard(index);
                      }
                    }}
                    style={{
                      opacity:
                        card.count === 0 ||
                        countCard[card["item"].cardSet.id] >= 3
                          ? 0.5
                          : 1,
                    }}
                    src={card["item"].cardSet.card.imageUrlSmall}
                    alt={card["item"].cardSet.card.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="flex flex-wrap w-2/6">
          <h3>
            Nombres de cartes dans le decks : {decks.length} (40 cartes min, 60
            cartes max)
          </h3>
          {decksImages.map((card, index) => {
            return (
              <div key={index}>
                <img
                  onClick={() =>
                    RemoveCard(card[1], false, false, card[0], card[2])
                  }
                  src={card[0].cardSet.card.imageUrlSmall}
                  alt={card[0].cardSet.card.name}
                />
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewDecks;
