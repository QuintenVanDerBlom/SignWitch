import { Link } from "react-router";
import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";

function LessonContainer({ lesson }) {
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState([]);

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
                setProgress(data.lessonProgress);  // Stel de lessons in de state in
                console.log(data.lessonProgress)
            } catch (error) {
                setError(error.message);  // Zet de fout in de state in
            }
        };

        fetchUser();
    }, []);
    const loginData = useOutletContext();
    const lessonProgress =
        progress.find((p) => p.lesson_id === lesson._id)?.progress || 0;

    return (
        <div
            className="bg-lesson-container text-white p-4 rounded-lg shadow-lg w-96 h-36 m-10 flex flex-col justify-between transition-transform duration-200 hover:scale-105">

            <div className="flex flex-row justify-between">
                <div></div>
                <h2 className="text-center font-k2d text-2xl">{lesson.title}</h2>
                <div className="">➝</div>
            </div>

            {/* Toegevoegde tekst boven de progress bar */}
            <p className="text-center text-xl mt-2">0/10 gebaren nog oefenen</p>

            {/* Progress bar */}
            <div className="w-full bg-white h-10 rounded-md border border-black">
                <div
                    className="bg-progress-Done h-10 rounded-md"
                    style={{ width: `${lesson.progress}%` }}
                ></div>
            </div>
        </div>
        // </Link>
    );
}


export default LessonContainer