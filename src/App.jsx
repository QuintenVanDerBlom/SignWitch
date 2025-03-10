import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./layouts/Layout.jsx";
import Test from "./pages/Test.jsx";
import Home from "./Home.jsx";
import Lessons from "./pages/Lessons/Lessons.jsx";
import MultipleChoiceQuiz from "./pages/Quizzes/MultipleChoiceQuiz.jsx";


const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [{
            path: '/',
            element: <Home/>
        },
            {
                path: '/lessen',
                element: <Lessons/>
            },
            {
                path: '/lessen/1/1',
                element: <MultipleChoiceQuiz/>
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