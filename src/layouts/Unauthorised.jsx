import {Link, Outlet} from "react-router";
import {FaUserCircle} from "react-icons/fa";

function Unauthorised() {

    return (

                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-700 text-center p-6">
                    <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">Oeps!</h1>
                    <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
                        Je hoort niet bij deze cursus. Stuur een bericht naar je docent om je toe te voegen.
                    </p>
                    {/*<a href="mailto:docent@example.com"*/}
                    {/*   className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">*/}
                    {/*    Stuur een bericht*/}
                    {/*</a>*/}
                </div>

    )
        ;
}

export default Unauthorised;