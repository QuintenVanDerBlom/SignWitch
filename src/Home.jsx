import { useOutletContext, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import login from "./pages/login.jsx";

function Home() {
    const [lessons, setLessons] = useState([]);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState([]);

    const [name, setName] = useState('')
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch('http://145.24.223.94:8000/lessons', {
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
                setLessons(data.items);
                console.log(data.items);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://145.24.223.94:8000/users/${loginData.email}`, {
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
                setProgress(data.lessonProgress);
                console.log(data.lessonProgress);
                    setName(data.username)
                } catch (error) {
                    setError(error.message);
            }
        };

        fetchUser();
    }, []);
    const loginData = useOutletContext();

    const [index, setIndex] = useState(-2);

    const nextLesson = () => {
        if (index === lessons.length - 5) {
            setIndex(-2); // Loop back so active becomes Lesson 2.
        } else {
            setIndex((prev) => prev + 1);
        }
    };

    const prevLesson = () => {
        if (index === -2) {
            setIndex(lessons.length - 5); // Loop back so active becomes Lesson 6.
        } else {
            setIndex((prev) => prev - 1);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowLeft" || event.key === "a") {
                prevLesson();
            } else if (event.key === "ArrowRight" || event.key === "d") {
                nextLesson();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [index]);

        if (!loginData) {
            return <div>Loading...</div>;
        }

    return (
        <>
            <div className="flex flex-col items-center justify-center px-4 text-center">
                <h2 className="pt-16 text-6xl font-k2d text-black dark:text-gray-200">Hallo {(loginData.name ? loginData.name : "Gebruiker") }
                </h2>
                <p className="pb-20 mt-4 text-2xl max-w-2xl font-openSans text-black dark:text-gray-200">
                    Welkom op de website van gebarentaal voor intake. Hier kan je extra oefeningen doen rondom gebarentaal.
                    Kies een les en ga aan de slag.
                </p>
            </div>

            {/* Error message */}
            {error && (
                <div role="alert" aria-live="assertive" className="text-red-600">
                    Er is een probleem met het laden van de gegevens. Probeer het later opnieuw.
                </div>
            )}

            <div className="flex items-center justify-center gap-10">
                <button
                    onClick={prevLesson}
                    className="text-4xl text-black dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Vorige les"
                    role="button"
                    tabIndex="0"
                >
                    ←
                </button>

                {/* Lessons Wrapper */}
                <div className="relative w-[65rem] h-[30rem] flex overflow-hidden justify-center items-center">
                    <motion.div
                        className="flex gap-10"
                        animate={{ x: -index * 347 }}
                        transition={{ type: "tween", duration: 0.75, ease: "easeInOut" }}
                    >
                        {lessons.map((lesson, i) => {
                            const lessonProgress =
                                progress.find((p) => p.lesson_id === lesson._id)?.progress || 0;

                            const isActive = i === index + 3;
                            const circleClass = isActive ? "w-80 h-80" : "w-60 h-60";
                            const textSize = isActive ? "text-4xl" : "text-2xl";
                            const buttonPadding = isActive ? "px-24" : "px-16";
                            const circleColorClass =
                                lessonProgress === 100
                                    ? "text-green-500"
                                    : lessonProgress === 0
                                        ? "text-red-600"
                                        : "text-orange-600";

                            return (
                                <div key={lesson.id} className="flex flex-col items-center w-[300px]">
                                    <div className={`relative ${circleClass}`}>
                                        <svg
                                            className="w-full h-full -rotate-90"
                                            viewBox="0 0 36 36"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-label={`Les voortgang voor ${lesson.title}`}
                                        >
                                            <circle
                                                cx="18"
                                                cy="18"
                                                r="16"
                                                fill="none"
                                                className="stroke-current text-gray-200 dark:text-gray-400"
                                                strokeWidth="2"
                                            ></circle>
                                            <circle
                                                cx="18"
                                                cy="18"
                                                r="16"
                                                fill="none"
                                                className={`stroke-current ${circleColorClass}`}
                                                strokeWidth="2"
                                                strokeDasharray="100"
                                                strokeDashoffset={100 - lessonProgress}
                                                strokeLinecap="round"
                                            ></circle>
                                        </svg>
                                        <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                            <span className={`${textSize} font-bold text-black dark:text-gray-200`}>
                                                {lessonProgress}%
                                            </span>
                                        </div>
                                    </div>
                                    <h2 className="text-4xl p-4 font-k2d text-black dark:text-gray-200">{lesson.title}</h2>
                                    {lessonProgress === 100 ? (
                                        <Link to={`/les/${lesson.id}`}>
                                            <button
                                                className={`bg-green-500 text-white font-k2d text-xl py-2 ${buttonPadding} rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500`}
                                                aria-label={`Herhalen van les ${lesson.title}`}
                                                tabIndex="0"
                                            >
                                                Herhalen
                                            </button>
                                        </Link>
                                    ) : lessonProgress === 0 ? (
                                        <Link to={`/les/${lesson.id}`}>
                                            <button
                                                className={`bg-red-600 text-white font-k2d text-xl py-2 ${buttonPadding} rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500`}
                                                aria-label={`Beginnen met les ${lesson.title}`}
                                                tabIndex="0"
                                            >
                                                Beginnen
                                            </button>
                                        </Link>
                                    ) : (
                                        <Link to={`/les/${lesson.id}`}>
                                            <button
                                                className={`bg-orange-500 text-white font-k2d text-xl py-2 ${buttonPadding} rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                                                aria-label={`Hervatten van les ${lesson.title}`}
                                                tabIndex="0"
                                            >
                                                Hervatten
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </motion.div>
                </div>

                <button
                    onClick={nextLesson}
                    className="text-4xl text-black dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Volgende les"
                    role="button"
                    tabIndex="0"
                >
                    →
                </button>
            </div>
        </>
    );
}

export default Home;
