import React from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/helpers/utils/schema/Auth";
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/helpers/api/hooks";
import { useLogin } from "@/helpers/api/hooks/auth";
import { useNavigate } from "react-router-dom";
import { MdAlternateEmail, MdPassword } from "react-icons/md";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { BiLockOpenAlt } from "react-icons/bi";
import OurLogoWithoutRect from "@/assets/insomniak2";

const Login = () => {
    const { login } = useAuth();
    const loginQuery = useLogin();
    const router = useNavigate()

    const [error, setError] = React.useState<string>("");
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const { register, handleSubmit, formState: {
        errors, isSubmitting
    } } = useForm<{ username: string, password: string }>({
        resolver: zodResolver<typeof loginSchema>(loginSchema)
    });

    const onSubmit = (data: { username: string, password: string }) => {
        const { username, password } = data;
        loginQuery.mutate({ username, password }, {
            onSuccess: (data) => {
                login(data.token);
                router('/');
            },
            onError: (error) => setError(error.message)
        });
    }

    return (
        <div className="w-full h-screen flex">
            <div className="md:w-3/6 w-full h-full bg-white px-5 py-10 space-y-10 focus:outline-none">
                <div className="flex items-center space-x-20">
                    <OurLogoWithoutRect width="80" height="80" />
                    <h1 className="text-3xl font-bold text-gray-900">
                        Connexion
                    </h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                    <label htmlFor="username" className="">Pseudo</label>
                    <div className="rounded-md pr-5 pl-3 py-3 bg-transparent border-gray-400 border flex items-center group space-x-2">
                        <MdAlternateEmail className="group-focus:text-red-500" />
                        <input
                            className="bg-transparent outline-none w-full group-focus:text-red-500"
                            type="text"
                            placeholder="Insomniak"
                            {...register("username")}
                        />
                    </div>
                    <label htmlFor="username" className="">Mot de passe</label>
                    <div className="rounded-md pr-5 pl-3 py-3 bg-transparent border-gray-400 border flex items-center group space-x-2">
                        <MdPassword className="group-focus:text-red-500" />
                        <input
                            className="bg-transparent outline-none w-full group-focus:text-red-500"
                            type={showPassword ? "text" : "password"}
                            placeholder="Changez moi"
                            {...register("password")}
                        />
                        {
                            showPassword ? <VscEye className="mr-5 cursor-pointer" onClick={() => setShowPassword(!showPassword)} /> : <VscEyeClosed className="mr-5 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                        }
                    </div>
                    <div className="flex w-full justify-end">
                        <span className="cursor-pointer hover:underline hover:text-blue-600 tracking-tight">Mot de passe oublié</span>
                    </div>
                    <button type="submit" className="t-btn">
                        <p>Se connecter</p>
                        <BiLockOpenAlt className="font-bold scale-105" />
                    </button>
                </form>
                <div className="divider text-black">ou</div>
                <div className="t-btn bg-slate-400 hover:bg-slate-500" onClick={() => router('/register')}>
                    <p>S'incrire</p>
                    <BiLockOpenAlt className="font-bold scale-105" />
                </div>
            </div>
            <div className="md:w-full md:h-full md:opacity-70 sm:block hidden">
                <video autoPlay muted loop id="loginVideo" className="object-cover w-full h-full bg-cover">
                    <source src="/bg-home.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    );
};

export default Login;