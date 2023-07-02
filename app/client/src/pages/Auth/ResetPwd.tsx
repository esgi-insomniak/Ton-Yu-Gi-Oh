import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/Input";
import { MdAlternateEmail } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/helpers/utils/schema/Auth";
import { useRequestResetPassword, useRequestResetPasswordMail } from "@/helpers/api/hooks/auth";
import { useAlert } from "@/helpers/providers/alerts/AlertProvider";

const SendEmailForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<{ email: string }>();
    const sendEmail = useRequestResetPasswordMail()
    const alert = useAlert()
    const router = useNavigate()

    const onSubmit = (data: { email: string }) => {
        sendEmail.mutate(data.email, {
            onSuccess: () => {
                alert?.success("Un email vous a été envoyé !")
                router("/login")
            },
            onError: (err) => {
                alert?.error('Une erreur est survenu lors de l\'envoi de l\'email')
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
            <Input
                label="Email"
                placeholder="Insomniak"
                name="email"
                register={register}
                error={errors.email?.message}
                icons={<MdAlternateEmail />}
            />
            <button
                type="submit"
                className="t-btn"
            >
                Envoyer
            </button>
            <p onClick={() => router("/login")} className="text-center underline cursor-pointer">Retour à la page de connexion</p>
        </form>
    )
}

const ResetPwdForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<{ password: string, confirmPassword: string }>({
        resolver: zodResolver<typeof resetPasswordSchema>(resetPasswordSchema)
    });
    const resquestResetPassword = useRequestResetPassword()
    const alert = useAlert()
    const router = useNavigate()
    const { token } = useParams<{ token: string }>();

    const onSubmit = (data: { password: string, confirmPassword: string }) => {
        !!token && data.password === data.confirmPassword && resquestResetPassword.mutate({ password: data.password, token }, {
            onSuccess: () => {
                alert?.success("Votre mot de passe a bien été réinitialisé !")
                router("/login")
            },
            onError: (err) => {
                alert?.error('Une erreur est survenu lors de la réinitialisation de votre mot de passe')
            }
        })
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-1/2 h-1/2 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center space-y-5">
                <h1 className="text-3xl font-bold text-gray-900">Réinitialiser votre mot de passe</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-flow-dense grid-cols-2 gap-5">
                    <Input
                        label="Nouveau mot de passe"
                        placeholder="Ex: Validez moi !"
                        name="password"
                        register={register}
                        error={errors.password?.message}
                        type={"password"}
                        passwordIcon
                    />
                    <Input
                        label="Confirmer votre mot de passe"
                        placeholder="Ex: Validez moi !"
                        name="confirmPassword"
                        register={register}
                        error={errors.confirmPassword?.message}
                        type={"password"}
                        passwordIcon
                    />
                    {errors.confirmPassword?.message && (
                        <p className="text-red-500 col-span-2">{errors.confirmPassword?.message}</p>
                    )}
                    <button type="submit" className="t-btn col-span-2">
                        <p>Réinitialiser mon mot de passe</p>
                    </button>
                </form>
            </div>
        </div>
    );
}

const NestedComponent: React.FC<{ hasMailSent: boolean }> = ({ hasMailSent }) => {
    return (
        <React.Fragment>
            {hasMailSent ? (
                <ResetPwdForm />
            ) : (
                <SendEmailForm />
            )}
        </React.Fragment>
    )
}


const ResetPwd = () => {
    const { token } = useParams<{ token: string }>();
    const [hasSentMail, setHasSentMail] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!!token) setHasSentMail(true)
        else setHasSentMail(false)
    }, [token])

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <NestedComponent hasMailSent={hasSentMail} />
        </div>
    )

};

export default ResetPwd;
