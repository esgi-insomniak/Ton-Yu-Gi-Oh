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
    const [isPlaying, setIsPlaying] = React.useState(false);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const handleMouseOver = () => {
        if (videoRef.current) {
            setIsPlaying(true);
            videoRef.current.play();
        }
    };

    const handleMouseOut = () => {
        if (videoRef.current) {
            setIsPlaying(false);
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div
            className="lg:w-96 lg:h-64 w-60 h-40 relative rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 drop-shadow-2xl shadow-2xl bg-slate-50/20 backdrop:opacity-70 hover:border-4 hover:border-white"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            {isButton ?
                <div onClick={action} className="flex justify-center items-center relative h-full">
                    <div className="relative z-10 flex justify-center items-center h-full">
                        <h2 className="lg:text-4xl text-xl font-bold uppercase tracking-[0.5rem] text-slate-200">{title}</h2>
                    </div>
                    <div className="absolute inset-0 z-0">
                        <video
                            ref={videoRef}
                            muted
                            loop
                            playsInline
                            className={`object-cover w-full h-full ${isPlaying ? 'block' : 'hidden'}`}
                        >
                            <source src={videoUrl} type="video/mp4" />
                        </video>
                    </div>
                </div>
                :
                <Link to={linkUrl}>
                    <div className="relative z-10 flex justify-center items-center h-full">
                        <h2 className="lg:text-4xl text-xl font-bold uppercase tracking-[0.5rem] text-slate-200">{title}</h2>
                    </div>
                    <div className="absolute inset-0 z-0">
                        <video
                            ref={videoRef}
                            muted
                            loop
                            playsInline
                            className={`object-cover w-full h-full ${isPlaying ? 'block' : 'hidden'}`}
                        >
                            <source src={videoUrl} type="video/mp4" />
                        </video>
                    </div>
                </Link>
            }
        </div>
    );
}