import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import {
  useDeleteUserDeck,
  useGetCardDeckUser,
} from "@/helpers/api/hooks/decks";
import { useAlert } from "@/helpers/providers/alerts/AlertProvider";
import { DeckProps } from "@/helpers/types/decks";

const Deck: React.FC<
  DeckProps & {
    togglePreviewDeck: (myDeck: string) => void;
    setId: (id: string | null) => void;
  }
> = ({ deck, togglePreviewDeck, setId }) => {
  const myDeck = deck;
  const deleteUserDeck = useDeleteUserDeck();
  const alert = useAlert();

  const handleDeleteDeck = (id: string) => () => {
    if (confirm("Etes vous sur de vouloir supprimer ce deck ?")) {
      deleteUserDeck.mutate(id);
      alert?.success("Deck supprimé avec succès");
    }
  };

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
                <div className="btn btn-primary" onClick={() => togglePreviewDeck(myDeck.id)}>
                  <AiFillEye />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Deck;
