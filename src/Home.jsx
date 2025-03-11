import { useEffect, useState } from "react";
import {useOutletContext, useSearchParams} from "react-router-dom";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const lessons = [
    { id: 1, title: "Les 1", progress: 35 },
    { id: 2, title: "Les 2", progress: 75 },
    { id: 3, title: "Les 3", progress: 50 },
    { id: 4, title: "Les 4", progress: 100 },
    { id: 5, title: "Les 5", progress: 0 },
    { id: 6, title: "Les 6", progress: 0 },
    { id: 7, title: "Les 7", progress: 0 },
];

function Home() {
    const loginData = useOutletContext();

    const [index, setIndex] = useState(- 2);

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

    return (
        <div className="flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-4xl font-k2d">
                Hallo {loginData ? loginData.name : "gebruiker"}
            </h2>
            <p className="pb-4 mt-4 text-lg max-w-md font-openSans">
                Welkom op SignWitch. Hier kan je extra oefeningen doen rondom gebarentaal.
                Hier zie je een overzicht van je lessen, maar je kan ook het woordenboek bekijken en
                overzicht van de lessen in de navigatiebalk.
            </p>
        </div>
        <>
            <div className="flex flex-col items-center justify-center px-4 text-center">
                <h2 className="pt-16 text-6xl font-k2d">Hallo Abigail {/*{users.name}*/}</h2>
                <p className="pb-20 mt-4 text-2xl max-w-2xl font-openSans">
                    Welkom op de website van gebarentaal voor intake. Hier kan je extra oefeningen doen rondom gebarentaal.
                    Kies een les en ga aan de slag.
                </p>
            </div>

            {/* Carousel Wrapper */}
            <div className="flex items-center justify-center gap-10">
                {/* Left Arrow */}
                <button onClick={prevLesson} className="text-4xl">
                    ←
                </button>

                {/* Lessons Wrapper */}
                <div className="relative w-[65rem] h-[30rem] flex overflow-hidden justify-center items-center">
                    <motion.div
                        className="flex gap-10"
                        animate={{ x: -index * 347 }} // Adjust the multiplier to set spacing
                        transition={{ type: "tween", duration: 0.75, ease: "easeInOut" }}
                    >
                        {lessons.map((lesson, i) => {
                            // The active card is defined as the one at position (index + 3)
                            const isActive = i === index + 3;
                            const circleClass = isActive ? "w-80 h-80" : "w-60 h-60";
                            const textSize = isActive ? "text-4xl" : "text-2xl";
                            const buttonPadding = isActive ? "px-24" : "px-16";

                            return (
                                <div key={lesson.id} className="flex flex-col items-center w-[300px]">
                                    <div className={`relative ${circleClass}`}>
                                        <svg
                                            className="w-full h-full -rotate-90"
                                            viewBox="0 0 36 36"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                                cx="18"
                                                cy="18"
                                                r="16"
                                                fill="none"
                                                className="stroke-current text-gray-200"
                                                strokeWidth="2"
                                            ></circle>
                                            <circle
                                                cx="18"
                                                cy="18"
                                                r="16"
                                                fill="none"
                                                className="stroke-current text-red-600"
                                                strokeWidth="2"
                                                strokeDasharray="100"
                                                strokeDashoffset={100 - lesson.progress}
                                                strokeLinecap="round"
                                            ></circle>
                                        </svg>
                                        <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                      <span className={`${textSize} font-bold text-black`}>
                        {lesson.progress}%
                      </span>
                                        </div>
                                    </div>
                                    <h2 className="text-4xl p-4 font-k2d">{lesson.title}</h2>
                                    {lesson.progress === 100 ? (
                                        <Link to={`/les/${lesson.id}`}>
                                            <button
                                                className={`bg-green-500 text-white font-k2d text-xl py-2 ${buttonPadding} rounded-md hover:bg-green-600 transition-colors`}
                                            >
                                                Herhalen
                                            </button>
                                        </Link>
                                    ) : lesson.progress === 0 ? (
                                        <Link to={`/les/${lesson.id}`}>
                                            <button
                                                className={`bg-yellow-300 text-white font-k2d text-xl py-2 ${buttonPadding} rounded-md hover:bg-yellow-400 transition-colors`}
                                            >
                                                Beginnen
                                            </button>
                                        </Link>
                                    ) : (
                                        <Link to={`/les/${lesson.id}`}>
                                            <button
                                                className={`bg-red-600 text-white font-k2d text-xl py-2 ${buttonPadding} rounded-md hover:bg-red-700 transition-colors`}
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

                {/* Right Arrow */}
                <button onClick={nextLesson} className="text-4xl">
                    →
                </button>
            </div>
        </>
    );
}

export default Home;
