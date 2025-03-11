import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./layouts/Layout.jsx";
import Test from "./pages/Test.jsx";
import Home from "./Home.jsx";
import Lessons from "./pages/Lessons/Lessons.jsx";
import Lesson from "./pages/Lessons/Lesson.jsx";
import {BiExpandVertical} from "react-icons/bi";
import Exercise from "./pages/Exercise.jsx";
import Dictionary from "./pages/Dictionary.jsx";
import Sign from "./pages/Sign.jsx";
import Students from "./pages/Auth/Students/View.jsx";


const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [{
            path: '/',
            element: <Home/>
        },
            {
                path: '/woordenboek',
                element: <Dictionary/>
            },
            {
                path: '/woordenboek/woord/:id',
                element: <Sign/>
            },
            {
                path: '/lessen',
                element: <Lessons/>
            },
            {
                path: '/les/:id',
                element: <Lesson/>
            },
            {
                path: '/opdracht/:category_id/:exercise_id',
                element: <Exercise/>
            },
            {
                path: '/studenten',
                element: <Students/>
            },
            // {
            //     path: '/sportitem/create',
            //     element: <SportItemCreateForm/>
            // },
            // {
            //     path: '/sportitem/:id',
            //     element: <SportItemDetail/>
            // },
            // {
            //     path: '/sportitem/edit/:id',
            //     element: <SportItemEditForm/>
            // },
            // {
            //     path: '/delete',
            //     element: <SportItemDeleted/>
            // },
            // {
            //     path: '/*',
            //     element: <NotFound/>
            // }
        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App;