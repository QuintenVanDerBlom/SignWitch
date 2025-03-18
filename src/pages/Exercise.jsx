import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import InvulVraagSleep from "./InvulvraagSleep.jsx";
import MultipleChoice from "../components/MultipleChoice.jsx";
import InvulvraagOpen from "./InvulvraagOpen.jsx";


function Exercise() {
    const { category_id } = useParams();

        const [category, setCategory] = useState([]);
    const [error, setError] = useState(null);
    const [lesson, setLesson] = useState([]);

    const [signs, setSigns] = useState([]);
    const [questions, setQuestions] = useState([]);
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
                setLesson(data.lesson)
                const lessonSigns = data.items.lessonSigns;

                // Directly loop through the lessonSigns without using state yet
                lessonSigns.forEach(sign => {
                    fetch(`http://145.24.223.94:8000/exercises/multiplechoice/${sign._id}`, {
                        method: 'GET', // Hier is de GET methode ook nodig
                        headers: {
                            'Accept': 'application/json',
                            'apikey': '9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz', // Zorg ervoor dat je dezelfde API key gebruikt
                        },
                    })
                        .then(response => response.json())
                        .then(data => {
                            setQuestions(prevQuestions => [...prevQuestions, { ...data, type: 'multiple_choice' }]);
                        })
                        .catch(error => {
                            console.error("Er is een fout opgetreden bij het ophalen van de vraag:", error);
                        });
                });

                // Set the signs state only after the loop
                setSigns(lessonSigns);
                // console.log(data.lesson)
            } catch (error) {
                setError(error.message);  // Zet de fout in de state in
            }
        };

        fetchData();
    }, []);  // Dit zorgt ervoor dat de fetch alleen uitgevoerd wordt bij de eerste render


    useEffect(() => {
        if (lesson.length === 0) return; // Voorkom een onnodige fetch als lesson nog niet geladen is

        const fetchData = async () => {
            try {
                const response = await fetch(`http://145.24.223.94:8000/lessons/${lesson}`, {
                    method: 'GET', // Dit zorgt ervoor dat de fetch een GET request is
                    headers: {
                        'Accept': 'application/json', // Dit geeft aan dat je JSON verwacht als antwoord
                        'apikey': '9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz', // Je API key om toegang te krijgen
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data)
            } catch (error) {
                setError(error.message);  // Zet de fout in de state in
            }
        };

        fetchData();
    }, [lesson]);  // Dit zorgt ervoor dat de fetch alleen uitgevoerd wordt bij de eerste render
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`http://145.24.223.94:8000/exercises`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'apikey': '9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz',
    //                 },
    //             });
    //
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //
    //             const data = await response.json();
    //
    //             // Hier kun je de filtering op category_id toevoegen
    //             const filteredExercises = data.items.filter(exercise => {
    //                 return exercise.category === category_id;
    //             });
    //
    //             // Voeg de gefilterde oefeningen toe aan de questions state
    //             filteredExercises.forEach(exercise => {
    //                 setQuestions(prevQuestions => [
    //                     ...prevQuestions,
    //                     { ...exercise }
    //                 ]);
    //             });
    //
    //         } catch (error) {
    //             setError(error.message);  // Zet de fout in de state in
    //         }
    //     };
    //
    //     fetchData();
    // }, []);  // Dit zorgt ervoor dat de fetch opnieuw wordt uitgevoerd als lessonSigns verandert

    console.log(questions)
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
    return (
        <div className="flex flex-col items-center ">
            <div className="flex flex-col items-center justify-center px-4 text-center">
                <h2 className="pt-8 text-title-color text-3xl font-k2d">Opdracht {currentQuestionIndex + 1}</h2>
                <p className="mt-4 text-2xl max-w-2xl font-openSans">
                    {category.categoryName} {(currentQuestion && currentQuestion.type === 'fill_in_the_blank') ? 'Invulvraag' : 'Multiple Choice'}
                </p>
            </div>

            <div className="flex flex-col items-center w-screen">
                {currentQuestion && currentQuestion.type && currentQuestion.type === 'fill_in_the_blank' ? (
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
                ) : currentQuestion && currentQuestion.type === 'multiple_choice' ? (
                    <MultipleChoice
                        question={currentQuestion}
                        onNext={handleNextQuestion}
                        setScore={setScore}
                        setIsChecked={setIsChecked}
                    />
                ) : (
                    <p>Loading...</p> // Je kunt een loading state toevoegen voor het geval de vraag nog niet is geladen
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