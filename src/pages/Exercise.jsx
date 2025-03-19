import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import InvulVraagSleep from "./InvulvraagSleep.jsx";
import MultipleChoice from "../components/MultipleChoice.jsx";
import InvulvraagOpen from "./InvulvraagOpen.jsx";
import OpenVraag from "./OpenVraag.jsx";

function Exercise() {
    const loginData = useOutletContext();
    const [userID, setUserID] = useState("");

    const { category_id } = useParams();

    const [category, setCategory] = useState([]);
    const [error, setError] = useState(null);
    const [lesson, setLesson] = useState([]);
    const [categories, setCategories] = useState([]);

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
                setCategory(data);
                setLesson(data.lesson);
                const categorySigns = data.categorySigns;
                categorySigns.forEach(sign => {
                    fetch(`http://145.24.223.94:8000/exercises/multiplechoice/${sign._id}`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'apikey': '9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz',
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

                setSigns(categorySigns);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const [currentLessonProgress, setCurrentLessonProgress] = useState(0);
    useEffect(() => {

        const fetchUser = async () => {
            try {
                const response = await fetch(`http://145.24.223.94:8000/users/${loginData.email}`, {
                    method: "GET",
                    headers: {
                        "apiKey": "9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz",
                        "Accept": "application/json",
                    },
                });
                const data = await response.json();

                setUserID(data._id);
                const lessonprogress = data.lessonProgress;
                const lessonP = lessonprogress.find(progress => progress.lesson_id === lesson);
                if (lessonP) {
                    setCurrentLessonProgress(lessonP.progress);
                    console.log('Huidige voortgang:', currentLessonProgress);
                    return currentLessonProgress;
                } else {
                    console.log('Geen voortgang gevonden voor deze les');
                    return null;
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (lesson.length === 0) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`http://145.24.223.94:8000/lessons/${lesson}`, {
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
                setCategories(data.items.lessonCategories)

            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [lesson]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://145.24.223.94:8000/exercises`, {
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

                const filteredExercises = data.items.filter(exercise => {
                    return exercise.category === category_id;
                });

                filteredExercises.forEach(exercise => {
                    setQuestions(prevQuestions => [
                        ...prevQuestions,
                        { ...exercise }
                    ]);
                });

            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });
    const [isChecked, setIsChecked] = useState(false);
    const [toggle, setToggle] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;

    const navigate = useNavigate();
    const [answeredQuestions, setAnsweredQuestions] = useState({});

    async function updateProgress(id, addProgress) {
        try {
            const response = await fetch(`http://145.24.223.94:8000/users/${userID}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "apiKey": "9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz",
                },
                body: JSON.stringify({
                    lessonId: id,
                    progress: (currentLessonProgress + addProgress),
                })
            });

            if (!response.ok) {
                throw new Error("Fout bij updaten van progress");
            }

            console.log(`Favoriet ${id} succesvol geüpdatet!`);
        } catch (error) {
            console.error("Fout bij het updaten van favoriet:", error);
        }
    }

    const handleNextQuestion = () => {
        setAnsweredQuestions((prev) => ({
            ...prev,
            [currentQuestionIndex]: true,
        }));
        setIsChecked(false);

        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex >= questions.length) {
            navigate(`/opdracht/${category_id}/done`, { state: { score } });
            const calc = 1 / categories.length * 100;
            updateProgress(lesson, calc);
        } else {
            setCurrentQuestionIndex(nextIndex);
            setToggle(!toggle);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
            setIsChecked(true);
        }
    };

    return (
        <div className="flex flex-col items-center ">
            <div className="flex flex-col items-center justify-center px-4 text-center">
                <h2 className="pt-8 text-title-color dark:text-gray-200 text-3xl font-k2d">Opdracht {currentQuestionIndex + 1}</h2>
                <p className="mt-4 text-2xl max-w-2xl font-openSans text-black dark:text-gray-200">
                    {category.categoryName} {(currentQuestion && currentQuestion.type === 'drag') ? 'Invulvraag' : currentQuestion && currentQuestion.type === 'multiple_choice' ? 'Multiple Choice' : 'Open vraag'}
                </p>
            </div>

            <div className="flex flex-col items-center w-screen">
                {currentQuestion && currentQuestion.type && currentQuestion.type === 'drag' ? (
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
                            category_id={category_id}
                            onNext={handleNextQuestion}
                            setScore={setScore}
                            setIsChecked={setIsChecked}
                        />
                    )
                ) : currentQuestion && currentQuestion.type && currentQuestion.type === 'multiple_choice' ? (
                    <MultipleChoice
                        question={currentQuestion}
                        onNext={handleNextQuestion}
                        setScore={setScore}
                        setIsChecked={setIsChecked}
                    />
                ) : currentQuestion && currentQuestion.type && currentQuestion.type === 'open_question' ? (
                    <OpenVraag
                        exercise={currentQuestion}
                        onNext={handleNextQuestion}
                        setScore={setScore}
                        setIsChecked={setIsChecked}
                    />
                ) : (
                    <p>loading...</p>
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
                    disabled={currentQuestionIndex === 0} // Zorg ervoor dat de vorige knop alleen werkt als we niet op de eerste vraag zitten
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
                <div className="bg-progress-Done h-full rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
            </div>
        </div>
    );
}

export default Exercise;
