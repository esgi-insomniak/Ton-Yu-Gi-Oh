import { usePayment } from "@/helpers/api/hooks/shop";
import { useAlert } from "@/helpers/providers/alerts/AlertProvider";

type CardCoinsProps = {
    amount: number;
    price: number;
    id: string
    bonus: number;
}

const CardCoins = ({ amount, price, id, bonus }: CardCoinsProps) => {

    const sendPayement = usePayment()
    const alert = useAlert()

    const handleStripe = () => {
        sendPayement.mutate(id, {
            onSuccess: (data) => {
                window.location.href = data.data.url
            },
            onError: (err) => {
                alert?.error('Une erreur est survenu lors du paiement')
            }
        })
    }

    return (
        <div
            className="flex-shrink-0 relative overflow-hidden bg-yellow-500 rounded-lg max-w-xs shadow-lg cursor-pointer hover:scale-95 duration-150"
            onClick={handleStripe}
        >
            <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{ transform: 'scale(1.5)', opacity: 0.1 }}>
                <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="black" />
                <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="black" />
            </svg>
            <div
                className="bg-white/20 rounded-t-md w-full text-gray-700 font-bold px-3 py-2 leading-none flex justify-center flex-col items-center drop-shadow-md"
            >
                <span className="text-lg text-slate-100">{amount}</span>
                <span className="text-xs text-green-500">{bonus} bonus</span>
            </div>
            <div className="relative pt-5 px-10 flex items-center justify-center">
                <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={{ background: 'radial-gradient(black, transparent 60%)', transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)', opacity: 0.2 }}></div>
                <img className="relative w-32" src="/InsomniakCoins.png" alt="" />
            </div>
            <div className="relative text-white px-6 pb-6 mt-6">
                <span
                    className="home__title w-full flex justify-center items-center font-bold text-2xl"
                >
                    {price} €
                </span>
            </div>
        </div>
    )
}

export { CardCoins }