import { NavItem } from "@/components/NavItem";
import { useAuth } from "@/helpers/api/hooks";
import React from "react";
import { Link } from "react-router-dom";
import { useTrackEvent, useTrackMouseMovement, useTrackingContext } from "@app/sdk";

const navs = [
    { animatedBackground: "/opening.mp4", path: "/display-cards", poster: "/my_decks.png" },
    { animatedBackground: "/opening.mp4", path: "/duel", poster: "/duel.png" },
    { animatedBackground: "/opening.mp4", path: "/opening", poster: "/booster.png" },
    { animatedBackground: "/opening.mp4", path: "/shop", poster: "/shop.png" },
    { animatedBackground: "/opening.mp4", path: "/settings", poster: "/settings.png" },
]

const Home = () => {
    const { user, isLoggedIn } = useAuth()
    const { clientId, appId } = useTrackingContext()
    const { ref } = useTrackEvent<HTMLButtonElement>({ tag: 'test-btn-home-page', type: 'click', clientId, appId })
    const { ref: mouseRef } = useTrackMouseMovement({ x: 0, y: 0 })
    return (
        <div className="hero items-center min-h-screen text-gray-300">
            <video autoPlay muted loop id="myVideo" className="object-cover w-full h-screen">
                <source src="/bg-home.mp4" type="video/mp4" />
            </video>
            <div className="hero-overlay bg-gray-900 opacity-60" />
            <div className="hero-content text-center flex flex-col">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">
                        Welcome <span className="text-yellow-500">{user.username}</span>
                    </h1>
                </div>
                <div className="grid grid-cols-3 grid-flow-dense gap-8">
                    {navs.map((nav, index) => (
                        <NavItem key={index} animatedBackground={nav.animatedBackground} path={nav.path} poster={nav.poster} />
                    ))}
                </div>
                <button ref={ref}>click me</button>
            </div>
            <div className="h-20 w-full bottom-0 absolute flex px-5 items-center">
                <div className="dropdown dropdown-right dropdown-end">
                    <label tabIndex={0} className="w-16 h-10 p-2 rounded-full bg-white/20 flex items-center justify-center cursor-pointer text-2xl hover:bg-white/30">⚙️</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ml-2">
                        <li><Link to={`/me/${user.username}`}>{user.username}</Link></li>
                        <li><Link to={'/logout'}>Se déconnecter</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;