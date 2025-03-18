import {useEffect, useState} from "react";

function DarkModeToggle () {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme')==="dark");

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-1 rounded-md bg-button-bg-dark dark:bg-button-bg text-white dark:text-gray-200"
        >
            {darkMode ? '☀️Light Mode' : '🌙Dark Mode'}

        </button>
    )

}

export default DarkModeToggle;