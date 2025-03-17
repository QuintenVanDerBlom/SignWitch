import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import InvulVraagSleep from "./InvulvraagSleep.jsx";
import MultipleChoice from "../components/MultipleChoice.jsx";
import InvulvraagOpen from "./InvulvraagOpen.jsx";


function Exercise() {
    const { category_id } = useParams();

    const [questions, setQuestions] = useState([
        // Je vragenarray zoals je hierboven hebt opgegeven
        // Invulvragen
        {
            id: 1,
            question: ["De", "___", "is", "begonnen", "en", "het", "is", "de", "bedoeling", "dat", "jullie", "goed", "___", "En", "volgende", "les", "de", "opdracht", "goed", "voorbereiden"],
            type: 'fill_in_the_blank',
            category_id: 1,
            possibleAnswers: ["huiswerkoefening", "oefenen", "voorbereiden", "taak", "opdracht", "training"],
            correctAnswer: ["huiswerkoefening", "oefenen"]
        },
        {
            id: 2,
            question: ["Wil", "je", "alsjeblieft", "de", "___", "of", "___", "pakken?"],
            type: 'fill_in_the_blank',
            category_id: 1,
            possibleAnswers: ["koffie", "thee", "water", "sap", "drank"],
            correctAnswer: ["koffie", "thee"]
        },
        {
            id: 11,
            question: 'Welk gebaar zie je hier?',
            type: 'multiple_choice',
            category_id: 1,
            possibleAnswers: ['Hoeveel', 'Wanneer', 'Waar', 'Hoelang'],
            correctAnswer: 'Hoeveel'
        },
        // {
        //     id: 3,
        //     question: ["Welkom,", "ik", "zal", "mij", "even", "___", "Mijn", "voornaam", "is", "___", "mijn", "naam", "is", "___", "Mijn", "achternaam", "is", "___"],
        //     type: 'fill_in_the_blank',
        //     category_id: 2,
        //     possibleAnswers: ["voorstellen", "makkelijk", "naambordje", "niet", "moeilijk", "naam", "zelf"],
        //     correctAnswer: ["voorstellen", "makkelijk", "naambordje", "niet moeilijk"]
        // },
        // {
        //     id: 4,
        //     question: ["De", "les", "begin", "ik", "met", "koffie", "drinken,", "thuis", "drink", "ik", "___"],
        //     type: 'fill_in_the_blank',
        //     category_id: 1,
        //     possibleAnswers: ["thee", "water", "sap", "koffie", "drankje"],
        //     correctAnswer: ["thee"]
        // },
        // {
        //     id: 5,
        //     question: ["Ik", "ben", "op", "tijd", "aanwezig", "voor", "de", "les", "en", "zet", "de", "tafels", "en", "stoelen", "goed", "in", "het", "___"],
        //     type: 'fill_in_the_blank',
        //     category_id: 1,
        //     possibleAnswers: ["lokaal", "klas", "ruimte", "leslokaal", "zaal"],
        //     correctAnswer: ["lokaal"]
        // },
        // {
        //     id: 6,
        //     question: ["Nu", "is", "de", "oefening", "klaar", "Was", "het", "___", "of", "___", "?" ],
        //     type: 'fill_in_the_blank',
        //     category_id: 2,
        //     possibleAnswers: ["makkelijk", "moeilijk", "interessant", "saai", "leuk", "langzaam"],
        //     correctAnswer: ["makkelijk", "moeilijk"]
        // },
        // // Multiple-choice vragen
        // {
        //     id: 12,
        //     question: 'Welk gebaar zie je hier?',
        //     type: 'multiple_choice',
        //     category_id: 1,
        //     possibleAnswers: ['Hoeveel', 'Wanneer', 'Waar', 'Hoelang'],
        //     correctAnswer: 'Wanneer'
        // },
        // {
        //     id: 13,
        //     question: 'Welk gebaar zie je hier?',
        //     type: 'multiple_choice',
        //     category_id: 1,
        //     possibleAnswers: ['Waar', 'Hoeveel', 'Hoelang', 'Wanneer'],
        //     correctAnswer: 'Waar'
        // },
        // {
        //     id: 14,
        //     question: 'Welk gebaar zie je hier?',
        //     type: 'multiple_choice',
        //     category_id: 1,
        //     possibleAnswers: ['Hoelang', 'Wat', 'Hoeveel', 'Waar'],
        //     correctAnswer: 'Hoelang'
        // },
        // {
        //     id: 15,
        //     question: 'Welk gebaar zie je hier?',
        //     type: 'multiple_choice',
        //     category_id: 1,
        //     possibleAnswers: ['Wat', 'Hoeveel', 'Waar', 'Hoelang'],
        //     correctAnswer: 'Wat'
        // },
        // {
        //     id: 16,
        //     question: 'Welk gebaar zie je hier?',
        //     type: 'multiple_choice',
        //     category_id: 1,
        //     possibleAnswers: ['Hoeveel', 'Wat', 'Hoelang', 'Welke'],
        //     correctAnswer: 'Hoeveel'
        // },
        // {
        //     id: 17,
        //     question: 'Welk gebaar zie je hier?',
        //     type: 'multiple_choice',
        //     category_id: 1,
        //     possibleAnswers: ['Welk', 'Waarom', 'Wat', 'Hoeveel'],
        //     correctAnswer: 'Welk'
        // },
        // {
        //     id: 18,
        //     question: 'Welk gebaar zie je hier?',
        //     type: 'multiple_choice',
        //     category_id: 1,
        //     possibleAnswers: ['Tijdens de les', 'Na school', 'In de pauze', 'Thuis'],
        //     correctAnswer: 'Tijdens de les'
        // },
        // {
        //     id: 19,
        //     question: 'Welk gebaar zie je hier?',
        //     type: 'multiple_choice',
        //     category_id: 1,
        //     possibleAnswers: ['Aanwezig', 'Afwezig', 'Ziek', 'Absent'],
        //     correctAnswer: 'Aanwezig'
        // },
        // {
        //     id: 20,
        //     question: 'Welk gebaar zie je hier?',
        //     type: 'multiple_choice',
        //     category_id: 1,
        //     possibleAnswers: ['Makkelijk', 'Moeilijk', 'Gemiddeld', 'Eenvoudig'],
        //     correctAnswer: 'Makkelijk'
        // },
        // {
        //     id: 21,
        //     question: 'Welk gebaar zie je hier?',
        //     type: 'multiple_choice',
        //     category_id: 1,
        //     possibleAnswers: ['Volgende', 'Vorige', 'Eerdere', 'Laatste'],
        //     correctAnswer: 'Volgende'
        // },
        // {
        //     id: 22,
        //     question: 'Welk gebaar zie je hier?',
        //     type: 'multiple_choice',
        //     category_id: 1,
        //     possibleAnswers: ['Bedoeling', 'Doel', 'Motief', 'Verklaring'],
        //     correctAnswer: 'Bedoeling'
        // },
        // {
        //     id: 23,
        //     question: 'Welk gebaar zie je hier?',
        //     type: 'multiple_choice',
        //     category_id: 1,
        //     possibleAnswers: ['Meenemen', 'Halen', 'Brengen', 'Leiden'],
        //     correctAnswer: 'Meenemen'
        // },
        // {
        //     id: 24,
        //     question: 'Welk gebaar zie je hier?',
        //     type: 'multiple_choice',
        //     category_id: 1,
        //     possibleAnswers: ['Voorbeeld', 'Oefening', 'Uitleg', 'Les'],
        //     correctAnswer: 'Voorbeeld'
        // },
        // {
        //     id: 25,
        //     question: 'Welk gebaar zie je hier?',
        //     type: 'multiple_choice',
        //     category_id: 1,
        //     possibleAnswers: ['Beginnen', 'Stoppen', 'Wachten', 'Voortgaan'],
        //     correctAnswer: 'Beginnen'
        // },
        // {
        //     id: 26,
        //     question: 'Welk gebaar zie je hier?',
        //     type: 'multiple_choice',
        //     category_id: 1,
        //     possibleAnswers: ['Moeilijk', 'Gemakkelijk', 'Middelmatig', 'Verschillend'],
        //     correctAnswer: 'Moeilijk'
        // },
        // {
        //     id: 27,
        //     question: 'Welk gebaar zie je hier?',
        //     type: 'multiple_choice',
        //     category_id: 1,
        //     possibleAnswers: ['Voorbereiden', 'Leiden', 'Plannen', 'Uitvoeren'],
        //     correctAnswer: 'Voorbereiden'
        // },
        // {
        //     id: 28,
        //     question: 'Welk gebaar zie je hier?',
        //     type: 'multiple_choice',
        //     category_id: 1,
        //     possibleAnswers: ['Boek', 'Schrift', 'Map', 'Pen'],
        //     correctAnswer: 'Boek'
        // },
        // {
        //     id: 29,
        //     question: 'Welk gebaar zie je hier?',
        //     type: 'multiple_choice',
        //     category_id: 1,
        //     possibleAnswers: ['Nu', 'Later', 'Eerder', 'Ooit'],
        //     correctAnswer: 'Nu'
        // },
        // {
        //     id: 30,
        //     question: 'Welk gebaar zie je hier?',
        //     type: 'multiple_choice',
        //     category_id: 1,
        //     possibleAnswers: ['Vorige', 'Heden', 'Toekomst', 'Verleden'],
        //     correctAnswer: 'Vorige'
        // }
        // Voeg de rest van de vragen toe
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });
    const [isChecked, setIsChecked] = useState(false);
    const [toggle, setToggle] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;
    // 🔄 Volgende vraag
    const navigate = useNavigate(); // Voeg deze regel toe binnen de function
    const [answeredQuestions, setAnsweredQuestions] = useState({}); // Bijhouden welke vragen al beantwoord zijn

    const handleNextQuestion = () => {
        setAnsweredQuestions((prev) => ({
            ...prev,
            [currentQuestionIndex]: true, // Markeer als beantwoord
        }));
        setIsChecked(false)

        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex >= questions.length) {
            navigate(`/opdracht/${category_id}/done`, { state: { score } });
        } else {
            setCurrentQuestionIndex(nextIndex);
            setToggle(!toggle);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
            setIsChecked(true); // Voorkomt dat het opnieuw beantwoord wordt
        }
    };
    const [category, setCategory] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://145.24.223.94:8000/categories/${category_id}`, {
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
                setCategory(data)
                console.log(data)
            } catch (error) {
                setError(error.message);  // Zet de fout in de state in
            }
        };

        fetchData();
    }, []);  // Dit zorgt ervoor dat de fetch alleen uitgevoerd wordt bij de eerste render




    return (
        <div className="flex flex-col items-center ">
            <div className="flex flex-col items-center justify-center px-4 text-center">
                <h2 className="pt-8 text-title-color text-3xl font-k2d">Opdracht {currentQuestionIndex + 1}</h2>
                <p className="mt-4 text-2xl max-w-2xl font-openSans">
                    {category.categoryName} {(currentQuestion.type === 'fill_in_the_blank') ? 'Invulvraag' : 'Multiple Choice'}
                </p>
            </div>

            <div className="flex flex-col items-center w-screen">
                {currentQuestion.type === 'fill_in_the_blank' ? (
                    toggle ? (
                        <InvulvraagOpen
                            exercise={currentQuestion}
                            onNext={handleNextQuestion}
                            setScore={setScore}
                            setIsChecked={setIsChecked}
                        />
                    ) : (
                        <InvulVraagSleep
                            exercise={currentQuestion}
                            onNext={handleNextQuestion}
                            setScore={setScore}
                            setIsChecked={setIsChecked}
                        />
                    )
                ) : (
                    <Mul
                        tipleChoice
                        question={currentQuestion}
                        onNext={handleNextQuestion}
                        setScore={setScore}
                        setIsChecked={setIsChecked}
                    />
                )}
            </div>


            <div className="mt-4">
                <p>Score: {score.correct} correct, {score.incorrect} nog te oefenen</p>
            </div>

            {/* Navigatie knoppen */}
            <div className="flex flex-row justify-between w-full">
                <button
                    className="btn bg-gray-500 text-white rounded w-full sm:w-auto m-4 px-5 py-2"
                    onClick={handlePreviousQuestion}
                    disabled={true} // Volgende knop pas actief na controle van het antwoord
                >
                    Vorige
                </button>
                <button
                    className={`btn rounded w-full sm:w-auto m-4 px-5 py-2 ${isChecked ? "bg-progress-Done text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                    onClick={handleNextQuestion}
                    disabled={!isChecked} // Volgende knop pas actief na controle van het antwoord
                >
                    Volgende
                </button>
            </div>

            {/* Voortgangsbalk */}
            <div className="w-1/2 bg-progress-ND h-3 rounded-full">
                <div className="bg-progress-Done h-full rounded-full transition-all duration-300" style={{width: `${progressPercentage}%`}}></div>
            </div>
        </div>
    );
}

export default Exercise;