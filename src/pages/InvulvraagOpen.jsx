import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
const VideoPlayer = ({ videoId, playlistId }) => {
    const videoUrl = `https://www.youtube.com/watch?v=hglEJkVy1L8`;

    return (
        <div className="flex justify-end ml-10">
            <div className="w-[640px] h-[360px] rounded-lg shadow-lg overflow-hidden">
                <ReactPlayer
                    url={videoUrl}
                    controls
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
};
function InvulvraagOpen({ exercise, setScore, setIsChecked }) {
    const [answers, setAnswers] = useState(Array(exercise.correctAnswer.length).fill(""));
    const [isCorrect, setIsCorrect] = useState(null);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

    useEffect(() => {
        // ✅ Reset state wanneer er een nieuwe vraag is
        setAnswers(Array(exercise.correctAnswer.length).fill(""));
        setIsCorrect(null);
        setShowCorrectAnswer(false);
    }, [exercise]);

    const handleChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    // ✅ Controleer of de antwoorden kloppen
    const checkAnswers = () => {
        const correct = exercise.correctAnswer.every((word, i) =>
            word.toLowerCase().trim() === answers[i].toLowerCase().trim()
        );
        setIsCorrect(correct);

        if (correct) {
            setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
        } else {
            setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
        }

        setIsChecked(true);
        setShowCorrectAnswer(true);
    };

    return (
        <div className="flex flex-col items-center w-screen h-1/2">
            <h1 className="underline text-lg m-5">Vul de juiste woorden in</h1>
            <div className="flex flex-row w-full justify-between px-20 items-center gap-10">
                <div className="flex justify-end ml-10">
                    <VideoPlayer
                        videoId="hglEJkVy1L8" // <-- Dit is de video die moet starten
                        playlistId="PLP8IosJB9PlUueQCTSe82RoQRSB3rGyTe"
                    />
                </div>

                <div className="w-1/2 mr-10">
                    {/* ✅ Toon de correcte zin na controle */}
                    {showCorrectAnswer ? (
                        <div className="text-center">
                            <p className={`text-lg font-semibold ${isCorrect ? "text-green-600" : "text-red-500"}`}>
                                {isCorrect ? "Goed gedaan! ✅" : "Helaas ❌ het juiste antwoord is:"}
                            </p>
                            <p className="text-lg font-semibold">
                                {(() => {
                                    let correctIndex = 0;
                                    return exercise.question.map((word, index) =>
                                        word === "___" ? (
                                            <span key={index} className="font-bold text-blue-600">
                                                {exercise.correctAnswer[correctIndex++]}
                                            </span>
                                        ) : (
                                            ` ${word} `
                                        )
                                    );
                                })()}
                            </p>
                        </div>
                    ) : (
                        // 🔹 Normale vraag met invulvelden
                        <>
                            <p className="text-xl mb-6 text-center">
                                {(() => {
                                    let placeIndex = 1;
                                    return exercise.question.map((word, index) =>
                                        word === "___" ? (
                                            <span key={index} className="underline"> __{placeIndex++}__ </span>
                                        ) : (
                                            ` ${word} `
                                        )
                                    );
                                })()}
                            </p>

                            {/* ✅ Correcte invulvelden behouden bij meerdere vragen */}
                            <div className="flex flex-col gap-6 items-center">
                                {exercise.correctAnswer.map((_, index) => (
                                    <div key={index} className="mb-6 text-center">
                                        <input
                                            type="text"
                                            value={answers[index] || ""}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            className="border-b-4 border-button-bg mx-1 w-72 text-center text-lg p-4 bg-gray-100 rounded-lg shadow"
                                            placeholder={` (${index + 1})`}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Controleer-knop */}

                        </>
                    )}
                </div>

            </div>
            <button
                onClick={checkAnswers}
                className={`mt-4 px-4 py-2 rounded-lg shadow-md ${showCorrectAnswer ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-progress-Done text-white" }`}
                disabled={showCorrectAnswer}
            >
                Controleer antwoord
            </button>
        </div>
    );
}

export default InvulvraagOpen;
