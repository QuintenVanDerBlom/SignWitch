import { useState } from "react";

// Voeg hier je eigen afbeeldingen toe
const avatars = [
    "/public/2.png",
    "/public/3.png",
    "/public/4.png",
    "/public/8.png",
    "/public/15.png",
    "/public/13.png",
    "/public/1.png",
    "/public/9.png",
    "/public/14.png",
    "/public/10.png",
    "/public/6.png",
    "/public/7.png",
    "/public/5.png",
    "/public/11.png",
    "/public/12.png",
    "/public/16.png",
    "/public/17.png",
    "/public/18.png",
    "/public/19.png",
    "/public/20.png",
];

export default function ProfielFoto() {
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F1E5] p-6">
            {/* Container */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-3xl relative">
                {/* Titel */}
                <h1 className="text-2xl font-bold text-center mb-4">Kies een icoon</h1>

                {/* Sluitknop */}
                <a
                    href="/account/profiel"
                    className="absolute top-4 right-4 text-red-500 text-2xl hover:text-red-700"
                    aria-label="Sluiten"
                >
                    ❌
                </a>

                {/* Avatar Grid */}
                <div className="flex flex-wrap justify-center">
                    {avatars.map((avatar, index) => (
                        <div
                            key={index}
                            className={`w-28 rounded-full cursor-pointer overflow-hidden border-4 transition-colors ${
                                selectedAvatar === avatar ? "border-button-bg" : "border-transparent"
                            }`}
                            onClick={() => setSelectedAvatar(avatar)}
                            tabIndex="0" // Zorg ervoor dat de avatars focusbaar zijn voor toetsenbordgebruikers
                            role="button" // Geeft aan dat dit een interactief element is
                            aria-label={`Selecteer avatar ${index + 1}`} // Beschrijvende tekst
                        >
                            <img
                                src={avatar}
                                alt={`Avatar afbeelding ${index + 1}`} // Meer beschrijvende alt tekst
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Bevestigen-knop */}
                <button
                    type="button"
                    onClick={() => window.location.href = "/account/profiel"}
                    className="flex items-center justify-center mt-6 w-48 h-12 bg-button-login text-white py-2 rounded-lg hover:bg-button-login-hover mx-auto focus:outline-none focus:ring-4 focus:ring-button-login-dark"
                    aria-label="Avatar bevestigen"
                >
                    Bevestigen
                </button>
            </div>
        </div>
    );
}
