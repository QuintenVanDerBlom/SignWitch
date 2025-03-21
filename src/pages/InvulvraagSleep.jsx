import {useEffect, useState} from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaHeart } from "react-icons/fa"; // FontAwesome-iconen


const ITEM_TYPE = "WORD";
import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl }) => {
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
    const correctAnswer = exercise.answer.split(/[\s,]+/);
    const [videoURL, setVideoURL] = useState("");
    const [options, setOptions] = useState([]);
    const [answers, setAnswers] = useState(Array(correctAnswer.length).fill(null));
    const exerciseQuestion = exercise.question.split(/[\s,]+/);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [wrongAnswer, setWrongAnswer] = useState("");
    const [error, setError] = useState(null);

    let limitCheck = 2;
    let [amountChecked, setAmountChecked] = useState(0);
    useEffect(() => {
        setWrongAnswer("Helaas ❌, probeer het nog een keer.")
    }, [amountChecked]);

// ✅ Reset antwoorden bij een nieuwe vraag
    useEffect(() => {
        setAnswers(Array(correctAnswer.length).fill(null));
        setIsCorrect(null);
        setShowCorrectAnswer(false);
        setAmountChecked(0)
        setWrongAnswer("")
        setVideoURL(exercise.video)
    }, [exercise]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://145.24.223.94:8000/categories/${exercise.category}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'apikey': '9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const categorySign = data.categorySigns[0];
                if (!categorySign) return;

                const multipleChoiceResponse = await fetch(`http://145.24.223.94:8000/exercises/multiplechoice/${categorySign._id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'apikey': '9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz',
                    },
                });

                if (!multipleChoiceResponse.ok) {
                    throw new Error('Network response was not ok');
                }

                const multipleChoiceData = await multipleChoiceResponse.json();

                // Pak de correcte antwoorden uit de huidige oefening
                const correctAnswers = exercise.answer.split(/[\s,]+/);

                // Pak de foute antwoorden uit de multiplechoice API
                const wrongAnswers = multipleChoiceData.choices
                    .map(choice => choice.title)
                    .filter(choice => !correctAnswers.includes(choice)); // Vermijd dubbele correcte antwoorden

                // Combineer correct en fout, en shuffle het resultaat
                const allAnswers = [...correctAnswers, ...wrongAnswers]
                    .sort(() => Math.random() - 0.5); // Shuffle de antwoorden

                setOptions(allAnswers);

            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    // 🎯 Woord wordt gesleept en neergezet
    const handleDrop = (index, item) => {
        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[index] = item.text; // Plaats het gesleepte woord op de juiste plaats
            return newAnswers;
        });
    };


    // ✅ Controleer of de antwoorden kloppen
    const checkAnswers = () => {
        const correct = correctAnswer.every((word, i) => word === answers.filter(a => a !== null)[i]);
        setAmountChecked((prev) => prev + 1);
        if(amountChecked < limitCheck && !correct) {
            setAnswers(Array(exerciseQuestion.length).fill(null));
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

            <div className="flex flex-col items-center w-screen h-1/2 text-black dark:text-gray-200">

                <h1 className="underline text-xl m-2">Sleep in de juiste volgorde</h1>

                <div className="flex flex-row w-full justify-between px-20 items-center gap-10">
                    <div className="flex justify-end ml-10">
                        <VideoPlayer
                            videoUrl = {videoURL}
                        />
                    </div>

                    <div className="w-1/2 mr-10">
                        {/* 🔹 Toon de volledige correcte zin na controle */}
                        {showCorrectAnswer ? (
                            <div className="text-center"> {/* ✅ JSX heeft één hoofdelement nodig */}
                                <p className={`text-xl font-semibold ${isCorrect ? "text-green-600" : "text-red-500"}`}>
                                    {isCorrect ? "Goed gedaan! ✅" : "Helaas ❌ het juiste antwoord is:"}
                                </p>

                                <p className="text-xl font-semibold">
                                    {(() => {
                                        let fillIndex = 0; // Houd bij welke invulling we gebruiken
                                        return exerciseQuestion.map((word, index) =>
                                                word === "___" || word === "___?" || word === "___." ? (
                                                    <span key={index} className="font-bold text-blue-600">
                    {correctAnswer[fillIndex++]} {/* Gebruik en verhoog de teller */}
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
                                {exerciseQuestion.map((word, index) =>
                                    word === "___" || word === "___?" || word === "___." ? (
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
                                {options.map((word, index) => (
                                    // console.log(index),
                                    <DraggableWord key={index} text={word}/>
                                ))}
                            </div>
                        )}
                    </div>

                </div>


                <button
                    onClick={checkAnswers}
                    className={`mt-4 px-4 py-2 rounded-lg shadow-md ${showCorrectAnswer ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-progress-Done text-white" }`}
                    disabled={showCorrectAnswer}
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
            {children || "___"} {/* Toon het juiste antwoord als het er is */}
        </span>
    );
};


export default InvulVraagSleep;
