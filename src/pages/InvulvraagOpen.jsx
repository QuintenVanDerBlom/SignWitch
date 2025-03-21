import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { FaHeart } from "react-icons/fa"; // FontAwesome-iconen

const VideoPlayer = ({ videoUrl }) => {
    return (
        <div className="flex justify-end ml-10">
            <div className="w-[640px] h-[360px] rounded-lg shadow-lg overflow-hidden">
                <ReactPlayer
                    url={videoUrl}
                    controls
                    width="100%"
                    height="100%"
                    aria-label="Video player"
                />
            </div>
        </div>
    );
};

function InvulvraagOpen({ exercise, setScore, setIsChecked }) {
    const correctAnswer = exercise.answer.split(", ");
    const exerciseQuestion = exercise.question.split(/[\s,]+/);
    const [answers, setAnswers] = useState(Array(correctAnswer.length).fill(""));
    const [isCorrect, setIsCorrect] = useState(null);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [wrongAnswer, setWrongAnswer] = useState("");
    let limitCheck = 2;
    let [amountChecked, setAmountChecked] = useState(0);

    useEffect(() => {
        setWrongAnswer("Helaas ❌, probeer het nog een keer.");
    }, [amountChecked]);

    useEffect(() => {
        // ✅ Reset state wanneer er een nieuwe vraag is
        setAnswers(Array(correctAnswer.length).fill(""));
        setIsCorrect(null);
        setShowCorrectAnswer(false);
        setAmountChecked(0);
        setWrongAnswer("");
    }, [exercise]);

    const handleChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    // ✅ Controleer of de antwoorden kloppen
    const checkAnswers = () => {
        const correct = correctAnswer.every((word, i) =>
            word.toLowerCase().trim() === answers[i].toLowerCase().trim()
        );
        setAmountChecked((prev) => prev + 1);
        if(amountChecked < limitCheck && !correct) {
            setAnswers(Array(exerciseQuestion.length).fill(null));
            setIsCorrect(null);
        }else {
            setIsCorrect(correct);

            if (correct) {
                setScore((prev) => ({...prev, correct: prev.correct + 1}));
            } else {
                setScore((prev) => ({...prev, incorrect: prev.incorrect + 1}));
            }

            setIsChecked(true);
            setShowCorrectAnswer(true);
        }
    };

    return (
        <div className="flex flex-col items-center w-screen h-1/2" aria-live="polite">
            <h1 className="underline text-lg m-5 text-black dark:text-gray-200" id="exercise-question">Vul de juiste woorden in</h1>
            <div className="flex flex-row w-full justify-between px-20 items-center gap-10">
                <div className="flex justify-end ml-10">
                    <VideoPlayer
                        videoUrl={exercise.video}
                    />
                </div>

                <div className="w-1/2 mr-10">
                    {/* ✅ Toon de correcte zin na controle */}
                    {showCorrectAnswer ? (
                        <div className="text-center">
                            <p className={`text-xl font-semibold ${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-300"}`} role="alert">
                                {isCorrect ? "Goed gedaan! ✅" : "Helaas ❌ het juiste antwoord is:"}
                            </p>
                            <p className="text-xl font-semibold text-black dark:text-gray-200">
                                {(() => {
                                    let correctIndex = 0;
                                    return exerciseQuestion.map((word, index) =>
                                        word === "___" || word === "___." || word === "___?" ? (
                                            <span key={index} className="font-bold text-blue-600 dark:text-blue-400">
                                                {correctAnswer[correctIndex++]}
                                            </span>
                                        ) : (
                                            ` ${word} `
                                        )
                                    );
                                })()}
                            </p>
                        </div>
                    ) : (
                        <>
                            <p className="text-lg text-center font-semibold text-red-500">
                                {wrongAnswer}
                            </p>
                            <p className="text-xl mb-6 text-center text-black dark:text-gray-200">
                                {(() => {
                                    let placeIndex = 1;
                                    return exerciseQuestion.map((word, index) =>
                                        word === "___" || word === "___." || word === "___?" ? (
                                            <span key={index} className="underline"> __{placeIndex++}__ </span>
                                        ) : (
                                            ` ${word} `
                                        )
                                    );
                                })()}
                            </p>

                            {/* ✅ Correcte invulvelden behouden bij meerdere vragen */}
                            <div className="flex flex-col gap-6 items-center">
                                {correctAnswer.map((_, index) => (
                                    <div key={index} className="mb-6 text-center">
                                        <input
                                            type="text"
                                            value={answers[index] || ""}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            className="border-b-4 border-button-bg mx-1 w-72 text-center text-lg p-4 bg-gray-100 rounded-lg shadow"
                                            placeholder={` (${index + 1})`}
                                            aria-label={`Vul het woord in voor het gat ${index + 1}`}
                                            aria-invalid={isCorrect === false ? "true" : "false"}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <button
                onClick={checkAnswers}
                className={`mt-4 px-4 py-2 rounded-lg shadow-md ${showCorrectAnswer ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-progress-Done text-white"}`}
                disabled={showCorrectAnswer}
                aria-label="Controleer het antwoord"
            >
                Controleer het antwoord
            </button>

            <div className="flex flex-col items-center mb-2">
                {!showCorrectAnswer ? (
                    <>
                        <h1 className="text-xl m-1 font-k2d text-black dark:text-gray-200">Kansen:</h1>
                        <div className="flex flex-row justify-center gap-4">
                            {[...Array(limitCheck + 1)].map((_, i) => (
                                <FaHeart
                                    key={i}
                                    size={30}
                                    className={i < amountChecked ? "text-gray-500 dark:text-white" : "text-red-400"}
                                    aria-label={`Kans ${i + 1}`}
                                />
                            ))}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}

export default InvulvraagOpen;
