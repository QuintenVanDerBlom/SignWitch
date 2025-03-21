import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Sign() {
    const { id } = useParams(); // Haal de ID op uit de URL
    const [sign, setSign] = useState(null); // Staat voor het specifieke sign
    const [loading, setLoading] = useState(true); // Loading state
    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(location.search);
        return urlParams.get(param);
    };

    // Haal category_ids en lesson_ids op uit de URL
    const categoryIds = getQueryParam('category_ids')?.split(',') || [];
    const lessonIds = getQueryParam('lesson_ids')?.split(',') || [];

    useEffect(() => {
        const fetchSignDetails = async () => {
            try {
                const response = await fetch(`http://145.24.223.94:8000/signs/${id}`, { // Gebruik de ID om de data op te halen
                    method: "GET",
                    headers: {
                        "apiKey": "9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz", // Voeg de juiste API sleutel toe
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
        <div className="flex flex-col items-center min-h-screen px-6 py-10">
            <h1 className="text-6xl tracking-wide text-gray-900 dark:text-gray-200 mb-4">{sign.title}</h1>
            {/* Video Section */}
            <div className="w-screen md:w-1/2 flex justify-center mb-8">
                <video className="w-screen rounded-lg shadow-md border border-gray-300" controls>
                    <source src={`/signs/${encodeURIComponent(sign.title)}.mp4`} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Divider */}
            <hr className="w-full max-w-3xl h-px bg-gray-900 dark:bg-gray-200 mb-8"/>

            {/* Information Section */}
            <div className="w-full md:w-1/2 flex flex-col items-center text-center md:text-left px-4">
                <p className="text-lg text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
                    {sign.description}
                </p>

                {/* Back Button */}
                <a
                    href={`/woordenboek?category_ids=${categoryIds.join(',')}&lesson_ids=${lessonIds.join(',')}`}
                    className="inline-block bg-button-bg dark:bg-button-bg-dark text-white dark:text-gray-200 px-6 py-3 rounded-lg"
                >
                    Terug naar woordenboek
                </a>
            </div>
        </div>
    );
}

export default Sign;
