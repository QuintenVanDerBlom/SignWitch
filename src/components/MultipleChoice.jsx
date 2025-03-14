import { useEffect, useState } from 'react';

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
        <div className="flex flex-col items-center w-screen h-1/2">
            <h1 className="underline text-lg m-5">Kijk eerst naar de video. Welk gebaar zie je hier?</h1>
            <div className="flex flex-row w-full justify-between px-20 items-center gap-10">
                <div className="flex justify-end ml-10">
                    <video key={question.correctAnswer} width="640" height="360" controls
                           className="rounded-lg shadow-lg">
                        <source src={`../public/signs/${question.correctAnswer}.mp4`} type="video/mp4"/>
                        Je browser ondersteunt deze video niet.
                    </video>

                </div>

                <div className="w-96 mr-10">
                    {isCorrect !== null && (
                        <p
                            className={`text-lg font-semibold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}
                        >
                            {isCorrect
                                ? '✅ Juist, het antwoord is: '
                                : '❌ Fout, het juiste antwoord is: '}
                            <span className="font-bold">{question.correctAnswer}</span>
                        </p>
                    )}

                    {question.possibleAnswers.map((option, i) => (
                        <label
                            key={i}
                            className={`flex items-center space-x-3 p-2 rounded-md ${
                                isCorrect === null ? 'hover:bg-gray-100' : ''
                            }`}
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
                <div></div>
            </div>

            <button
                type="button"
                onClick={checkAnswer}
                className={`mt-4 px-4 py-2 rounded-lg shadow-md ${selectedAnswer === null || isCorrect !== null ? 'bg-gray-400 cursor-not-allowed' : 'bg-progress-Done text-white'}`}
                disabled={selectedAnswer === null || isCorrect !== null}
            >
                Controleer antwoord
            </button>

        </div>
    );
}

export default MultipleChoice;
