import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Home() {
    const [searchParams] = useSearchParams();

    // Get data from URL parameters
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
            window.location.href = "https://cmgt.hr.nl/chat-login/handle/tle2-1?redirect=http://localhost:5175";
        }
    }, [token, name, email]); // Only re-run if URL data changes

    return (
        <div className="flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-4xl font-k2d">
                Hallo {loginData ? loginData.name : "gebruiker"}
            </h2>
            <p className="pb-4 mt-4 text-lg max-w-md font-openSans">
                Welkom op SignWitch. Hier kan je extra oefeningen doen rondom gebarentaal.
                Hier zie je een overzicht van je lessen, maar je kan ook het woordenboek bekijken en
                overzicht van de lessen in de navigatiebalk.
            </p>
        </div>
    );
}

export default Home;
