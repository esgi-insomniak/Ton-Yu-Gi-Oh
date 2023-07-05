import { CardCoins } from "@/components/Cards"
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
    const { refetch } = useMe()
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
    const [amount, setAmount] = React.useState<{ [boosterId: string]: number }>({})

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
        buyBooster.mutate({ amount: amount[booster.id] !== undefined ? amount[booster.id] : 1, boosterId: booster.id }, {
            onSuccess: (res) => {
                alert?.success(`Vous avez bien acheté le booster ${booster.name} !`)
                confirmBuyBoosterToggle()
                refetch()
                amount[booster.id] = 1
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
                    refetch()
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
            <div className="lg:flex-row flex-col flex justify-center items-center p-12 lg:space-y-0 lg:space-x-12 space-y-12 space-x-0">
                <div className="lg:w-3/4 w-full grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-8 overflow-y-auto max-h-[600px]">
                    {
                        boosters?.data?.map((booster) => (
                            <div key={booster.code} className="h-full flex flex-col w-full relative group">
                                <img src={booster.image} alt={booster.name} className="h-full w-full rounded drop-shadow-lg shadow-lg " />
                                <div className="hidden group-hover:flex justify-center items-center flex-col w-full h-full group-hover:absolute bg-black/50 space-y-5">
                                    <div onClick={() => handlePreviewBooster(booster.id)} className="btn glass btn-sm text-white">
                                        Voir les cartes
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <div
                                            onClick={() => handleConfirmBuyBooster(booster)} className="btn glass btn-sm hover:bg-yellow-600 flex space-x-2"
                                        >
                                            <span className="font-bold text-slate-200 text-xs">
                                                Acheter {amount[booster.id] ? amount[booster.id] : 1} pacquets
                                            </span>
                                        </div>
                                        <div className="flex space-x-1 w-full">
                                            <button className="btn hover:btn-error text-red-500 hover:text-white btn-sm min-w-[50%]" onClick={() => setAmount({ ...amount, [booster.id]: amount[booster.id] ? amount[booster.id] - 1 : 1 })} disabled={amount[booster.id] ? amount[booster.id] <= 0 : false}>- 1</button>
                                            <button className="btn hover:btn-success text-green-500 hover:text-white btn-sm min-w-[50%]" onClick={() => setAmount({ ...amount, [booster.id]: amount[booster.id] ? amount[booster.id] + 1 : 1 })} disabled={
                                                amount[booster.id] ? amount[booster.id] >= 100 : false
                                            }>+ 1</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="lg:w-1/4 w-full flex justify-start flex-col items-center space-y-7">
                    <div className="btn" onClick={buyCoinsToggle}>Acheter des Insomniak Coins</div>
                    <form className="w-full bg-white p-5 rounded-lg space-y-3" onSubmit={handleSubmitPromoCode}>
                        <span className="text-center">Code Promos</span>
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
                text={`Êtes-vous sûr de vouloir acheter ${amount[selectedBooster?.id!]} ${selectedBooster?.name} pour ${amount[selectedBooster?.id!] * 100} Insomniak Coins ?`}
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
