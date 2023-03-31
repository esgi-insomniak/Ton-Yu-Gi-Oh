import { useAuth } from "@/helpers/api/hooks";
import React from "react";

const Home = () => {
    const { user } = useAuth()
    console.log(user)
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img src="https://picsum.photos/300/400"
                    className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">Hello Motherfucker</h1>
                    <p className="py-6">Ceci est une page de Test</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
}

export default Home;