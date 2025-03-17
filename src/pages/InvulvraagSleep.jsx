import {useEffect, useState} from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaHeart } from "react-icons/fa"; // FontAwesome-iconen


const ITEM_TYPE = "WORD";
import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoId, playlistId }) => {
    const videoUrl = `https://youtu.be/hglEJkVy1L8?t=18`;

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


function InvulVraagSleep({ exercise, setScore, setIsChecked }) {
    const [answers, setAnswers] = useState(Array(exercise.correctAnswer.length).fill(null));
    const [isCorrect, setIsCorrect] = useState(null);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [wrongAnswer, setWrongAnswer] = useState("");
    let limitCheck = 2;
    let [amountChecked, setAmountChecked] = useState(0);
    useEffect(() => {
        setWrongAnswer("Helaas ❌, probeer het nog een keer.")
    }, [amountChecked]);

// ✅ Reset antwoorden bij een nieuwe vraag
    useEffect(() => {
        setAnswers(Array(exercise.correctAnswer.length).fill(null));
        setIsCorrect(null);
        setShowCorrectAnswer(false);
        setAmountChecked(0)
        setWrongAnswer("")
    }, [exercise]);


    // 🎯 Woord wordt gesleept en neergezet
    const handleDrop = (index, item) => {
        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];

            if (!newAnswers.includes(item.text)) {
                newAnswers[index] = item.text;
            }
            return newAnswers;
        });
    };

    // ✅ Controleer of de antwoorden kloppen
    const checkAnswers = () => {
        const correct = exercise.correctAnswer.every((word, i) => word === answers.filter(a => a !== null)[i]);
        setAmountChecked((prev) => prev + 1);
        if(amountChecked < limitCheck && !correct) {
            setAnswers(Array(exercise.question.length).fill(null));
            setIsCorrect(null);
        }else{
            setIsCorrect(correct);
            if (correct) {
                setScore((prev) => ({...prev, correct: prev.correct + 1}));
            } else {
                setScore((prev) => ({...prev, incorrect: prev.incorrect + 1}));
            }

            setIsChecked(true);
            setShowCorrectAnswer(true); // ✅ Laat de volledige correcte zin zien
        }
    };

    return (

        <DndProvider backend={HTML5Backend}>

            <div className="flex flex-col items-center w-screen h-1/2">

                <h1 className="underline text-xl m-2">Sleep in de juiste volgorde</h1>

                <div className="flex flex-row w-full justify-between px-20 items-center gap-10">
                    <div className="flex justify-end ml-10">
                        <VideoPlayer
                            videoId="hglEJkVy1L8" // <-- Dit is de video die moet starten
                            playlistId="PLP8IosJB9PlUueQCTSe82RoQRSB3rGyTe"
                        />
                    </div>

                    <div className="w-1/2 mr-10">
                        {/* 🔹 Toon de volledige correcte zin na controle */}
                        {showCorrectAnswer ? (
                            <div className="text-center"> {/* ✅ JSX heeft één hoofdelement nodig */}
                                <p className={`text-lg font-semibold ${isCorrect ? "text-green-600" : "text-red-500"}`}>
                                    {isCorrect ? "Goed gedaan! ✅" : "Helaas ❌ het juiste antwoord is:"}
                                </p>

                                <p className="text-lg font-semibold">
                                    {(() => {
                                        let fillIndex = 0; // Houd bij welke invulling we gebruiken
                                        return exercise.question.map((word, index) =>
                                                word === "___" ? (
                                                    <span key={index} className="font-bold text-blue-600">
                    {exercise.correctAnswer[fillIndex++]} {/* Gebruik en verhoog de teller */}
                </span>
                                                ) : (
                                                    <span key={index} className="mr-1">{word}</span>
                                                )
                                        );
                                    })()}
                                </p>

                            </div>
                        ) : (
                            <p className="text-xl mb-6 text-center">
                                <p className="text-lg font-semibold text-red-500">
                                    {wrongAnswer}
                                </p>
                                {exercise.question.map((word, index) =>
                                    word === "___" ? (
                                        <DropZone key={index} index={index} onDrop={handleDrop}>
                                            {answers[index]}
                                        </DropZone>
                                    ) : (
                                        <span key={index}> {word} </span>
                                    )
                                )}
                            </p>

                        )}

                        {/* 🔹 Alleen tonen als het juiste antwoord nog NIET is getoond */}
                        {!showCorrectAnswer && (
                            <div className="mt-4 flex flex-wrap gap-2 justify-center">
                                {exercise.possibleAnswers.map((word, index) => (
                                    <DraggableWord key={index} text={word}/>
                                ))}
                            </div>
                        )}
                    </div>

                </div>


                <button
                    onClick={checkAnswers}
                    className={`mt-4 px-4 py-2 rounded-lg shadow-md ${showCorrectAnswer ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-progress-Done text-white"}`}
                    disabled={showCorrectAnswer}
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
                                {/*                <div*/}
                                {/*                    className={`flex items-center justify-center w-16 h-16 rounded-full text-white text-2xl font-openSans */}
                                {/*${limitCheck + 1 - amountChecked === 3 ? "bg-red-500" :*/}
                                {/*                        limitCheck + 1 - amountChecked === 2 ? "bg-orange-500" :*/}
                                {/*                            "bg-green-500"}`}*/}
                                {/*                >*/}
                                {/*                    {limitCheck + 1 - amountChecked}*/}
                                {/*                </div>*/}

                            </div>
                        </>
                    ) : null}
                </div>

                {/* Feedback weergeven */}
            </div>
        </DndProvider>
    );
}

// 📌 Draggable woord component
const DraggableWord = ({text}) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: ITEM_TYPE,
        item: {text},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`min-w-20 p-2 bg-login-container flex justify-center text-white rounded-md cursor-pointer shadow-md ${isDragging ? "opacity-50" : "opacity-100"}`}
        >
            {text}
        </div>
    );
};

// 📌 DropZone component (voor de lege plekken)
const DropZone = ({index, onDrop, children}) => {
    const [{isOver}, drop] = useDrop(() => ({
        accept: ITEM_TYPE,
        drop: (item) => onDrop(index, item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <span
            ref={drop}
            className={`min-w-20 inline-block w-40 h-8 border-2 border-dashed rounded-md text-center align-middle ${
                isOver ? "border-blue-500 bg-blue-100" : "border-gray-400"
            }`}
        >
            {children || "___"}
        </span>
    );
};

export default InvulVraagSleep;
