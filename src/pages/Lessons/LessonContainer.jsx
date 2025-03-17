import { Link } from "react-router";

function LessonContainer({ lesson }) {
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
    );
}

export default LessonContainer;
