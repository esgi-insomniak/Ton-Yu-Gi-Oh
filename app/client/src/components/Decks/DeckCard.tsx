import React from "react";

const DeckCard: React.FC<{
  decks: any;
  decksImages: any;
  removeCard: any;
}> = ({ decks, decksImages, removeCard }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [decksImages]);

  return (
    <React.Fragment>
      <div
        className="w-3/12 mx-auto my-5 border-4 border-sky-500 rounded-md p-2"
        style={{ position: "sticky", top: "0", height: "90vh" }}
      >
        <div className="mx-3 text-center">
          <h3 className="text-xl">
            Nombres de cartes dans le decks :{" "}
            <span className="font-bold">{decks.length}</span>
          </h3>
          <p className="font-bold">(40 cartes min, 60 cartes max)</p>
        </div>
        <div
          className="flex flex-wrap overflow-auto"
          style={{ maxHeight: "80vh" }}
          ref={containerRef}
        >
          {decksImages.map((card: any, index: number) => {
            return (
              <div key={index} className="my-3 mx-auto">
                <img
                  onClick={() =>
                    removeCard(card[1], false, false, card[0], card[2])
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

export default DeckCard;
