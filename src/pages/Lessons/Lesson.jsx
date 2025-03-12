import LessonContainer from "./LessonContainer.jsx";
import {Link, useParams} from "react-router";
import CategoryContainer from "./CategoryContainer.jsx";

function Lesson() {
    const { id } = useParams();
    const categories = [
        { id: 1, category_name: "Vraagwoorden", lesson_id: 1 },
        { id: 2, category_name: "Tijdens de les", lesson_id: 1 },
        { id: 3, category_name: "Kennismaken", lesson_id: 1 },
        { id: 4, category_name: "Begroeten", lesson_id: 1 },
        { id: 5, category_name: "Werkwoorden", lesson_id: 2 },
        { id: 6, category_name: "Luisterhouding", lesson_id: 2 },
        { id: 7, category_name: "Gevoelens", lesson_id: 2 },
        { id: 8, category_name: "Tellen", lesson_id: 2 },
        { id: 9, category_name: "Dagen & overig", lesson_id: 3 },
        { id: 10, category_name: "Maanden", lesson_id: 3 },
        { id: 11, category_name: "Dagen", lesson_id: 3 },
        { id: 12, category_name: "Afspraak maken", lesson_id: 3 },
        { id: 13, category_name: "Vraagwoorden", lesson_id: 3 },
        { id: 14, category_name: "Getallen", lesson_id: 4},
        { id: 15, category_name: "Klok kijken", lesson_id: 4 },
        { id: 16, category_name: "Doktersbezoek algemeen", lesson_id: 5 },
        { id: 17, category_name: "Anamnese", lesson_id: 5 },
        { id: 18, category_name: "Steden", lesson_id: 5 },
        { id: 19, category_name: "Gezin", lesson_id: 5 },
        { id: 20, category_name: "Relaties", lesson_id: 5 },
        { id: 21, category_name: "vingerspellen", lesson_id: 5 },
        { id: 22, category_name: "Onderzoek en lichamelijke klachten", lesson_id: 6 },
        { id: 23, category_name: "Ziekenhuisopname deel 1", lesson_id: 6 },
        { id: 24, category_name: "Ziekenhuisopname deel 2", lesson_id: 7 },
        { id: 25, category_name: "Lichaamsdelen", lesson_id: 7 },
        { id: 26, category_name: "Organen", lesson_id: 7 },
    ];
    const filteredCategories = categories.filter(category => category.lesson_id === parseInt(id));



    return (
        <div className="flex justify-center py-5 flex-col items-center">
            <h1 className="text-title-color text-4xl font-k2d">Les {id}</h1>
            <p className="font-openSans w-1/2 text-center">
                Hier kan je de thema's leren van de gebaren die zijn behandeld in de les.
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

