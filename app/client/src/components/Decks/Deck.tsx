import { userCardSetsType } from "@/helpers/utils/schema/cards/card-set.schema";

interface UserDeckCardsProps {
    count: number;
    imageUrl: string;
    addFunction: () => void;
    cardId: string;
}

export const UserDeckCards = ({ count, imageUrl, addFunction, cardId }: UserDeckCardsProps) => {
    return (

        <div className="indicator flex flex-col items-center hover:scale-95 duration-150 ease-in-out cursor-pointer" key={cardId}>
            <span className="indicator-item badge z-50">{count > 99 ? '99+' : count}</span>
            <img
                src={imageUrl}
                alt=""
                className={`w-32 h-64 rounded-md ${count === 0 ? 'opacity-50' : ''}}`}
                style={{ maxWidth: "100%", height: "auto" }}
                onClick={addFunction}
            />
        </div>
    )
}