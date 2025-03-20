import { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";

const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap
    }
    return shuffledArray;
};

function MultipleChoice({ question, setScore, setIsChecked }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const loginData = useOutletContext();
    const [userID, setUserID] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://145.24.223.94:8000/users/${loginData.email}`, {
                    method: "GET",
                    headers: {
                        "apiKey": "9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz", // Replace with your actual API key
                        "Accept": "application/json",
                    },
                });
                const data = await response.json();
                setUserID(data._id)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        setSelectedAnswer(null);
        setIsCorrect(null);
    }, [question]);

    const handleAnswerChange = (e) => {
        setSelectedAnswer(e.target.value);
    };

    async function setFavorite(id, isSaved) {
        try {
            const response = await fetch(`http://145.24.223.94:8000/users/${userID}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "apiKey": "9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz", // Replace with your actual API key
                },
                body: JSON.stringify({
                    signId: id, // Voeg signId toe
                    saved: isSaved,
                })
            });

            if (!response.ok) {
                throw new Error("Fout bij updaten van favoriet");
            }

            console.log(`Favoriet ${id} succesvol geüpdatet!`);
        } catch (error) {
            console.error("Fout bij het updaten van favoriet:", error);
        }
    }

    const [isSaved, setIsSaved] = useState(false);

    const checkAnswer = () => {
        if (selectedAnswer === question.correctAnswer.title) {
            setIsCorrect(true);
            setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
            setIsSaved(false);
        } else {
            setIsCorrect(false);
            setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
            setIsSaved(true);
        }
        setFavorite(question.correctAnswer._id, isSaved);
        setIsChecked(true); // ✅ Gebruiker heeft de vraag gecontroleerd
    };

    const [shuffledChoices, setShuffledChoices] = useState([]);

    useEffect(() => {
        const allChoices = [...question.choices, { title: question.correctAnswer.title }];
        const shuffled = shuffleArray(allChoices);
        setShuffledChoices(shuffled);
    }, [question]);

    return (
        <div className="flex flex-col items-center w-screen h-1/2 text-gray-800 dark:text-gray-100">
            <h1 className="underline text-lg m-5">Kijk eerst naar de video. Welk gebaar zie je hier?</h1>
            <div className="flex flex-row w-full justify-between px-44 items-center">
                <div className="flex justify-end ml-10">
                    <video
                        key={question.correctAnswer.title}
                        width="640"
                        height="360"
                        controls
                        className="rounded-lg shadow-lg"
                        tabIndex="0"
                        aria-label="Gebaar video"
                    >
                        <source src={`/signs/${encodeURIComponent(question.correctAnswer.title)}.mp4`} type="video/mp4" />
                        Je browser ondersteunt deze video niet.
                    </video>
                </div>

                <div className="w-96 mr-10">
                    {isCorrect !== null && (
                        <p className={`text-xl font-semibold ${isCorrect ? 'text-green-500' : 'text-red-500'}`} aria-live="polite">
                            {isCorrect ? '✅ Juist, het antwoord is: ' : '❌ Fout, het juiste antwoord is: '}
                            <span className="font-bold">{question.correctAnswer.title}</span>
                        </p>
                    )}
                    {shuffledChoices.map((option, i) => (
                        <label
                            key={i}
                            className={`flex items-center space-x-3 p-2 rounded-md ${isCorrect === null ? 'hover:bg-white dark:hover:bg-gray-900 focus:ring-2 focus:ring-blue-500' : ''}`}
                        >
                            <input
                                type="radio"
                                value={option.title}
                                className="w-5 h-5 text-blue-600 focus:ring-blue-600"
                                name="quiz"
                                aria-label={`Optie: ${option.title}`}
                                onChange={handleAnswerChange}
                                checked={selectedAnswer === option.title}
                                disabled={isCorrect !== null}
                                tabIndex="0"
                            />
                            <span className="text-lg text-gray-800 dark:text-gray-100">{option.title}</span>
                        </label>
                    ))}
                </div>
            </div>

            <button
                type="button"
                onClick={checkAnswer}
                className={`mt-4 px-4 py-2 rounded-lg shadow-md ${selectedAnswer === null || isCorrect !== null ? 'bg-progress-Done cursor-not-allowed' : 'bg-progress-Done-dark text-white focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
                disabled={selectedAnswer === null || isCorrect !== null}
                aria-disabled={selectedAnswer === null || isCorrect !== null}
                tabIndex="0"
                aria-label="Controleer het antwoord"
            >
                Controleer het antwoord
            </button>
        </div>
    );
}

export default MultipleChoice;
