import { useEffect, useState } from "react";

function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === "dark");

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
            aria-label={darkMode ? 'Schakel over naar lichte modus' : 'Schakel over naar donkere modus'}
            aria-pressed={darkMode}
            style={{ outline: '3px solid transparent' }} // Voor focus-indicator
            onFocus={(e) => e.target.style.outline = '3px solid #6c757d'} // Grijsblauwe focus-indicator
            onBlur={(e) => e.target.style.outline = 'none'} // Focus-indicator verwijderen
        >
            {darkMode ? '☀️ Lichte modus' : '🌙 Donkere modus'}
        </button>
    );
}

export default DarkModeToggle;
