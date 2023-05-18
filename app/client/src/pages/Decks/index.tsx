import React from "react";
import { useAuth } from "@/helpers/api/hooks";
import { useGetAllUserDecks } from "@/helpers/api/hooks/decks";
import Deck from "@/components/Decks/Deck";

const Decks = () => {
  const { user } = useAuth();
  const { data, isLoading, isError } = useGetAllUserDecks(user?.id);
  return (
    <React.Fragment>
      <h1 className="m-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Création de mes decks</h1>
      <button onClick={() => history.back()} className="btn m-4">
        Revenir en arrière
      </button>

      <div className="flex justify-around items-start mt-5">
        {data &&
          data.data.length > 0 &&
          !isLoading &&
          !isError &&
          data.data.map((deck: any, index: number) => {
            return (
                <Deck deck={deck} key={index} />
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
