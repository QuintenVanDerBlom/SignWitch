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
import MultipleChoice from "./components/MultipleChoice.jsx";
import DoneExercise from "./pages/DoneExcercise.jsx";
import ApiKey from "./pages/ApiKey.jsx";
import Students from "./pages/Auth/Students/View.jsx";


import Register from "./pages/authentication/Register.jsx";
import Inlog from "./pages/authentication/Inlog.jsx";
import Profiel from "./pages/account/profiel.jsx";
import ProfielFoto from "./pages/account/profielFoto.jsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [{
            path: '/',
            element: <Home />
        },
             {
                path: '/authentication/register',
                element: <Register/>
             },
            {
                path: '/authentication/inlog',
                element: <Inlog/>
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
                path: '/account/profiel',
                element: <Profiel/>
            },
             {
                path: '/account/profielFoto',
                 element: <ProfielFoto/>
             },
            {
                path: '/les/:id',
                element: <Lesson/>
            },
            {
                path: '/opdracht/:category_id/',
                element: <Exercise/>
            },
            {
                path: '/opdracht/:category_id/done',
                element: <DoneExercise/>
            },
            // {
            //     path: '/sportitem',
            //     element: <SportItemList/>
            // },
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
            {
                path: '/keygen',
                element: <ApiKey/>
            },
        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;