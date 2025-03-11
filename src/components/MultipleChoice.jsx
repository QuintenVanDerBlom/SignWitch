import {useEffect, useState} from 'react';

function MultipleChoice({ question, setScore, setIsChecked }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    useEffect(() => {
        // Reset bij een nieuwe vraag
        setSelectedAnswer(null);
        setIsCorrect(null);
    }, [question]); // 🔹 Reset als `question` verandert
    const handleAnswerChange = (e) => {
        setSelectedAnswer(e.target.value);
    };

    const checkAnswer = () => {
        // Vergelijk het geselecteerde antwoord met het juiste antwoord
        if (selectedAnswer === question.correctAnswer) {
            setIsCorrect(true);
            setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));

        } else {
            setIsCorrect(false);
            setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));

        }
        setIsChecked(true); // ✅ Gebruiker heeft de vraag gecontroleerd

    };

    return (
        <div className="flex flex-col items-center p-4">
            <p className="text-lg text-gray-800 text-center mb-6">
                Kijk eerst naar de video. Welk gebaar zie je hier?
            </p>

            <div className="w-full p-6 flex flex-row gap-10">
                {/* Video placeholder */}
                <div className="w-1/2 flex justify-end ml-10">
                    <video width="640" height="360" controls className="rounded-lg shadow-lg">
                        <source src="" type="video/mp4"/>
                        Je browser ondersteunt deze video niet.
                    </video>
                </div>

                <div className="flex flex-col">
                    {isCorrect !== null && (
                        <p className={`text-lg font-semibold ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                            {isCorrect ? "✅ Juist, het antwoord is: " : "❌ Fout, het juiste antwoord is: "}
                            <span className="font-bold">{question.correctAnswer}</span>
                        </p>
                    )}

                    {question.possibleAnswers.map((option, i) => (
                        <label
                            key={i}
                            className={`flex items-center space-x-3 p-2 rounded-md ${isCorrect === null ? "hover:bg-gray-100" : ""}`}
                        >
                            <input
                                type="radio"
                                value={option}
                                className="w-5 h-5 text-red-500 focus:ring-red-500"
                                name="quiz"
                                onChange={handleAnswerChange}
                                checked={selectedAnswer === option}
                                disabled={isCorrect !== null} // Voorkomt selectie na controle
                            />
                            <span className="text-lg text-gray-900">{option}</span>
                        </label>
                    ))}
                </div>

            </div>

            <button
                type="button"
                onClick={checkAnswer}
                className="bg-green-400 px-6 py-2 rounded-md text-black hover:bg-green-700 hover:text-white"
                disabled={isCorrect !== null} // 🔹 Voorkomt dubbel klikken
            >
                Controleren
            </button>
        </div>

    );
}

export default MultipleChoice;
