import React from "react";
import { useAuth } from "@/helpers/api/hooks";
import { useGetAllUserDecks } from "@/helpers/api/hooks/decks";

const Decks = () => {
  const { user } = useAuth();
  const { data, isLoading, isError } = useGetAllUserDecks(user?.id);
  return (
    <React.Fragment>
      <h1>Mes decks</h1>
      <button onClick={() => history.back()} className="btn">
        Revenir en arrière
      </button>

      <div className="flex">
        {data &&
          data.data.length > 0 &&
          !isLoading &&
          !isError &&
          data.data.map((deck: any, index: number) => {
            return (
              <div key={index} className="flex flex-col">
                <a href="#">
                  <div className="flex flex-col justify-center items-center">
                    <img
                      src={deck.cardSets[0].cardSet.card.imageUrlSmall}
                      alt={`Deck ${deck.name}`}
                    />
                    <p>{deck.name}</p>
                  </div>
                </a>
              </div>
            );
          })}
        <a href="/decks/new" className="">
          <div className="border-dashed border-2 border-sky-500 h-72 flex flex-col justify-center items-center px-3">
            <span className="bg-sky-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mb-2 px-3 transform hover:scale-110 transition duration-300">
              +
            </span>
            <p className="text-center text-sm font-semibold">
              Créé un nouveaux decks
            </p>
          </div>
        </a>
      </div>
    </React.Fragment>
  );
};

export default Decks;
