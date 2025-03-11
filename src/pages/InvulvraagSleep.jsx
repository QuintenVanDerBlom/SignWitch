import {useEffect, useState} from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ITEM_TYPE = "WORD";

function InvulVraagSleep({ exercise, setScore, setIsChecked }) {

    const [answers, setAnswers] = useState(Array(exercise.correctAnswer.length).fill(null));

// ✅ Reset antwoorden bij een nieuwe vraag
    useEffect(() => {
        setAnswers(Array(exercise.correctAnswer.length).fill(null));
        setIsCorrect(null);
        setShowCorrectAnswer(false);
    }, [exercise]);

    const [isCorrect, setIsCorrect] = useState(null);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

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
        setIsCorrect(correct);

        if (correct) {
            setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
        } else {
            setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
        }

        setIsChecked(true);
        setShowCorrectAnswer(true); // ✅ Laat de volledige correcte zin zien
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col items-center">
                <h1 className="underline text-lg m-5">Sleep in de juiste volgorde</h1>
                <div className="flex flex-row w-full justify-between px-20 items-center gap-10">
                    <div className="w-1/2 flex justify-end ml-10">
                        <video width="640" height="360" controls className="rounded-lg shadow-lg">
                            <source src={exercise.video} type="video/mp4"/>
                            Je browser ondersteunt deze video niet.
                        </video>
                    </div>

                    <div className="w-1/2 mr-10">
                        {/* 🔹 Toon de volledige correcte zin na controle */}
                        {showCorrectAnswer ? (
                            <div> {/* ✅ JSX heeft één hoofdelement nodig */}
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
                            // 🔹 Normale vraag met sleepzones
                            <p className="text-lg font-semibold flex flex-wrap gap-2">
                                {exercise.question.map((word, index) =>
                                    word === "___" ? (
                                        <DropZone key={index} index={index} onDrop={handleDrop}>
                                            {answers[index]}
                                        </DropZone>
                                    ) : (
                                        <span key={index}>{word}</span>
                                    )
                                )}
                            </p>
                        )}

                        {/* 🔹 Alleen tonen als het juiste antwoord nog NIET is getoond */}
                        {!showCorrectAnswer && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {exercise.possibleAnswers.map((word, index) => (
                                    <DraggableWord key={index} text={word} />
                                ))}
                            </div>
                        )}
                    </div>

                </div>

                {/* Controleer-knop */}
                {!showCorrectAnswer && (
                    <button
                        onClick={checkAnswers}
                        className="mt-4 px-4 py-2 bg-progress-Done text-white rounded-lg shadow-md"
                    >
                        Controleer antwoord
                    </button>
                )}

                {/* Feedback weergeven */}
            </div>
        </DndProvider>
    );
}

// 📌 Draggable woord component
const DraggableWord = ({ text }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ITEM_TYPE,
        item: { text },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`p-2 bg-blue-500 text-white rounded-md cursor-pointer shadow-md ${isDragging ? "opacity-50" : "opacity-100"}`}
        >
            {text}
        </div>
    );
};

// 📌 DropZone component (voor de lege plekken)
const DropZone = ({ index, onDrop, children }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ITEM_TYPE,
        drop: (item) => onDrop(index, item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <span
            ref={drop}
            className={`inline-block w-20 h-8 border-2 border-dashed rounded-md text-center align-middle ${
                isOver ? "border-blue-500 bg-blue-100" : "border-gray-400"
            }`}
        >
            {children || "___"}
        </span>
    );
};

export default InvulVraagSleep;
