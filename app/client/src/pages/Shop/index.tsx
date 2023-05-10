import OurLogoWithoutRect from "@/assets/insomniak2"
import { CardCoins } from "@/components/Cards"
import { useAuth } from "@/helpers/api/hooks"
import { useMe } from "@/helpers/api/hooks/users"
import { useModal } from "@/helpers/providers/modal"
import React from "react"

const Shop = () => {
    const { user } = useAuth()
    const { data: me } = useMe(user.id)
    const { openModal } = useModal()

    const Coins = React.useMemo(() => {
        return [
            { id: 1, name: 1000, price: 10 },
            { id: 2, name: 2000, price: 20 },
            { id: 3, name: 3000, price: 30 },
            { id: 4, name: 4000, price: 40 },
            { id: 5, name: 5000, price: 50 },
        ]
    }, [])

    const handleBuyCoinsModal = () => {
        openModal(
            <div className="flex justify-around space-x-5">
                {Coins.map((coin, i) => (
                    <CardCoins price={coin.price} amount={coin.name} />
                ))}
            </div>,
            "Acheter des coins",
            false,
            {
                yes: { action: () => { }, title: "" }, no: { action: () => { }, title: "" }
            },
            "xl"
        )
    }
    return (
        <div>
            <div className="h-20 w-full flex bg-white/10 items-center justify-between px-10">
                <OurLogoWithoutRect width="50" height="50" />
                <div className="flex items-center space-x-2 bg-black/20 rounded-full pr-4">
                    <div className="space-x-2 rounded-full drop-shadow-2xl bg-orange-50 p-2 flex items-center">
                        <img src="/InsomniakCoins.png" alt="" className="h-7 w-7" />
                        <span>Coins</span>
                        <span>{me?.coins || 0}</span>
                    </div>
                    <span className="" onClick={handleBuyCoinsModal}>🛒</span>
                </div>
            </div>
            <div>
                <div></div>
            </div>
        </div>
    )
}

export default Shop
