import { INavItemProps } from "@/helpers/types/common"
import React from "react"
import { useNavigate } from "react-router-dom"

export const NavItem = ({ animatedBackground, path, poster }: INavItemProps) => {
    const router = useNavigate()
    return (
        <React.Fragment>
            <div className="t-nav-items flex items-center justify-center relative backdrop-opacity-10" onClick={() => router(path)}>
                <video
                    autoPlay={false}
                    muted
                    loop
                    onMouseOver={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                        e.currentTarget.pause()
                        // set poster image
                        e.currentTarget.currentTime = 0
                        e.currentTarget.load()
                    }}
                    id="myVideo"
                    className="object-cover w-full h-full rounded-md"
                    poster={poster}
                >
                    <source src={animatedBackground} type="video/mp4" />
                </video>
            </div>
        </React.Fragment>
    )
}