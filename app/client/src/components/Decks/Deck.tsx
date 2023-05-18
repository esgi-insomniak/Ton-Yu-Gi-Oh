import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { useDeleteUserDeck } from "@/helpers/api/hooks/decks";

const Deck = (deck: any) => {
  const myDeck = deck.deck;
  const deleteUserDeck = useDeleteUserDeck();

  const handleDeleteDeck = (id: string) => () => {
    if (confirm("Etes vous sur de vouloir supprimer ce deck ?")) {
      console.log(id);
      deleteUserDeck.mutate(id);
    }
  };

  React.useEffect(() => {
    if (deleteUserDeck.isSuccess) {
      window.location.reload();
    } else if (deleteUserDeck.isError) {
      alert(deleteUserDeck.error);
    }
  }, [deleteUserDeck]);

  return (
    <React.Fragment>
      <div className="h-full">
        <div className="h-full">
          <div className="card card-compact bg-base-300 shadow-xl">
            <figure>
              <img
                src={myDeck.cardSets[0].cardSet.card.imageUrlSmall}
                alt={`Deck ${myDeck.name}`}
                className="h-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-center">{myDeck.name}</h2>
              <div className="flex justify-between items-center">
                <button
                  className="btn btn-error"
                  onClick={handleDeleteDeck(myDeck.id)}
                >
                  <BsFillTrashFill />
                </button>
                <a href={`/decks/edit/${myDeck.id}`} className="btn btn-primary">
                  <AiFillEye />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Deck;
