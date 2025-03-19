import LessonContainer from "./LessonContainer.jsx";
import {Link, useParams} from "react-router";
import CategoryContainer from "./CategoryContainer.jsx";
import {useEffect, useState} from "react";

function Lesson() {
    const { id } = useParams();
    const [lesson, setLesson] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://145.24.223.94:8000/lessons/${id}`, {
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
                setLesson(data.items);
                setCategories(data.items.lessonCategories)
            } catch (error) {
                setError(error.message);  // Zet de fout in de state in
            }
        };

        fetchData();
    }, []);  // Dit zorgt ervoor dat de fetch alleen uitgevoerd wordt bij de eerste render

    return (
        <div className="flex justify-center py-5 flex-col items-center">
            <h1 className="text-title-color dark:text-gray-200 text-4xl font-k2d">{lesson.title}</h1>

            {/* Foutmelding weergeven als er een fout is */}
            {error && (
                <div role="alert" className="text-red-500">
                    Er is een probleem met het ophalen van de gegevens: {error}
                </div>
            )}

            {/* Laadindicator */}
            {lesson.length === 0 && !error && (
                <div role="status">Laden...</div>
            )}

            <p className="font-openSans w-1/2 text-center text-black dark:text-gray-300">
                Hier kan je de gebaren leren van de thema's die zijn behandeld in de les.
                En van de gebaren die staan in het werkboek.
            </p>

            <div className="flex flex-wrap justify-center mx-10">
                {categories.map(category => (
                    <Link
                        to={`/opdracht/${category.id}`}
                        aria-label={`Bekijk de categorie ${category.category_name}`}
                        key={category.id}
                    >
                        <CategoryContainer category={category} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Lesson;
