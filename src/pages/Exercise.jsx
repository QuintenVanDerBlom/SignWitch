
import {Link, useParams} from "react-router";
import MultipleChoice from "../components/MultipleChoice.jsx";


function Exercise() {
    const { exercise_id } = useParams();



    return (
        <div className="flex justify-center py-5 flex-col items-center">
            <h1 className="text-title-color text-4xl font-k2d">Opdracht {exercise_id}</h1>
            <MultipleChoice/>

        </div>
    )
}

export default Exercise

