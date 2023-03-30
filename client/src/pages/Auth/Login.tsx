import React from "react";
import { useForm } from "react-hook-form";
import { loginSchema, responseLoginSchema } from "@/helpers/utils/schema/Auth";
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/helpers/api/hooks";
import { useLogin } from "@/helpers/api/hooks/auth";
import {
    FacebookLoginButton,
    GoogleLoginButton,
    GithubLoginButton,
    AppleLoginButton
} from "react-social-login-buttons";
import {
    LoginSocialFacebook,
    LoginSocialGoogle,
    LoginSocialGithub,
    LoginSocialApple,
} from "reactjs-social-login"
const Login = () => {
    const { setUser } = useAuth();
    const loginQuery = useLogin();
    const { register, handleSubmit, formState: {
        errors, isSubmitting
    } } = useForm<{ username: string, password: string }>({
        resolver: zodResolver<typeof loginSchema>(loginSchema)
    });
    const [error, setError] = React.useState<string>("");

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
                setError(error.message);
            }
        });
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-[url('/bg-auth.jpeg')] bg-center bg-cover backdrop-blur-md">
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-2/3 h-2/4 p-5 rounded-md bg-black/60 justify-start">
                <div className="space-y-5 w-1/2">
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
                    {error && <p>{error}</p>}
                    <p>Don't have an account? <a href="/register" className="text-blue-500">Register</a></p>
                </div>
                <div className="divider divider-horizontal" />
                <div className="flex justify-start items-center w-1/2 flex-col space-y-4">
                    <LoginSocialFacebook
                        appId={""}
                        fieldsProfile={"id,firstName,lastName,email,picture"}
                        onLoginStart={() => alert('start')}
                        onReject={() => alert('rejected')}
                        onResolve={() => alert('resolved')}
                        className="w-full"
                    >
                        <FacebookLoginButton />
                    </LoginSocialFacebook>
                    <GoogleLoginButton />
                    <GithubLoginButton />
                    <AppleLoginButton />
                </div>
            </form>
        </div>
    );
};

export default Login;