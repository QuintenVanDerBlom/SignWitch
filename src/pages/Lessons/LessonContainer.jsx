import { Link } from "react-router";
import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";

function LessonContainer({ lesson }) {
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState([]);
    const [savedSigns, setSavedSigns] = useState([]);
    const [lessonCategories, setLessonCategories] = useState([]);


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
                const filteredSigns = data.signsSaved?.filter(sign => sign.saved === true) || [];
                setSavedSigns(filteredSigns);
            } catch (error) {
                setError(error.message);  // Zet de fout in de state in
            }
        };

        fetchUser();
    }, []);
    const loginData = useOutletContext();
    const lessonProgress =
        progress.find((p) => p.lesson_id === lesson._id)?.progress || 0;

    const [signCount, setSignCount] = useState(0);
    const [lessonSigns, setLessonSigns] = useState([]);

    useEffect(() => {
        const fetchLessonSigns = async () => {
            try {
                const response = await fetch(`http://145.24.223.94:8000/lessons/${lesson._id}`, {
                    method: "GET",
                    headers: {
                        "apiKey": "9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz",
                        "Accept": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                console.log(`http://145.24.223.94:8000/categories/${lesson}`)
                // Opslaan in state
                console.log("Lessons", data.items)
                setLessonSigns(data.items.lessonSigns);
                setLessonCategories(data.items.lessonCategories);
            } catch (error) {
                console.error("Error fetching category signs:", error);
            }
        };

        fetchLessonSigns();
    }, []);

    useEffect(() => {
        if (lessonSigns.length > 0 && savedSigns.length > 0) {

            // Check hoeveel opgeslagen tekens in de categorie zitten
            const count = savedSigns.filter(sign =>
                lessonSigns.some(catSign => catSign._id === sign.sign_id)
            ).length;

            setSignCount(count);
        }
    }, [lessonSigns, savedSigns]);

    return (

        <div
            className="bg-lesson-container dark:bg-lesson-container-dark text-white p-4 rounded-lg shadow-lg w-96 min-h-48 m-10 flex flex-col justify-between transition-transform duration-200 hover:scale-105">
            <div className="flex flex-row justify-between">
                <div></div>
                <h2 className="text-center font-k2d text-2xl">{lesson.title}</h2>
                <div className="">➝</div>
            </div>
            <p className="text-center">
            {lessonCategories.map((category) => (
                category.categoryName + ", "
            ))}
            </p>
            {/* Toegevoegde tekst boven de progress bar */}
            <p className="text-center text-xl mt-2">{signCount}/{lessonSigns.length} nog oefenen</p>

            {/* Progress bar */}
            <div className="w-full bg-white h-10 rounded-md border border-black">
                <div
                    className="bg-progress-Done dark:bg-progress-Done-dark h-10 rounded-md border border-black"
                    style={{width: `${lessonProgress}%`}}
                ></div>
            </div>
        </div>
        // </Link>
    );
}


export default LessonContainer