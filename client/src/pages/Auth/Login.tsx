import React from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../helpers/utils/schema/Auth";
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "../../helpers/api/hooks";
import { useLogin } from "../../helpers/api/hooks/auth";

const Login = () => {
    const { setUser } = useAuth();
    const loginQuery = useLogin();
    const { register, handleSubmit, formState: {
        errors, isSubmitting
    } } = useForm<{ username: string, password: string }>({
        resolver: zodResolver<typeof loginSchema>(loginSchema)
    });

    const onSubmit = (data: { username: string, password: string }) => {
        const { username, password } = data;
        loginQuery.mutate({ username, password }, {
            onSuccess: (data) => {
                setUser({
                    id: data.id,
                    email: data.email,
                    role: data.role,
                    username: data.username,
                }, data.token);
            },
            onError: (error) => {
                console.log(error)
            }
        });
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5 w-2/3 h-2/4 p-5 rounded-md bg-white/30 justify-start">
                <input
                    {...register("username")}
                    placeholder="Username"
                    className="t-input"
                    disabled={isSubmitting}
                />
                {errors.username && <p>{errors.username.message}</p>}
                <input
                    {...register("password")}
                    placeholder="Password"
                    type="password"
                    className="t-input"
                    disabled={isSubmitting}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <button type="submit" className="t-btn">Login</button>
            </form>
        </div>
    );
};

export default Login;