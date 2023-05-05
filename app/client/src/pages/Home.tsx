import { NavItem } from "@/components/NavItem";
import { useAuth } from "@/helpers/api/hooks";
import { ROLES } from "@/helpers/utils/enum/roles";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const { user } = useAuth()

    const navs = React.useMemo(() => [
        { animatedBackground: "/opening.mp4", path: "/display-cards", poster: "/bg-nav-items.png", title: "Mes decks", condition: user.roles.includes(ROLES.USER) },
        { animatedBackground: "/opening.mp4", path: "/collection", poster: "/bg-nav-items.png", title: "Collection", condition: user.roles.includes(ROLES.USER) },
        { animatedBackground: "/opening.mp4", path: "/duel", poster: "/bg-nav-items.png", title: "Duel", condition: user.roles.includes(ROLES.USER) },
        { animatedBackground: "/opening.mp4", path: "/opening", poster: "/bg-nav-items.png", title: "Booster", condition: user.roles.includes(ROLES.USER) },
        { animatedBackground: "/opening.mp4", path: "/shop", poster: "/bg-nav-items.png", title: "Boutique", condition: user.roles.includes(ROLES.USER) },
        { animatedBackground: "/opening.mp4", path: "/admin", poster: "/bg-nav-items.png", title: "Admin", condition: user.roles.includes(ROLES.ADMIN) },
    ], [user.roles])

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
                    {navs.filter(auth => auth.condition === true).map((nav, index) => (
                        <NavItem
                            key={index}
                            title={nav.title}
                            imageUrl={nav.poster}
                            videoUrl={nav.animatedBackground}
                            linkUrl={nav.path}
                        />
                    ))}
                </div>
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