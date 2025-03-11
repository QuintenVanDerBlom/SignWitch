import {Link, useLocation} from "react-router";
import { useParams } from "react-router-dom";
import Confetti from "react-confetti";
import {useEffect, useState} from "react"; // Importeer Confetti component

function DoneExercise() {
    const { category_id } = useParams();
    const location = useLocation();
    const { score } = location.state || { score: { correct: 0, incorrect: 0 } };

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
            <Confetti width={windowWidth} height={windowHeight} recycle={false}/>

            <h1 className="text-6xl font-k2d pt-32 font-bold">Gefeliciteerd!</h1>
            <p className="mt-4 text-3xl py-10 font-k2d">Thema {category_id} compleet!</p>
            <p className="text-2xl font-k2d">Je hebt {score.correct}/{score.correct + score.incorrect} correct!</p>
            <Link to="/les/1" className="hover:underline transition-all">
                <div
                className="bg-lesson-container text-white p-4 rounded-lg shadow-lg w-72 h-20 m-10 flex flex-col justify-center transition-transform duration-200 hover:scale-105">
                    <h2 className="text-center font-k2d text-xl">Terug naar de thema's</h2>
            </div>
            </Link>
        </div>
    );
}

export default DoneExercise;
