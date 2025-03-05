import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import About from "./About.jsx";
import SportItemList from "./SportItemList.jsx";
import SportItemCreateForm from "./SportItemCreateForm.jsx";
import SportItemDetail from "./SportItemDetail.jsx";
import SportItemEditForm from "./SportItemEdit.jsx";
import SportItemDeleted from "./SportItemDeleted.jsx";
import NotFound from "./NotFound.jsx";
import './fade.css'

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [{
            path: '/',
            element: <Home/>
        },
            {
                path: '/about',
                element: <About/>
            },
            {
                path: '/sportitem',
                element: <SportItemList/>
            },
            {
                path: '/sportitem/create',
                element: <SportItemCreateForm/>
            },
            {
                path: '/sportitem/:id',
                element: <SportItemDetail/>
            },
            {
                path: '/sportitem/edit/:id',
                element: <SportItemEditForm/>
            },
            {
                path: '/delete',
                element: <SportItemDeleted/>
            },
            {
                path: '/*',
                element: <NotFound/>
            }
        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App;