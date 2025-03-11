import { useState } from "react";
import { useParams } from "react-router-dom";
import InvulVraagSleep from "./InvulvraagSleep.jsx";
import MultipleChoice from "../components/MultipleChoice.jsx";

function Exercise() {
    const { exercise_id } = useParams();

    const [questions, setQuestions] = useState([
        // Je vragenarray zoals je hierboven hebt opgegeven
        // Invulvragen
        {
            id: 1,
            question: ["De", "___", "schijnt", "en", "de", "lucht", "is", "helemaal", "___"],
            type: 'fill_in_the_blank',
            category_id: 1,
            possibleAnswers: ["zon", "blauw", "maan", "rood"],
            correctAnswer: ["zon", "blauw"]
        },
        {
            id: 2,
            question: ["Het", "___", "is", "geplaatst", "op", "de", "tafel"],
            type: 'fill_in_the_blank',
            category_id: 1,
            possibleAnswers: ["boek", "glas", "bord", "stoel"],
            correctAnswer: ["boek"]
        },
        {
            id: 3,
            question: ["Ik", "heb", "___", "bij", "mij", "en", "ga", "daarmee", "___"],
            type: 'fill_in_the_blank',
            category_id: 2,
            possibleAnswers: ["telefoon", "laptop", "map", "pen"],
            correctAnswer: ["telefoon", "laptop"]
        },
        {
            id: 4,
            question: ["De", "___", "is", "groen", "en", "heeft", "veel", "___"],
            type: 'fill_in_the_blank',
            category_id: 1,
            possibleAnswers: ["boom", "gras", "bloem", "bladeren"],
            correctAnswer: ["boom", "bladeren"]
        },
        {
            id: 5,
            question: ["De", "___", "zong", "en", "de", "klanken", "vielen", "___"],
            type: 'fill_in_the_blank',
            category_id: 2,
            possibleAnswers: ["vogel", "wind", "regen", "zee"],
            correctAnswer: ["vogel", "wind"]
        },

        // Multiple-choice vragen
        {
            id: 6,
            question: 'Welk gebaar betekent "Hallo" in gebarentaal?',
            type: 'multiple_choice',
            category_id: 1,
            possibleAnswers: ['Hand omhoog', 'Vingers in de lucht steken', 'Hoofd knikken', 'Vrede teken'],
            correctAnswer: 'Hand omhoog'
        },
        {
            id: 7,
            question: 'Wat betekent het gebaar waarbij je de hand op je hart legt?',
            type: 'multiple_choice',
            category_id: 1,
            possibleAnswers: ['Sorry', 'Ik hou van jou', 'Dank je wel', 'Hallo'],
            correctAnswer: 'Ik hou van jou'
        },
        {
            id: 8,
            question: 'Welk gebaar betekent "Ja" in gebarentaal?',
            type: 'multiple_choice',
            category_id: 1,
            possibleAnswers: ['Hoofd knikken', 'Vingers tikken', 'Hand omhoog', 'Schouders ophalen'],
            correctAnswer: 'Hoofd knikken'
        },
        {
            id: 9,
            question: 'Wat betekent het gebaar met de handpalm naar buiten en een draaiende beweging?',
            type: 'multiple_choice',
            category_id: 1,
            possibleAnswers: ['Bedankt', 'Sorry', 'Vrede teken', 'Hallo'],
            correctAnswer: 'Bedankt'
        },
        {
            id: 10,
            question: 'Welk gebaar betekent "Ik weet het niet"?',
            type: 'multiple_choice',
            category_id: 1,
            possibleAnswers: ['Handen omhoog en schouders ophalen', 'Hand op je lippen', 'Handen in de lucht steken', 'Vingers kruis'],
            correctAnswer: 'Handen omhoog en schouders ophalen'
        }
        // Voeg de rest van de vragen toe
    ]);


    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });

    // Nieuwe state: Vraag is nog niet gecontroleerd
    const [isChecked, setIsChecked] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];
    // Voortgang berekenen
    const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;


    // 🔄 Naar volgende vraag gaan (reset `isChecked`)
    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
        setIsChecked(false); // Reset controle-status voor volgende vraag
    };

    // 🔄 Vorige vraag
    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : questions.length - 1));
        setIsChecked(false); // Reset controle-status voor vorige vraag
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-title-color text-4xl font-k2d">Opdracht {currentQuestionIndex +1}</h1>
            <p className="text-title-color text-lg font-openSans">Hier komt de uitleg van de opdracht</p>

            <div className="flex flex-col items-center mt-8">
                {currentQuestion.type === 'fill_in_the_blank' ? (
                    <InvulVraagSleep
                        exercise={currentQuestion}
                        onNext={handleNextQuestion}
                        setScore={setScore}
                        setIsChecked={setIsChecked} // Geeft controle-status door
                    />
                ) : (
                    <MultipleChoice
                        question={currentQuestion}
                        onNext={handleNextQuestion}
                        setScore={setScore}
                        setIsChecked={setIsChecked} // Geeft controle-status door
                    />
                )}
            </div>

            <div className="mt-4">
                <p>Score: {score.correct} correct, {score.incorrect} nog te oefenen</p>
            </div>

            {/* Navigatie knoppen */}
            <div className="mt-6 flex flex-row justify-between w-full">
                <button
                    className="btn bg-gray-500 text-white rounded w-full sm:w-auto m-4 px-5 py-2"
                    onClick={handlePreviousQuestion}
                >
                    Vorige
                </button>
                <button
                    className={`btn rounded w-full sm:w-auto m-4 px-5 py-2 ${
                        isChecked ? "bg-progress-Done text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    onClick={handleNextQuestion}
                    disabled={!isChecked} // Disable als vraag nog niet gecontroleerd is
                >
                    Volgende
                </button>
            </div>
            {/* Voortgangsbalk */}
            <div className="w-1/2 bg-gray-200 h-3 rounded-full mt-6">
                <div className="bg-blue-500 h-full rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
            </div>

        </div>
    );
}

export default Exercise;
