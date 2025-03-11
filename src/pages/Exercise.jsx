import { useState } from "react";
import { useParams } from "react-router-dom";
import InvulVraagSleep from "./InvulvraagSleep.jsx";
import MultipleChoiceQuiz from "./Quizzes/MultipleChoiceQuiz.jsx"; // Importeren als je die al hebt

function Exercise() {
    const { exercise_id } = useParams();

    // De vragen
    const [questions, setQuestions] = useState([
        // Je vragenarray zoals je hierboven hebt opgegeven
        {
            id: 1,
            question: ["De", "___", "schijnt", "en", "de", "lucht", "is", "helemaal", "___"],
            type: 'fill_in_the_blank',
            category_id: 1,
            possibleAnswers: ["zon", "blauw", "maan", "rood"],
            correctAnswer: ["zon", "blauw"]
        },
        {
            id: 6,
            question: 'Welk gebaar betekent "Hallo" in gebarentaal?',
            type: 'multiple_choice',
            category_id: 1,
            possibleAnswers: ['Hand omhoog', 'Vingers in de lucht steken', 'Hoofd knikken', 'Vrede teken'],
            correctAnswer: 'Hand omhoog'
        },
        // Voeg de rest van de vragen toe
    ]);

    // Bewaar de index van de huidige vraag
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Score tracking
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });

    // Haal de huidige vraag uit de array
    const currentQuestion = questions[currentQuestionIndex];

    // Volgende vraag afhandelen
    const handleNextQuestion = (isCorrect) => {
        // Score bijwerken
        if (isCorrect) {
            setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
        } else {
            setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
            // Voeg foutieve vraag opnieuw toe aan het einde van de lijst
            setQuestions((prevQuestions) => [...prevQuestions, currentQuestion]);
        }

        // Volgende vraag instellen
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };

    // Vorige vraag afhandelen
    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : questions.length - 1
        );
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-title-color text-4xl font-k2d">Opdracht {exercise_id}</h1>
            <p className="text-title-color text-lg font-openSans">Hier komt de uitleg van de opdracht</p>

            {/* Weergeven van de huidige vraag afhankelijk van het type */}
            <div className="flex flex-col items-center mt-8">
                {currentQuestion.type === 'fill_in_the_blank' ? (
                    <InvulVraagSleep
                        question={currentQuestion}
                        onNext={handleNextQuestion}
                    />
                ) : (
                    <MultipleChoiceQuiz
                        question={currentQuestion}
                        onNext={handleNextQuestion}
                    />
                )}
            </div>

            {/* Score weergeven */}
            <div className="mt-4">
                <p>Score: {score.correct} correct, {score.incorrect} incorrect</p>
            </div>

            {/* Navigatie knoppen */}
            <div className="mt-6">
                <button
                    className="btn"
                    onClick={handlePreviousQuestion}
                >
                    Vorige
                </button>
                <button
                    className="btn ml-4"
                    onClick={() => handleNextQuestion(false)}
                >
                    Volgende
                </button>
            </div>
        </div>
    );
}

export default Exercise;
