import { useConfirmAccount } from "@/helpers/api/hooks/auth";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ConfirmAcc = () => {
    const { token } = useParams<{ token: string }>();
    const confirmAcc = useConfirmAccount();
    const [isConfirmed, setIsConfirmed] = React.useState<boolean>(false);
    const router = useNavigate()

    React.useEffect(() => {
        !!token && confirmAcc.mutate(token, {
            onSuccess: () => {
                setIsConfirmed(true);
                setTimeout(() => {
                    router('/login')
                }, 3000);
            },
            onError: () => setIsConfirmed(false)
        })
    }, [token])

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-1/2 h-1/2 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center space-y-5">
                <h1 className="text-3xl font-bold text-gray-900">Confirmation de compte</h1>
                {isConfirmed ? (
                    <p className="text-green-500">Votre compte a bien été confirmé !</p>
                ) : (
                    <React.Fragment>
                        <p className="text-red-500">Une erreur est survenue lors de la confirmation de votre compte</p>
                        <div className="w-fit">
                            <button onClick={() => router('/login')} className="t-btn">
                                <p>Retour à la page de connexion </p>
                            </button>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default ConfirmAcc;