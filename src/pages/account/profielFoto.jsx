import { useState } from "react";

// Voeg hier je eigen afbeeldingen toe
const avatars = [
    "/2.png",
    "/3.png",
    "/4.png",
    "/8.png",
    "/15.png",
    "/13.png",
    "/1.png",
    "/9.png",
    "/14.png",
    "/10.png",
    "/6.png",
    "/7.png",
    "/5.png",
    "/11.png",
    "/12.png",
    "/16.png",
    "/17.png",
    "/18.png",
    "/19.png",
    "/20.png",

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
                >
                    ❌
                </a>

                {/* Avatar Grid */}
                <div className="flex flex-wrap justify-center">
                    {avatars.map((avatar, index) => (
                        <div
                            key={index}
                            className={`w-28 rounded-full cursor-pointer overflow-hidden border-4 ${
                                selectedAvatar === avatar ? "border-button-bg" : "border-transparent"
                            }`}
                            onClick={() => setSelectedAvatar(avatar)}
                        >
                            <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

                {/* Bevestigen-knop */}
                <a
                    href="/account/profiel"
                    className="flex items-center justify-center mt-6 w-48 h-12 bg-button-login text-white py-2 rounded-lg hover:bg-button-login-hover mx-auto"
                >
                    Bevestigen
                </a>


            </div>
        </div>
    );
}
