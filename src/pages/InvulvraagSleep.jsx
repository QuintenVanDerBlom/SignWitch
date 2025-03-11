import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ITEM_TYPE = "WORD";

function InvulVraagSleep({ exercise} ) {

    const [answers, setAnswers] = useState(Array(exercise.question.length).fill(null));
    const [isCorrect, setIsCorrect] = useState(null); // null = nog niet gecheckt, true = goed, false = fout

    // 🎯 Woord wordt gesleept en neergezet
    const handleDrop = (index, item) => {
        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];

            // Voorkom dat een woord dubbel wordt gebruikt
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
    };

    // 🔄 Reset de antwoorden en feedback
    const resetAnswers = () => {
        setAnswers(Array(exercise.question.length).fill(null));
        setIsCorrect(null); // Reset de feedback
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col items-center">
                <h1 className="underline text-lg m-5">Sleep in de juiste volgorde</h1>
                <div className="flex flex-row w-full justify-between px-20 items-center gap-10">
                    {/* Vraag aan de linkerkant */}
                    <div className="w-1/2 flex justify-end ml-10">
                        <video width="640" height="360" controls className="rounded-lg shadow-lg">
                            <source src={exercise.video} type="video/mp4"/>
                            Je browser ondersteunt deze video niet.
                        </video>
                    </div>
                    <div className="w-1/2 mr-10">
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
                        <div className="mt-4 flex flex-wrap gap-2">
                            {exercise.possibleAnswers.map((word, index) => (
                                <DraggableWord key={index} text={word}/>
                            ))}
                        </div>

                        {/* Controleer-knop */}


                        {/* Reset-knop */}
                        <button
                            onClick={resetAnswers}
                            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md"
                        >
                            Reset
                        </button>

                        {/* Feedback weergeven */}

                    </div>
                </div>
                <button
                    onClick={checkAnswers}
                    className="mt-4 px-4 py-2 bg-progress-Done text-white rounded-lg shadow-md"
                >
                    Controleer antwoord
                </button>
                {isCorrect !== null && (
                    <p className={mt-2 text-lg font-bold ${isCorrect ? "text-green-500" : "text-red-500"}}>
                        {isCorrect ? "Goed gedaan! ✅" : "Helaas, probeer opnieuw ❌"}
                    </p>
                )}
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
            className={p-2 bg-blue-500 text-white rounded-md cursor-pointer shadow-md ${isDragging ? "opacity-50" : "opacity-100"}}
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
            className={inline-block w-20 h-8 border-2 border-dashed rounded-md text-center align-middle ${
                isOver ? "border-blue-500 bg-blue-100" : "border-gray-400"
            }}
        >
            {children || "___"}
        </span>
    );
};

export default InvulVraagSleep;