import LessonContainer from "./LessonContainer.jsx";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";

function Lessons() {
    const [lessons, setLessons] = useState([]);
    const [error, setError] = useState(null);
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
                setLessons(data.items);  // Stel de lessons in de state in
                console.log(data.items)
            } catch (error) {
                setError(error.message);  // Zet de fout in de state in
            }
        };

        fetchData();
    }, []);  // Dit zorgt ervoor dat de fetch alleen uitgevoerd wordt bij de eerste render

    const loginData = useOutletContext();

    return (
        <div className="flex justify-center py-5 flex-col items-center">
            <h1 className="text-title-color text-4xl font-k2d">Lessen</h1>
            <p className="font-openSans w-1/2 text-center">Hier kan je alle lessen vinden. Deze lessen komen overeen met de lessen in het werkboek.
            En als je erop klikt dan ga je naar de verschillende thema's.</p>
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
