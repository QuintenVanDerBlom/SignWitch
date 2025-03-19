import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import config from "../../../src/config.jsx";

function Profiel() {
    const [firstName, setFirstName] = useState("");
    const loginData = useOutletContext();
    const [userId, setUserId] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://145.24.223.94:8000/users/${loginData.email}`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        apikey: "pinda",
                    },
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                setFirstName(data.username);
                setUserId(data._id)
                setRole(data.role)
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, [loginData.email]);

    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevent any default action
        console.log(firstName)
        console.log(loginData.email)
        console.log(role)
        console.log(userId)
        try {
            const response = await fetch(`http://145.24.223.94:8000/users/${userId}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    apikey: "pinda",
                },
                body: JSON.stringify({ username: firstName, email: loginData.email, role: role }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Update successful:", data);
            window.location.href = config.API_URL;
        } catch (error) {
            console.error("Error updating user:", error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {/* Profielfoto */}
            <div className="flex flex-col items-center mb-6">
                <div className="relative">
                    {/* Profielfoto placeholder */}
                    <div className="bg-gray-300 rounded-full w-32 h-32 flex items-center justify-center overflow-hidden">
                        <span className="text-6xl">👤</span>
                    </div>

                    {/* Klikbaar potlood-icoon */}
                    <a
                        href="/account/profielFoto"
                        className="absolute bottom-0 right-0 bg-login-container w-15 h-15 flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-button-bg-hover transition"
                    >
                        <span className="text-2xl">✏️</span>
                    </a>
                </div>
                <h1 className="text-2xl font-bold mt-4">profiel</h1>
            </div>

            {/* Profiel bewerken */}
            <div className="bg-login-container text-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
                <h2 className="text-lg font-semibold text-center mb-4">Profiel bewerken</h2>

                {/* Grid layout voor invoervelden */}
                <div className="grid grid-cols-1 gap-4">
                    {/* Gebruikersnaam */}
                    <div>
                        <label className="block text-sm">Gebruikersnaam</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-2 rounded-lg text-black"
                        />
                    </div>

                    {/* E-mail (niet bewerkbaar) */}
                    <div>
                        <label className="block text-sm">E-mail</label>
                        <input
                            type="text"
                            value={loginData.email}
                            disabled
                            className="w-full p-2 rounded-lg bg-gray-300 text-gray-700 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Update (Bevestig)-knop */}
                <button
                    onClick={handleUpdate}
                    className="w-full bg-button-login hover:bg-button-login-hover text-white py-2 rounded-lg mt-6 cursor-pointer"
                >
                    Bevestig
                </button>
            </div>
        </div>
    );
}

export default Profiel;
