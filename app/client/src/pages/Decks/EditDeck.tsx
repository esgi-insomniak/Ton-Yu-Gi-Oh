import React from "react";
import { useAuth } from "@/helpers/api/hooks";
import {
  useGetAllMyUserCardSets,
  getAllCardInDoubleAndIncrement,
} from "@/helpers/api/hooks/users";
import { useGetCardDeckUser } from "@/helpers/api/hooks/decks";
import UserCardSets from "@/components/Decks/UserCardSets";
import DeckCard from "@/components/Decks/DeckCard";
import { useParams } from "react-router-dom";
import { set } from "react-hook-form";

const EditDeck = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { data, isLoading, isError } = useGetAllMyUserCardSets(user?.id);
  const {
    data: dataDeck,
    isLoading: isLoadingDeck,
    isError: isErrorDeck,
  } = useGetCardDeckUser(id);
  const [allUserCards, setAllUserCards] = React.useState<Array<any>>([]);
  const [decksImages, setDecksImages] = React.useState<
    Array<[any, number, any]>
  >([]);
  const [decks, setDecks] = React.useState<Array<string>>([]);
  const [countCard, setCountCard] = React.useState<any>({});
  const [initialState, setInitialState] = React.useState<Array<any>>([]);
  const [deckName, setDeckName] = React.useState("");

  if (!isLoading && !isError && data) {
    if (allUserCards.length === 0) {
      setAllUserCards(getAllCardInDoubleAndIncrement(data));
    }
    if (initialState.length === 0) {
      setInitialState(getAllCardInDoubleAndIncrement(data));
    }
  }

  if (!isLoadingDeck && !isErrorDeck && dataDeck) {
    if (decksImages.length === 0) {
      setDecksImages(dataDeck.data.cardSets.map((card: any) => [card, 0, 0]));
    }
    if (decks.length === 0) {
      setDecks(dataDeck.data.cardSets.map((card: any) => card.id));
    }
    if (deckName === "") {
      setDeckName(dataDeck.data.name);
    }
  }
  console.log(allUserCards);
  console.log(countCard);

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
      //postDeck.mutate({ userCardSetIds: decks, name: deckName });
    } else {
      console.log(
        "Veuillez ajouter plus de carte ou en retirer (limites : 40-60 cartes)"
      );
      console.log(decks.length);
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-col w-1/3">
        <div className="flex justify-between my-3 mx-3">
          <button onClick={() => history.back()} className="btn">
            Revenir en arrière
          </button>
          <button className="btn" onClick={handleSubmitDeck}>
            Mettre à jour mon deck
          </button>
        </div>
        <input
          type="text"
          placeholder="Nom du deck"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-3 my-3"
          id="deckName"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
        />
      </div>
      <div className="flex justify-between w-full">
        <UserCardSets
          countCard={countCard}
          addCard={AddCard}
          allUserCards={allUserCards || []}
          isLoading={isLoading}
          isError={isError}
        />
        <DeckCard
          decks={decks}
          decksImages={decksImages}
          removeCard={RemoveCard}
        />
      </div>
    </React.Fragment>
  );
};

export default EditDeck;
