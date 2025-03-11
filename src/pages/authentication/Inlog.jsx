import React, { useState } from "react";
import {Link} from "react-router";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Logging in with:", { email, password });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">

            <div className="flex flex-grow items-center justify-center w-full h-screen">
                <form onSubmit={handleLogin} className="bg-login-container p-10 rounded-lg shadow-lg text-center max-w-lg w-full">
                    <div className="flex justify-center mb-8">
                        <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-6xl">
                            👤
                        </div>
                    </div>
                    <div className="text-white">
                        <label className="block text-left text-lg">E-mail adres</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-4 rounded text-black"
                        />
                        <label className="block text-left mt-6 text-lg">Wachtwoord</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 rounded text-black"
                        />
                    </div>
                    <div className="flex justify-between items-center mt-6 text-white text-sm">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" /> Ingelogd blijven
                        </label>
                        <a href="#" className="hover:underline">Wachtwoord vergeten?</a>
                    </div>
                    <button className="bg-button-login hover:bg-button-login-hover text-white w-full py-3 mt-6 rounded-lg text-lg">
                        <Link to="/" className="block w-full h-full text-white text-center">inloggen</Link>
                    </button>
                </form>
            </div>

        </div>
    );
}
