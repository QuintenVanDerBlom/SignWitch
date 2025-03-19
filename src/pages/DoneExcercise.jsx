import { Link, useLocation } from "react-router";
import { useParams } from "react-router-dom";
import Confetti from "react-confetti";
import { useEffect, useState } from "react"; // Importeer Confetti component

function DoneExercise() {
    const { category_id } = useParams();
    const location = useLocation();
    const { score } = location.state || { score: { correct: 0, incorrect: 0 } };
    const [category, setCategory] = useState([]);

    useEffect(() => {
        // Fetch the signs data from the API
        const fetchCategories = async () => {
            try {
                const response = await fetch(`http://145.24.223.94:8000/categories/${category_id}`, {
                    method: "GET", headers: {
                        "apiKey": "9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz", // Replace with your actual API key
                        "Accept": "application/json",
                    },
                });
                const data = await response.json();

                // Access the 'items' array and set it to the signs state
                setCategory(data); // Use the 'items' array from the response
                console.log(data.lesson)

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCategories();
    }, []);

    // Definieer de afmetingen van het scherm voor de confetti
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    // Update de grootte van het venster als het scherm verandert
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            {/* Voeg confetti effect toe */}
            <Confetti
                width={windowWidth}
                height={windowHeight}
                recycle={false}
                gravity={0.3}
                aria-hidden="true" // Verbergen voor screen readers
            />

            <h1 className="text-6xl font-k2d pt-32 font-bold text-black dark:text-gray-200">
                Gefeliciteerd!
            </h1>
            <p className="mt-4 text-3xl py-10 font-k2d text-black dark:text-gray-200">
                Thema {category.categoryName} compleet!
            </p>
            <p className="text-2xl font-k2d text-black dark:text-gray-200">
                Je hebt {score.correct}/{score.correct + score.incorrect} correct!
            </p>

            <Link to={`/les/${category.lesson}`} aria-label="Ga terug naar de les">
                <button
                    className="bg-lesson-container dark:bg-lesson-container-dark text-white dark:text-gray-200 p-4 rounded-lg shadow-lg w-72 h-20 m-10 flex flex-col justify-center transition-transform duration-200 hover:scale-105"
                    aria-label="Terug naar de les"
                >
                    <h2 className="text-center font-k2d text-xl">Terug naar de les</h2>
                </button>
            </Link>
        </div>
    );
}

export default DoneExercise;
