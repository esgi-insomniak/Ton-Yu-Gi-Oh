import OurLogoWithoutRect from "@/assets/insomniak2"
import { CardCoins } from "@/components/Cards"
import { useAuth } from "@/helpers/api/hooks"
import { useMe } from "@/helpers/api/hooks/users"
import { useModal } from "@/helpers/providers/modal"
import React from "react"
import { getScreenSize } from "insomniak-sdk-analytics"
import { useNavigate } from "react-router-dom"
import CustomBooster from "@/components/GameCard/custom-booster"

const Shop = () => {
    const { user } = useAuth()
    const { data: me } = useMe(user.id)
    const { openModal } = useModal()

    const router = useNavigate()

    const Coins = React.useMemo(() => {
        return [
            { id: 'price_1McUUpLgiVx31CexG2tzOzeM', amount: 100, bonus: 0, price: 1 },
            { id: 'price_1McUVKLgiVx31CexMLtVRzxT', amount: 500, bonus: 50, price: 5 },
            { id: 'price_1McUVkLgiVx31CexeVvLIyow', amount: 1000, bonus: 250, price: 10 },
            { id: 'price_1McUWiLgiVx31CexrZUIISVY', amount: 2000, bonus: 500, price: 20 },
            { id: 'price_1McUX2LgiVx31CexqzAF7K2v', amount: 5000, bonus: 1500, price: 50 },
        ]
    }, [])

    const Booster = React.useMemo(() => {
        return [
            { id: '3452345235345', replaceImage: '/test.png', originUrl: 'https://images.ygoprodeck.com/images/sets/HISU.jpg' },
            { id: '3452345235345', replaceImage: '/test-2.png', originUrl: 'https://images.ygoprodeck.com/images/sets/BLVO.jpg' },
        ]
    }, [])

    const handleBuyCoinsModal = () => {
        openModal(
            <div className="flex space-x-2 justify-center items-center w-full h-full">
                {Coins.map((coin, i) => (
                    <CardCoins {...coin} key={i} />
                ))}
            </div>,
            "Acheter des coins",
            false,
            {
                yes: { action: () => { }, title: "" }, no: { action: () => { }, title: "" }
            },
            getScreenSize(window)
        )
    }

    const handlePreviewBoosterModal = (booster: any) => {
        openModal(
            <div className="flex space-x-2 justify-center items-center w-full h-full">
            </div>,
            "Voir les cartes",
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
                <div onClick={() => router('/')}>
                    <OurLogoWithoutRect width="50" height="50" />
                </div>
                <div className="flex items-center space-x-2 bg-black/20 rounded-full pr-4">
                    <div className="space-x-2 rounded-full drop-shadow-2xl bg-orange-50 p-2 flex items-center">
                        <img src="/InsomniakCoins.png" alt="" className="h-7 w-7" />
                        <span>{me?.data.coins || 0}</span>
                    </div>
                    <span className="cursor-pointer text-2xl" onClick={handleBuyCoinsModal}>🏧</span>
                </div>
            </div>
            <div className="grid grid-cols-1 grid-flow-dense gap-5 p-10 text-black">
                {Booster.map((booster, i) => (
                    <div className="bg-white/30 flex p-2 rounded-md h-80 space-x-2" key={i}>
                        <div className="w-1/3 p-2 rounded-md border shadow-inner bg-black/30 flex items-center justify-center">
                            <img src={booster.replaceImage} alt="" className="h-64" />
                        </div>
                        <div className="w-1/3 p-2 rounded-md border shadow-inner bg-black/30 object-cover flex items-center justify-around">
                            <img src={booster.originUrl} alt="" className="h-64 drop-shadow-md shadow-xl" />
                            <CustomBooster idBooster="" replaceImage={booster.replaceImage} />
                        </div>
                        <div className="w-1/3 p-2 rounded-md border shadow-inner bg-black/30 flex flex-col space-y-2 justify-center">
                            <button className="t-btn" onClick={handlePreviewBoosterModal}>Voir les cartes</button>
                            <button className="t-btn">Acheter</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Shop
