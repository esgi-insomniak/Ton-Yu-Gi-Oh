import { AuthRegisterType } from "@/helpers/types/users"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/helpers/utils/schema/Auth"
import { useRegister } from "@/helpers/api/hooks/auth"
import OurLogoWithoutRect from "@/assets/insomniak2"
import { Input } from "@/components/Input"
import { BiLockOpenAlt } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import { useAlert } from "@/helpers/providers/alerts/AlertProvider"

const Register = () => {

    const registerQuery = useRegister();
    const router = useNavigate();
    const alert = useAlert()

    const { register, handleSubmit, formState: { errors } } = useForm<AuthRegisterType>({
        resolver: zodResolver<typeof registerSchema>(registerSchema)
    });

    const onSubmit = (data: AuthRegisterType) => {
        registerQuery.mutate({ ...data }, {
            onSuccess: (res) => {
                alert?.success(`Vous êtes bien inscrit ${res.data.username} !`)
                router('/login')
            },
            onError: (error) => alert?.error('Une erreur est survenue')
        })
    }

    return (
        <div className="w-full h-screen flex flex-row-reverse">
            <div className="md:w-4/6 w-full h-full bg-white px-5 py-10 space-y-10 focus:outline-none">
                <div className="flex items-center space-x-80">
                    <OurLogoWithoutRect width="80" height="80" />
                    <h1 className="text-3xl font-bold text-gray-900">
                        Inscription
                    </h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-flow-dense grid-cols-2 gap-5">
                    <Input
                        label="Nom d'utilisateur"
                        placeholder="Ex: Insomniak"
                        name="username"
                        register={register}
                        error={errors.username?.message}
                    />
                    <Input label="Email" placeholder="Ex: challenge@reussite.com" name="email" register={register} error={errors.email?.message} />
                    <Input
                        label="Mot de passe"
                        placeholder="Ex: Validez moi !"
                        name="password"
                        register={register}
                        error={errors.password?.message}
                        type={"password"}
                        passwordIcon
                    />
                    <button type="submit" className="t-btn bg-blue-500 text-white hover:bg-blue-300 col-span-2">
                        <p>S'incrire</p>
                        <BiLockOpenAlt className="font-bold scale-105" />
                    </button>
                </form>
                <div className="divider text-black">ou</div>
                <div className="t-btn bg-slate-400 hover:bg-slate-500 text-white hover:text-white" onClick={() => router('/login')}>
                    <p>Se connecter</p>
                    <BiLockOpenAlt className="font-bold scale-105" />
                </div>
            </div>
            <div className="md:w-1/3 md:h-full md:opacity-70 sm:block hidden">
                <video autoPlay muted loop id="loginVideo" className="object-cover w-full h-full bg-cover">
                    <source src="/bg-home.mp4" type="video/mp4" />
                </video>
            </div>
        </div>

    )
}

export default Register