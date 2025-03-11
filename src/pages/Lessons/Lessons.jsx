import LessonContainer from "./LessonContainer.jsx";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";

function Lessons() {
    const lessons = [
        { id: 1, title: "Les 1", progress: 20 },
        { id: 2, title: "Les 2", progress: 50 },
        { id: 3, title: "Les 3", progress: 75 },
        { id: 4, title: "Les 4", progress: 100 },
        { id: 5, title: "Les 5", progress: 40 },
        { id: 6, title: "Les 6", progress: 60 },
    ];

    const loginData = useOutletContext();

    return (
        <div className="flex justify-center py-5 flex-col items-center">
            <h1 className="text-title-color text-4xl font-k2d">Lessen</h1>
            <div className="flex flex-wrap justify-center mx-10">
                {lessons.map(lesson => (
                    <Link to={`/les/${lesson.id}`} key={lesson.id}>
                        <LessonContainer lesson={lesson} />
                    </Link>
                ))}
            </div>
            {/*<div>*/}
            {/*    <h1>Lessons</h1>*/}
            {/*    {loginData ? <p>Token: {loginData.token}</p> : <p>Loading...</p>}*/}
            {/*</div>*/}
        </div>
    );
}

export default Lessons;
