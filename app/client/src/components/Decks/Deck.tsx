import { userCardSetsType } from "@/helpers/utils/schema/cards/card-set.schema";

interface UserDeckCardsProps {
    deactivate: boolean;
    count: number;
    imageUrl: string;
    addFunction: () => void;
    cardId: string;
}

export const UserDeckCards = ({ deactivate = false, count, imageUrl, addFunction, cardId }: UserDeckCardsProps) => {
    return (

        <div className="indicator flex flex-col items-center hover:scale-95 duration-150 ease-in-out cursor-pointer" key={cardId}>
            <span className="indicator-item badge z-50">{count > 99 ? '99+' : count}</span>
            <img
                src={imageUrl}
                alt=""
                className={`w-32 h-64 rounded-md ${deactivate ? 'opacity-50' : null}`}
                style={{ maxWidth: "100%", height: "auto" }}
                onClick={addFunction}
            />
        </div>
    )
}