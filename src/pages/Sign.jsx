import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Sign() {
    const { id } = useParams(); // Haal de ID op uit de URL
    const [sign, setSign] = useState(null); // Staat voor het specifieke sign
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchSignDetails = async () => {
            try {
                const response = await fetch(`http://145.24.223.94:8000/signs/${id}`, { // Gebruik de ID om de data op te halen
                    method: "GET",
                    headers: {
                        "apiKey": "EHKG61Lr3Bq0PDncCoALn9hvG2LeHVBB", // Voeg de juiste API sleutel toe
                        "Accept": "application/json",
                    },
                });
                const data = await response.json();
                setSign(data); // Zet de ontvangen data in de state
                setLoading(false);
            } catch (error) {
                console.error("Error fetching sign details:", error);
                setLoading(false);
            }
        };

        fetchSignDetails();
    }, [id]); // Zorg ervoor dat de data opnieuw wordt opgehaald wanneer de ID verandert

    if (loading) {
        return <div>Loading...</div>; // Geef een laadbericht weer
    }

    if (!sign) {
        return <div>Sign not found</div>; // Als het sign niet gevonden is
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background-color px-6 py-10">
            <h1 className="text-4xl tracking-wide text-gray-900 mb-4">{sign.title}</h1>
            {/* Video Section */}
            <div className="w-full md:w-1/2 flex justify-center mb-8">
                <video className="w-full max-w-md rounded-lg shadow-md border border-gray-300" controls>
                    <source src={sign.video_url} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Divider */}
            <hr className="w-full max-w-3xl h-px bg-gray-900 mb-8"/>

            {/* Information Section */}
            <div className="w-full md:w-1/2 flex flex-col items-center text-center md:text-left px-4">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {sign.description}
                </p>

                {/* Back Button */}
                <a href="/woordenboek" className="inline-block bg-button-bg text-white px-6 py-3 rounded-lg
                    hover:bg-button-bg-hover transition duration-300 shadow-md">
                    ← Woordenboek
                </a>
            </div>
        </div>
    );
}

export default Sign;
