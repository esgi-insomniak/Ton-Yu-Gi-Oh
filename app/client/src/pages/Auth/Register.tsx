import { AuthRegisterType } from "@/helpers/types/users"
import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/helpers/utils/schema/Auth"
import { useRegister } from "@/helpers/api/hooks/auth"

const Register = () => {

    const registerQuery = useRegister();

    const { register, handleSubmit, formState: { errors } } = useForm<AuthRegisterType>({
        resolver: zodResolver<typeof registerSchema>(registerSchema)
    });

    const onSubmit = (data: AuthRegisterType) => {
        registerQuery.mutate({ ...data }, {
            onSuccess: (data) => {
                console.log(data)
            },
            onError: (error) => console.log(error)
        })
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-[url('/bg-auth.jpeg')] bg-center bg-cover backdrop-blur-md">
            <form className="flex w-2/3 h-fit p-5 rounded-md bg-black/60 justify-start" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-5 w-1/2">
                    <input type="text" placeholder="Username" className="t-input" {...register("username")} />
                    {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                    <input type="text" placeholder="First Name" className="t-input" {...register("firstName")} />
                    {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                    <input type="text" placeholder="Last Name" className="t-input" {...register("lastName")} />
                    {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                    <input type="email" placeholder="Email" className="t-input" {...register("email")} />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    <input type="password" placeholder="Password" className="t-input" {...register("password")} />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    <button type="submit" className="t-btn">Register</button>
                    <p>Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
                </div>
            </form>
        </div>
    )
}

export default Register