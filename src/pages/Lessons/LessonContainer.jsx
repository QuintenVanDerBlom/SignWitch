import {Link} from "react-router";

function LessonContainer({ lesson }) {
    return (

        <div
            className="bg-lesson-container text-white p-4 rounded-lg shadow-lg w-80 h-28 m-10 flex flex-col justify-between transition-transform duration-200 hover:scale-105">
            <div className="flex flex-row justify-between">
                <div></div>
                <h2 className="text-center font-k2d text-xl">{lesson.title}</h2>
                <div className="">➝</div>
            </div>
            <div className="w-full bg-white rounded-md mt-2 border-black">
                <div
                    className="bg-progress-Done rounded-md h-7"
                    style={{width: `${lesson.progress}%`}}
                ></div>
            </div>
        </div>
        // </Link>
    );
}


export default LessonContainer