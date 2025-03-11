import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./layouts/Layout.jsx";
import Test from "./pages/Test.jsx";
import Home from "./Home.jsx";
import Lessons from "./pages/Lessons/Lessons.jsx";
import Register from "./pages/authentication/Register.jsx";
import Inlog from "./pages/authentication/Inlog.jsx";
import Profiel from "./pages/account/profiel.jsx";
import ProfielFoto from "./pages/account/profielFoto.jsx";


const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [{
            path: '/',
            element: <Home/>
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