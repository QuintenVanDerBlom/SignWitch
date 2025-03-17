import {Link} from "react-router";

function CategoryContainer({ category }) {
    return (

        <div
            className="bg-lesson-container text-white p-4 rounded-lg shadow-lg w-96 h-36 m-10 flex flex-col justify-between items-center transition-transform duration-200 hover:scale-105">
            <div className="flex w-72 flex-row justify-between">
                <div></div>
                <h2 className="text-center font-k2d text-2xl">{category.category_name}</h2>
                <div className="">➝</div>
            </div>
           <p className="m-5 text-xl"> 0/10 gebaren nog oefenen</p>
        </div>
    );
}


export default CategoryContainer