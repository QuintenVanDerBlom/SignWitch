import { Link, Outlet } from 'react-router';
import { FaUserCircle } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Unauthorised from "./Unauthorised.jsx";
import DarkModeToggle from "../components/DarkModeToggle.jsx";

function Layout() {
    const lessons = [
        { id: 1, title: "Les 1", progress: 20 },
        { id: 2, title: "Les 2", progress: 50 },
        { id: 3, title: "Les 3", progress: 75 },
        { id: 4, title: "Les 4", progress: 100 },
        { id: 5, title: "Les 5", progress: 40 },
        { id: 6, title: "Les 6", progress: 60 },
    ];

    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    const [loginData, setLoginData] = useState(() => {
        const storedData = localStorage.getItem("loginData");
        return storedData ? JSON.parse(storedData) : null;
    });

    const [isAuthorised, setIsAuthorised] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        if (searchParams.get("token")) {
            const newLoginData = { token, name, email };
            localStorage.setItem("loginData", JSON.stringify(newLoginData));
            setLoginData(newLoginData);
            window.location.href = "http://145.24.222.32/";
        }

        if (loginData == null) {
            window.location.href = "https://cmgt.hr.nl/chat-login/handle/tle2-1?redirect=http://145.24.222.32/";
        } else {
            const response = await fetch(`https://cmgt.hr.nl/api/validate-sso-token`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Token': `${loginData.token}`,
                },
            });
            if (response.status === 200) {
                console.log('token valide');

                const responses = await fetch(`http://145.24.223.94:8000/users`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'apikey': `pinda`,
                    },
                });

                const data = await responses.json();

                let matchFound = false;
                for (let i = 0; i < data.users.length; i++) {
                    if (data.users[i].email === loginData.email) {
                        matchFound = true;
                        break;
                    }
                }

                if (!matchFound) {
                    setIsAuthorised(false);
                }
            } else {
                window.location.href = "https://cmgt.hr.nl/chat-login/handle/tle2-1?redirect=http://145.24.222.32/";
            }
        }
    }

    if (!isAuthorised) {
        return <Unauthorised />;
    }

    return (
        <div className="min-h-screen text-black ">
            {/* Header */}
            <header className="bg-bg-nav-bar dark:bg-bg-nav-bar-dark shadow-lg py-4">
                <nav className="container mx-auto flex justify-between items-center">
                    {/* Logo / Titel */}
                    <Link to="/" className="text-white dark:text-gray-200 text-3xl tracking-wide flex ">
                        <img src="/hrlogo.svg" alt="logo" className="h-10 mr-4" />
                        Gebarentaal bij intake
                    </Link>

                    {/* Navigatie */}
                    <ul className="flex space-x-10 text-white dark:text-gray-200 text-xl items-center font-openSans">
                        <li>
                            <Link to="/" className="text-gray-200 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400 transition-all" aria-current="page">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/flitskaarten" className="text-gray-200 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400 transition-all">
                                Flitskaarten
                            </Link>
                        </li>
                        <li className="relative group">
                            <button className="text-gray-200 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400 transition-all flex items-center">
                                <Link to="/lessen" aria-label="Bekijk de lessen">Lessen</Link>
                            </button>
                        </li>
                        <li className="relative group">
                            <button className="text-gray-200 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400 transition-all flex items-center">
                                <Link to="/woordenboek" aria-label="Bekijk het woordenboek">Woordenboek</Link>
                            </button>
                        </li>
                        <Link to="/account/profiel"
                              className="text-gray-200 text-3xl bg-gray-600 rounded-full p-2 hover:bg-gray-500"
                              aria-label="Ga naar profielpagina">
                            <FaUserCircle />
                        </Link>

                        {/* Dark Mode Toggle */}
                        <DarkModeToggle />
                    </ul>
                </nav>
            </header>

            {/* Main Content */}
            <main className="min-h-screen bg-background-color dark:bg-background-color-dark">
                <Outlet context={loginData} />
            </main>
        </div>
    );
}

export default Layout;
