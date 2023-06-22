import { CardCoins } from "@/components/Cards"
import { useAuth } from "@/helpers/api/hooks"
import { useMe } from "@/helpers/api/hooks/users"
import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useBuyBooster, useConfirmPayment, useGetFirstGenerationBooster, useRedeemPromoCode } from "@/helpers/api/hooks/shop"
import { useAlert } from "@/helpers/providers/alerts/AlertProvider"
import { BoosterApiResponse } from "@/helpers/types/shop"
import { useGetBoosterById } from "@/helpers/api/hooks/cards/card-set.hook"
import useModal from "@/helpers/api/hooks/modal"
import { Modal } from "@/components/Modal"
import { PreviewSets } from "@/pages/Shop/previewSets"
import { GameCardProvider } from "@/helpers/providers/cards/cardsProvider"
import { Input } from "@/components/Input"

const Shop = () => {
    const { user } = useAuth()
    const { refetch } = useMe(user.id)
    const { toggle: buyCoinsToggle, isShowing: buyCoinsShowing } = useModal()
    const { toggle: previewBoosterToggle, isShowing: previewBoosterShowing } = useModal()
    const { toggle: confirmBuyBoosterToggle, isShowing: confirmBuyBoosterShowing } = useModal()
    const { sessionId } = useParams<{ sessionId: string }>()
    const { data: boosters } = useGetFirstGenerationBooster()
    const { setId, booster } = useGetBoosterById()

    const confirmPayment = useConfirmPayment()
    const alert = useAlert()
    const buyBooster = useBuyBooster()
    const router = useNavigate()
    const redeemCode = useRedeemPromoCode()

    const [selectedBooster, setSelectedBooster] = React.useState<BoosterApiResponse | null>(null)

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
                refetch()
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

    const handleConfirmBuyBooster = (booster: BoosterApiResponse) => {
        confirmBuyBoosterToggle()
        setSelectedBooster(booster)
    }

    const handleSubmitPromoCode = (e: React.BaseSyntheticEvent) => {
        e.preventDefault()
        redeemCode.mutate(e.target[0].value.toUpperCase(), {
            onSuccess: (res) => {
                if (res.data.rewardCoinsAmount !== null) {
                    alert?.success(`Vous avez bien reçu ${res.data.rewardCoinsAmount} Insomniak Coins !`)
                    refetch()
                    // clear input
                    e.target[0].value = ''
                } else {
                    alert?.success(`Vous avez bien reçu le booster : ${res.data.rewardSet?.name} !`)
                    e.target[0].value = ''
                }
            },
            onError: (err) => alert?.error("Le code n'existe pas ou a déjà été utilisé")
        })
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
            <div className="h-[calc(100vh-5rem)] flex justify-center items-center p-12 space-x-12">
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
                                        onClick={() => handleConfirmBuyBooster(booster)} className="t-btn min-w-[10rem] hover:bg-yellow-500"
                                    >
                                        <span className="font-bold text-red-500">- 100</span>
                                        <img src="/InsomniakCoins.png" alt="" className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="flex w-1/4 h-full justify-start flex-col items-center space-y-7">
                    <div className="btn" onClick={buyCoinsToggle}>Acheter des Insomniak Coins</div>
                    <form className="w-full bg-white p-5 rounded-lg space-y-3" onSubmit={handleSubmitPromoCode}>
                        <span className="w-full flex justify-center">Code Promos</span>
                        <Input label="Ton code" name="code" uppercase />
                        <div className="w-full flex justify-end">
                            <button className="btn" type="submit">Valider</button>
                        </div>
                    </form>
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
                content={<GameCardProvider><PreviewSets cardSets={booster?.data?.data} /></GameCardProvider>}
            />
            <Modal
                isShowing={confirmBuyBoosterShowing}
                toggle={confirmBuyBoosterToggle}
                title="Confirmation d'achat"
                yesNo
                yesNoAction={[
                    { text: 'Annuler', action: confirmBuyBoosterToggle, type: 'no' },
                    { text: 'Acheter', action: () => handleBuyBooster(selectedBooster!), type: 'yes' }
                ]}
            />
        </React.Fragment >
    )
}

export default Shop
