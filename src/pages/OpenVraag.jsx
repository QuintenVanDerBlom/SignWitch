import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { FaHeart } from "react-icons/fa";

const VideoPlayer = ({ videoId, playlistId }) => {
    const videoUrl = `https://www.youtube.com/watch?v=hglEJkVy1L8`;

    return (
        <div className="flex justify-end ml-10">
            <div className="w-[640px] h-[360px] rounded-lg shadow-lg overflow-hidden">
                <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
            </div>
        </div>
    );
};

function OpenVraag({ exercise, setScore, setIsChecked }) {
    const [answers, setAnswers] = useState("");
    const [isCorrect, setIsCorrect] = useState(null);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [wrongAnswer, setWrongAnswer] = useState("");
    const limitCheck = 2;
    const [amountChecked, setAmountChecked] = useState(0);

    useEffect(() => {
        setWrongAnswer("Helaas ❌, probeer het nog een keer.");
    }, [amountChecked]);

    useEffect(() => {
        setAnswers("");
        setIsCorrect(null);
        setShowCorrectAnswer(false);
        setAmountChecked(0);
        setWrongAnswer("");
    }, [exercise]);

    const handleChange = (value) => {
        setAnswers(value);
    };

    const checkAnswers = () => {
        if (!answers.trim()) {
            setWrongAnswer("Vul eerst een antwoord in voordat je controleert.");
            return;
        }

        const correct = exercise.correctAnswer.toLowerCase().trim() === answers.toLowerCase().trim();
        setAmountChecked((prev) => prev + 1);

        if (amountChecked < limitCheck && !correct) {
            setAnswers("");
            setIsCorrect(null);
        } else {
            setIsCorrect(correct);

            if (correct) {
                setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
            } else {
                setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
            }

            setIsChecked(true);
            setShowCorrectAnswer(true);
        }
    };

    return (
        <div className="flex flex-col items-center w-screen h-1/2">
            <h1 className="underline text-lg m-5">Vul de juiste woorden in</h1>
            <div className="flex flex-row w-full justify-between px-20 items-center gap-10">
                <div className="flex justify-end ml-10">
                    <VideoPlayer videoId="hglEJkVy1L8" playlistId="PLP8IosJB9PlUueQCTSe82RoQRSB3rGyTe" />
                </div>

                <div className="w-1/2 mr-10">
                    {showCorrectAnswer ? (
                        <div className="text-center">
                            <p className={`text-lg font-semibold ${isCorrect ? "text-green-600" : "text-red-500"}`}>
                                {isCorrect ? "Goed gedaan! het juiste antwoord is: ✅" : "Helaas ❌ het juiste antwoord is:"}
                            </p>
                            <p className="text-lg font-semibold">{exercise.correctAnswer}</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-lg text-center font-semibold text-red-500">{wrongAnswer}</p>
                            <p className="text-xl mb-6 text-center">{exercise.question}</p>

                            <div className="flex flex-col gap-6 items-center">
                                <div className="mb-6 text-center">
                                    <textarea
                                        value={answers}
                                        onChange={(e) => handleChange(e.target.value)}
                                        className="border-4 border-button-bg mx-1 w-96 h-40 text-lg p-4 bg-gray-100 rounded-lg shadow"
                                        placeholder="Schrijf hier je antwoord..."
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <button
                onClick={checkAnswers}
                className={`mt-4 px-4 py-2 rounded-lg shadow-md ${
                    showCorrectAnswer || !answers.trim()
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-progress-Done text-white"
                }`}
                disabled={showCorrectAnswer || !answers.trim()}
            >
                Controleer antwoord
            </button>

            <div className="flex flex-col items-center mb-2">
                {!showCorrectAnswer ? (
                    <>
                        <h1 className="text-xl m-1 font-k2d">Kansen:</h1>
                        <div className="flex flex-row justify-center gap-4">
                            {[...Array(limitCheck + 1)].map((_, i) => (
                                <FaHeart
                                    key={i}
                                    size={30}
                                    className={i < amountChecked ? "text-gray-500" : "text-red-400"}
                                />
                            ))}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}

export default OpenVraag;
