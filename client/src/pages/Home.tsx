import { NavItem } from "@/components/NavItem";
import { useAuth } from "@/helpers/api/hooks";
import React from "react";

const Home = () => {
    const { user, isLoggedIn } = useAuth()
    const navs = [
        { animatedBackground: "/opening.mp4", path: "/display-cards", poster: "/my_decks.png" },
        { animatedBackground: "/opening.mp4", path: "/duel", poster: "/duel.png" },
        { animatedBackground: "/opening.mp4", path: "/opening", poster: "/booster.png" },
        { animatedBackground: "/opening.mp4", path: "/shop", poster: "/shop.png" },
        { animatedBackground: "/opening.mp4", path: "/settings", poster: "/settings.png" },
    ]
    return (
        <div className="hero items-center min-h-screen text-gray-300">
            <video autoPlay muted loop id="myVideo" className="object-cover w-full h-screen">
                <source src="/bg-home.mp4" type="video/mp4" />
            </video>
            <div className="hero-overlay bg-gray-900 opacity-60" />
            <div className="hero-content text-center flex flex-col">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">
                        Welcome to <span className="text-yellow-500">YuGiOh</span>
                    </h1>
                </div>
                <div className="grid grid-cols-3 grid-flow-dense gap-8">
                    {navs.map((nav, index) => (
                        <NavItem key={index} animatedBackground={nav.animatedBackground} path={nav.path} poster={nav.poster} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;