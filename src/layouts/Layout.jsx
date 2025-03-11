import { Link, Outlet } from 'react-router';
import { FaUserCircle } from "react-icons/fa";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";


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

    // Load data from localStorage if available
    const [loginData, setLoginData] = useState(() => {
        const storedData = localStorage.getItem("loginData");
        return storedData ? JSON.parse(storedData) : null;
    });

    useEffect(() => {
        if (token && name && email) {
            // If URL provides new login data, update localStorage
            const newLoginData = { token, name, email };
            localStorage.setItem("loginData", JSON.stringify(newLoginData));
            setLoginData(newLoginData);
        } else if (loginData?.token) {
            // If token is already in localStorage, do not call API again
            console.log("Using stored token, no API call needed.");
        } else {
            // No valid data found, redirect to login
            console.warn("No valid login data found, redirecting...");
            window.location.href = "https://cmgt.hr.nl/chat-login/handle/tle2-1?redirect=http://localhost:5173";
        }
    }, [token, name, email]); // Only re-run if URL data changes


    return (
        <div className="min-h-screen text-black">
            {/* Header */}
            <header className="bg-bg-nav-bar shadow-lg py-4">
                <nav className="container mx-auto flex justify-between items-center">
                    {/* Logo / Titel */}
                    <Link to="/" className="text-white text-3xl tracking-wide flex ">
                        <img src="../../public/hrlogo.svg" alt="logo" className="h-10 mr-4"/> Gebarentaal bij intake
                    </Link>

                    {/* Navigatie */}
                    <ul className="flex space-x-20 text-white text-xl items-center font-openSans">
                        <li>
                            <Link to="/" className="hover:underline transition-all">
                                Home
                            </Link>
                        </li>
                        <li className="relative group">
                            <button className="hover:underline transition-all flex items-center">
                                <Link to="/lessen">Lessen ▼</Link>
                            </button>
                            {/* Dropdown */}
                            <ul className="absolute hidden group-hover:block bg-bg-nav-bar text-white mt-0 py-2 w-40 shadow-md rounded-lg">
                                {lessons.map(lesson => (<li><Link to={`/les/${lesson.id}`} className="block px-4 py-2 hover:bg-button-bg-hover">{lesson.title}</Link></li>))}
                            </ul>
                        </li>
                        <li className="relative group">
                            <button className="hover:underline transition-all flex items-center">
                                <Link to="/woordenboek">Woordenboek ▼</Link>
                            </button>
                            {/*/!* Dropdown *!/*/}
                            {/*<ul className="absolute hidden group-hover:block bg-bg-nav-bar text-white mt-0 py-2 w-40 shadow-md rounded-lg">*/}
                            {/*    <li><Link to="/woordenboek/a"*/}
                            {/*              className="block px-4 py-2 hover:bg-button-bg-hover">A</Link></li>*/}
                            {/*    <li><Link to="/woordenboek/b"*/}
                            {/*              className="block px-4 py-2 hover:bg-button-bg-hover">B</Link></li>*/}
                            {/*</ul>*/}
                        </li>
                        <Link to="/account/profiel"
                              className="text-gray-200 text-3xl bg-gray-600 rounded-full p-2 hover:bg-gray-500">
                            <FaUserCircle/>
                        </Link>
                    </ul>




                </nav>
            </header>

            {/* Main Content */}
            <main className="h-screen bg-background-color">
                {/*<Outlet loginData={loginData}/>*/}
                <Outlet context={loginData} />
            </main>

            {/* Footer (Optioneel, maar kan toegevoegd worden voor een meer dynamische ervaring) */}
            {/*<footer className="flex bg-progress-Done py-4 text-white font-openSans justify-between px-6">*/}
            {/*    <div className="flex space-x-5">*/}
            {/*    <p className="">Privacy Policy</p>*/}
            {/*    <p className="">Contact</p>*/}
            {/*    </div>*/}
            {/*</footer>*/}
        </div>
    );
}

export default Layout;
