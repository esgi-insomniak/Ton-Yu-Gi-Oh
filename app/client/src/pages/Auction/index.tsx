import { StatProps, Stats } from "@/components/Stats";
import { Timer } from "@/components/Timer";
import moment from "moment";
import React from "react";

const Auction = () => {

    const AuctionStats: StatProps[] = [
        { title: "Total des enchères", value: "0.00", desc: "ISM", icon: <img src="/InsomniakCoins.png" alt="" className="h-7 w-7" /> },
        { title: "Total de click", value: "0", desc: "", icon: <i className="fas fa-gavel"></i> },
        { title: "Participant", value: "25", desc: "utilisateurs", icon: <i className="fas fa-clock"></i> },
    ]

    // React.useEffect(() => {
    //     if (cardSetsResponse?.data === undefined) return;
    //     const apiCardSets = cardSetsResponse.data.map<IGameCard>((cardSet) => {
    //         return {
    //             ...cardSet,
    //             isActive: false,
    //             isHidden: false,
    //             isFocused: false,
    //             isLoaded: false,
    //             isDraggable: false,
    //             canPop: true,
    //             displayCardInfoOnPop: true,
    //             popScale: 1.75,
    //             canFlip: false,
    //             canActivate: true,
    //             canInteract: true,
    //         }
    //     })
    //     setCardSets(apiCardSets)
    // }, [cardSetsResponse])

    return (
        <div className="w-full h-full flex flex-col p-5">
            <div className="lg:flex-row lg:space-y-0 md:flex-col md:space-y-5 space-y-5 flex-col w-full flex items-center justify-between">
                <Stats data={AuctionStats} />
                <div className="h-fit w-fit flex flex-col justify-center">
                    <Timer
                        hours={moment().format('HH')}
                        minutes={moment().format('mm')}
                        seconds={moment().format('ss')}
                    />
                </div>
            </div>
            <div className="w-full h-full flex">
                <div className="flex xl:w-3/4 md:w-full w-full">

                </div>
                <div className="flex xl:w-1/4 md:w-full w-full xl:p-5 md:p-0 p-0 flex-col space-y-5 justify-end xl:items-center">
                    <div className="flex flex-col h-fit space-y-3 overflow-y-auto">
                        {/** Laster Bider */}
                        {[...Array(5)].map((x, i) => 
                            <div className="bg-white/30 rounded-lg shadow-xl p-5 flex space-x-2">
                                <p className="text-green-500 xl:block hidden">Frozoxadazd :</p>
                                <div className="space-x-2 flex">
                                    <p className="text-yellow-600">100</p>
                                    <p>ISM</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <button className="btn btn-success">
                        enchérir de  <span className="text-yellow-600 mx-1 font-bold">100</span> ISM
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Auction;