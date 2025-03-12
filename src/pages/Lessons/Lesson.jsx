import LessonContainer from "./LessonContainer.jsx";
import {Link, useParams} from "react-router";
import CategoryContainer from "./CategoryContainer.jsx";

function Lesson() {
    const { id } = useParams();
    const categories = [
        { id: 1, category_name: "Wiskunde", lesson_id: 1 },
        { id: 2, category_name: "Natuurkunde", lesson_id: 1 },
        { id: 3, category_name: "Scheikunde", lesson_id: 2 },
        { id: 4, category_name: "Biologie", lesson_id: 2 },
        { id: 5, category_name: "Geschiedenis", lesson_id: 3 },
        { id: 6, category_name: "Aardrijkskunde", lesson_id: 3 },
        { id: 7, category_name: "Economie", lesson_id: 4 },
        { id: 8, category_name: "Bedrijfskunde", lesson_id: 4 },
        { id: 9, category_name: "Informatica", lesson_id: 5 },
        { id: 10, category_name: "Programmeren", lesson_id: 5 },
        { id: 11, category_name: "Engels", lesson_id: 6 },
        { id: 12, category_name: "Frans", lesson_id: 6 },
        { id: 13, category_name: "Duits", lesson_id: 1 },
        { id: 14, category_name: "Spaans", lesson_id: 2 },
        { id: 15, category_name: "Muziek", lesson_id: 3 },
        { id: 16, category_name: "Kunst", lesson_id: 4 },
        { id: 17, category_name: "Lichamelijke Opvoeding", lesson_id: 5 },
        { id: 18, category_name: "Filosofie", lesson_id: 6 },
        { id: 19, category_name: "Psychologie", lesson_id: 1 },
        { id: 20, category_name: "Sociologie", lesson_id: 2 }
    ];
    const filteredCategories = categories.filter(category => category.lesson_id === parseInt(id));



    return (
        <div className="flex justify-center py-5 flex-col items-center">
            <h1 className="text-title-color text-4xl font-k2d">Les {id}</h1>
            <p className="font-openSans w-1/2 text-center">
                Hier kan je de gebaren leren van de thema's die zijn behandeld in de les.
                En van de gebaren die staan in het werkboek.
            </p>
            <div className="flex flex-wrap justify-center mx-10">
                {filteredCategories.map(category => (
                    <Link to={`/opdracht/${category.id}`}> <CategoryContainer category={category}/></Link>
                ))}
            </div>
        </div>
    )
}

export default Lesson

