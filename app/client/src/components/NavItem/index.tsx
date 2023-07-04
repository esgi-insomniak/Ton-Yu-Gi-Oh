import React from "react";
import { Link } from "react-router-dom";
import { NavItemProps } from "@/helpers/types/common";

export const NavItem: React.FC<NavItemProps> = ({
    title,
    videoUrl,
    linkUrl,
    isButton,
    action,
}) => {

    return (
        <div
            className="relative rounded-lg overflow-hidden w-96 h-64 cursor-pointer hover:scale-105 transition-all duration-300 drop-shadow-2xl shadow-2xl bg-slate-50/20 backdrop:opacity-70 hover:border-4 hover:border-white group"
        >
            {isButton ?
                <div onClick={action} className="flex justify-center items-center relative h-full group-hover:backdrop-brightness-50">
                    <div className="relative z-10 flex justify-center items-center h-full">
                        <h2 className="text-4xl font-bold uppercase tracking-[0.5rem] text-slate-200">{title}</h2>
                    </div>
                    <div className="absolute inset-0 z-0">
                        <img src={videoUrl} alt={videoUrl} className={`object-cover w-full h-full hidden group-hover:block`} />
                    </div>
                </div>
                :
                <Link to={linkUrl}>
                    <div className="relative z-10 flex justify-center items-center h-full group-hover:backdrop-brightness-50">
                        <h2 className="text-4xl font-bold uppercase tracking-[0.5rem] text-slate-200">{title}</h2>
                    </div>
                    <div className="absolute inset-0 z-0">
                        <img src={videoUrl} alt={videoUrl} className={`object-cover w-full h-full hidden group-hover:block`} />
                    </div>
                </Link>
            }
        </div>
    );
}