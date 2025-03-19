import { useState } from "react";

export default function Profiel() {
    const [firstName, setFirstName] = useState("Abigail");
    const [lastName, setLastName] = useState("Toekimin");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            {/* Profielfoto */}
            <div className="flex flex-col items-center mb-6">
                <div className="relative">
                    {/* Profielfoto placeholder */}
                    <div className="bg-gray-300 rounded-full w-32 h-32 flex items-center justify-center overflow-hidden">
                        <span className="text-6xl" role="img" aria-label="Profielfoto">👤</span>
                    </div>

                    {/* Klikbaar potlood-icoon */}
                    <a
                        href="/account/profielFoto"
                        className="absolute bottom-0 right-0 bg-login-container w-15 h-15 flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-button-bg-hover transition"
                        aria-label="Profielfoto bewerken"
                    >
                        <span className="text-2xl">✏️</span>
                    </a>
                </div>
                <h1 className="text-2xl font-bold mt-4">Profiel</h1>
            </div>

            {/* Profiel bewerken */}
            <div className="bg-login-container text-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
                <h2 className="text-lg font-semibold text-center mb-4">Profiel bewerken</h2>

                {/* Grid layout voor invoervelden */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Voornaam */}
                    <div>
                        <label htmlFor="firstName" className="block text-sm">Voornaam</label>
                        <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-2 rounded-lg text-black"
                            aria-required="true"
                        />
                    </div>

                    {/* Achternaam */}
                    <div>
                        <label htmlFor="lastName" className="block text-sm">Achternaam</label>
                        <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-2 rounded-lg text-black"
                            aria-required="true"
                        />
                    </div>

                    {/* Studentnummer (niet bewerkbaar) */}
                    <div>
                        <label htmlFor="studentId" className="block text-sm">Studentnummer</label>
                        <input
                            id="studentId"
                            type="text"
                            value="1061234"
                            disabled
                            className="w-full p-2 rounded-lg bg-gray-300 text-gray-700 cursor-not-allowed"
                            aria-disabled="true"
                            aria-describedby="studentIdDescription"
                        />
                        <span id="studentIdDescription" className="sr-only">Studentnummer kan niet worden bewerkt</span>
                    </div>

                    {/* E-mail (niet bewerkbaar) */}
                    <div>
                        <label htmlFor="email" className="block text-sm">E-mail</label>
                        <input
                            id="email"
                            type="text"
                            value="1061234@hr.nl"
                            disabled
                            className="w-full p-2 rounded-lg bg-gray-300 text-gray-700 cursor-not-allowed"
                            aria-disabled="true"
                            aria-describedby="emailDescription"
                        />
                        <span id="emailDescription" className="sr-only">E-mail kan niet worden bewerkt</span>
                    </div>
                </div>

                {/* Bewerk-knop */}
                <a href="/" aria-label="Profiel bewerken">
                    <button
                        className="w-full bg-button-login hover:bg-button-login-hover text-white py-2 rounded-lg mt-6 cursor-pointer"
                        aria-label="Profiel bewerken"
                    >
                        Bewerk
                    </button>
                </a>
            </div>
        </div>
    );
}
