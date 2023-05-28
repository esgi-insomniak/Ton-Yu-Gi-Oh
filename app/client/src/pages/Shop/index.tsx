import OurLogoWithoutRect from "@/assets/insomniak2"
import { CardCoins } from "@/components/Cards"
import { useAuth } from "@/helpers/api/hooks"
import { useMe } from "@/helpers/api/hooks/users"
import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useBuyBooster, useConfirmPayment, useGetFirstGenerationBooster } from "@/helpers/api/hooks/shop"
import { useAlert } from "@/helpers/providers/alerts/AlertProvider"
import { BoosterApiResponse } from "@/helpers/types/shop"
import { useGetBoosterById } from "@/helpers/api/hooks/cards/card-set.hook"
import useModal from "@/helpers/api/hooks/modal"
import { Modal } from "@/components/Modal"
import { PreviewSets } from "@/pages/Shop/previewSets"

const Shop = () => {
    const { user } = useAuth()
    const { data: me } = useMe(user.id)
    const { toggle: buyCoinsToggle, isShowing: buyCoinsShowing } = useModal()
    const { toggle: previewBoosterToggle, isShowing: previewBoosterShowing } = useModal()
    const { sessionId } = useParams<{ sessionId: string }>()
    const { data: boosters } = useGetFirstGenerationBooster()
    const { setId, booster } = useGetBoosterById()

    const confirmPayment = useConfirmPayment()
    const alert = useAlert()
    const buyBooster = useBuyBooster()
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

    const handleBuyBooster = (booster: BoosterApiResponse) => {
        buyBooster.mutate({ amount: 1, boosterId: booster.id }, {
            onSuccess: (res) => {
                alert?.success(`Vous avez bien acheté le booster ${booster.name} !`)
            },
            onError: (err) => {
                alert?.error('Une erreur est survenue lors de l\'achat')
            }
        })
    }

    const handlePreviewBooster = (boosterId: string) => {
        setId(boosterId)
        previewBoosterToggle()
    }

    React.useEffect(() => {
        if (sessionId) {
            confirmPayment.mutate(sessionId, {
                onSuccess: (res) => {
                    router('/shop')
                    alert?.success(`Vous avez bien acheté ${res.data.coins} coins !`)
                },
                onError: (err) => {
                    alert?.error('Une erreur est survenue lors de l\'achat')
                    router('/shop')
                }
            })
        }
    }, [sessionId])

    return (
        <React.Fragment>
            <div>
                <div className="h-20 w-full flex bg-white/10 items-center justify-between px-10">
                    <div onClick={() => router('/')}>
                        <OurLogoWithoutRect width="50" height="50" />
                    </div>
                    <div className="flex items-center space-x-2 bg-black/20 rounded-full w-fit">
                        <div className="space-x-2 rounded-full drop-shadow-2xl bg-orange-50 p-2 flex items-center">
                            <img src="/InsomniakCoins.png" alt="" className="h-7 w-7" />
                            <span className="text-lg text-green-500">{me?.data.coins || 0}</span>
                        </div>
                        <span className="cursor-pointer text-2xl w-10" onClick={buyCoinsToggle}>🏧</span>
                    </div>
                </div>
                <div className="h-[calc(100vh-5rem)] flex justify-center items-center p-12">
                    <div className="grid grid-cols-5 gap-8 w-3/4">
                        {
                            boosters?.data?.map((booster) => (
                                <div key={booster.code} className="h-full flex flex-col w-full relative group">
                                    <img src={booster.image} alt={booster.name} className="h-full w-full rounded drop-shadow-lg shadow-lg " />
                                    <div className="hidden group-hover:flex justify-center items-center flex-col w-full h-full group-hover:absolute bg-black/20">
                                        <div onClick={() => handlePreviewBooster(booster.id)} className="t-btn min-w-[10rem]">
                                            Voir les cartes
                                        </div>
                                        <div
                                            onClick={() => handleBuyBooster(booster)} className="t-btn min-w-[10rem] hover:bg-yellow-500"
                                        >
                                            <span className="font-bold text-red-500">- 100</span>
                                            <img src="/InsomniakCoins.png" alt="" className="h-5 w-5" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Modal
                isShowing={buyCoinsShowing}
                toggle={buyCoinsToggle}
                title="Acheter des coins"
                content={
                    <div className="flex space-x-2 justify-center items-center w-full h-full">
                        {Coins.map((coin, i) => (
                            <CardCoins {...coin} key={i} />
                        ))}
                    </div>
                }
            />
            <Modal
                isShowing={previewBoosterShowing}
                toggle={previewBoosterToggle}
                title="Aperçu du booster"
                content={<PreviewSets cardSets={booster?.data?.data} />
                }
            />
        </React.Fragment>
    )
}

export default Shop
