import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./layouts/Layout.jsx";
import Test from "./pages/Test.jsx";
import Home from "./Home.jsx";
import ApiKey from "./pages/ApiKey.jsx";


const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [{
            path: '/',
            element: <Home/>
        },
            // {
            //     path: '/about',
            //     element: <About/>
            // },
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
    )
}

export default App;