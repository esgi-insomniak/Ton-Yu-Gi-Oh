interface CustomBoosterProps {
    idBooster: string;
    replaceImage: string;
}

const CustomBooster = ({ idBooster, replaceImage }: CustomBoosterProps) => {
    return (
        <div className="relative z-10 h-64 w-40">
            <div className="absolute inset-0 z-20 rounded-md bg-black/40 backdrop-opacity-90 drop-shadow-lg shadow-lg flex justify-center items-center">
                <div className="absolute top-0 bottom-0 left-0 right-0 rounded-md opacity-0 animate-neon"></div>
                <img src={replaceImage} alt="" className="" />
            </div>
        </div>
    );
};

export default CustomBooster;
