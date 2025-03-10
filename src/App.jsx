import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./layouts/Layout.jsx";
import Test from "./pages/Test.jsx";
import Home from "./Home.jsx";
import Lessons from "./pages/Lessons/Lessons.jsx";
import Dictionary from "./pages/Dictionary.jsx";
import Sign from "./pages/Sign.jsx";


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
            // {
            //     path: '/sportitem',
            //     element: <SportItemList/>
            // },
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