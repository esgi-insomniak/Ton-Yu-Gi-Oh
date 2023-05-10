type CardCoinsProps = {
    amount: number;
    price: number;
}

const CardCoins = ({ amount, price }: CardCoinsProps) => {
    return (
        <div className="h-full w-full bg-gray-800 drop-shadow-xl shadow-xl p-2 rounded-lg flex flex-col space-y-5 hover:drop-shadow-2xl">
            <div className="w-full flex justify-center items-center p-2">
                <img src="/InsomniakCoins.png" alt="" className="h-20 w-20" />
            </div>
            <div className="space-y-2 flex flex-col">
                <span className="mx-auto text-2xl font-extrabold text-white">{amount} coins</span>
                <button className="t-btn">{price} €</button>
            </div>
        </div >
    )
}

export { CardCoins }