import { MdLock } from "react-icons/md";

interface UserDeckCardsProps {
    deactivate: boolean;
    banned: boolean;
    count: number;
    imageUrl: string;
    addFunction: () => void;
    cardId: string;
}

export const UserDeckCards = ({ deactivate = false, banned = false, count, imageUrl, addFunction, cardId }: UserDeckCardsProps) => {
    return (
        <div className="indicator w-full h-auto hover:scale-95 duration-150 ease-in-out cursor-pointer" key={cardId}>
            <div className="w-full h-full relative overflow-hidden flex justify-center" onClick={() => !banned && addFunction()}
            >
                <img
                    src={imageUrl}
                    alt=""
                    className={`rounded-md ${deactivate || banned ? 'opacity-50' : null}`}
                />
                <span className="absolute right-4 top-3 indicator-item badge">{count > 99 ? '99+' : count}</span>
                <div className="absolute top-0 h-full w-full flex justify-center">
                    {
                        banned && (
                            <MdLock className="h-auto w-1/3 text-red-500 group-hover:text-white" />
                        )
                    }
                </div>
            </div>
        </div>
    )
}