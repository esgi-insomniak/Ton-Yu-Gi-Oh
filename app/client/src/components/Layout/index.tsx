import OurLogoWithoutRect from "@/assets/insomniak2";
import { useMe } from "@/helpers/api/hooks/users";
import React from "react";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useNavigate()
    const { me } = useMe()
    return (
        <div className="h-screen flex flex-col">
            <div className="h-20 w-full flex bg-white/10 items-center justify-between px-10">
                <div onClick={() => router('/')} className="flex items-center">
                    <div className="cursor-pointer hover:scale-110 duration-150">
                        <OurLogoWithoutRect width="50" height="50" />
                    </div>
                </div>
                <div className="flex items-center space-x-2 bg-black/20 rounded-full w-fit">
                    <div className="space-x-2 rounded-full drop-shadow-2xl bg-orange-50 p-2 flex items-center">
                        <img src="/InsomniakCoins.png" alt="" className="h-7 w-7" />
                        <span className="text-lg text-green-500">{me?.coins || 0}</span>
                    </div>
                </div>
            </div>
            <main className="h-[calc(100%-5rem)]">{children}</main>
        </div>
    );
}

export default Layout;