import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaStar} from "react-icons/fa";

function FlashCards() {
    // Kan ongebruikte code uitcommenten, maar wordt misschien later nog gebruikt.
    const [signs, setSigns] = useState([]);
    const [categories, setCategories] = useState([]);
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const totalPages = Math.ceil(signs.length / itemsPerPage);
    const [fadeClass, setFadeClass] = useState("opacity-0 translate-y-4");
    const [favorites, setFavorites] = useState({}); // Store favorite states
    const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories
    const [selectedLessons, setSelectedLessons] = useState([]); // Track selected lessons
    const [flipped, setFlipped] = useState({});


    useEffect(() => {
        setFadeClass("opacity-100 translate-y-0 transition-opacity duration-500 ease-in-out");
    }, [currentPage]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowLeft" || event.key === "a") {
                goToPreviousPage();
            } else if (event.key === "ArrowRight" || event.key === "d") {
                goToNextPage();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentPage]);

    useEffect(() => {
        // Fetch the signs data from the API
        const fetchSigns = async () => {
            try {
                const response = await fetch("http://145.24.223.94:8000/signs", {
                    method: "GET", headers: {
                        "apiKey": "9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz", "Accept": "application/json",
                    },
                });
                const data = await response.json();

                console.log("Fetched data:", data);

                // Access the 'items' array and set it to the signs state
                if (data && data.items && Array.isArray(data.items)) {
                    setSigns(data.items); // Use the 'items' array from the response
                } else {
                    console.error("Unexpected data format:", data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchSigns();
    }, []);
    useEffect(() => {
        // Fetch the signs data from the API
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://145.24.223.94:8000/categories", {
                    method: "GET", headers: {
                        "apiKey": "9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz", // Replace with your actual API key
                        "Accept": "application/json",
                    },
                });
                const data = await response.json();

                console.log("Fetched data:", data);

                // Access the 'items' array and set it to the signs state
                if (data && data.items && Array.isArray(data.items)) {
                    setCategories(data.items); // Use the 'items' array from the response
                } else {
                    console.error("Unexpected data format:", data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCategories();
    }, []);
    const startIndex = currentPage - 1; // Zorg dat de index bij 0 begint
    const filteredSigns = selectedCategories.length > 0 || selectedLessons.length > 0
        ? signs.filter(sign => {
            const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(sign.category);
            const isLessonMatch = selectedLessons.length === 0 || selectedLessons.includes(sign.lesson);
            return isCategoryMatch && isLessonMatch;
        })
        : signs;

// Zorg ervoor dat er maar één sign wordt weergegeven
    const currentSigns = filteredSigns.length > 0 ? [filteredSigns[startIndex]] : [];


    const goToNextPage = () => {
        if (currentPage < filteredSigns.length) {
            setFadeClass("opacity-0 translate-y-4");

            // Reset the flipped state for all cards on the next page
            setFlipped({});

            setTimeout(() => setCurrentPage(currentPage + 1));
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setFadeClass("opacity-0 translate-y-4");

            // Reset the flipped state for all cards on the previous page
            setFlipped({});

            setTimeout(() => setCurrentPage(currentPage - 1));
        }
    };
    const toggleFavorite = (index) => {
        setFavorites((prev) => ({
            ...prev, [index]: !prev[index], // Toggle favorite state
        }));
    };


    const toggleFlip = (index) => {
        setFadeClass("opacity-0 translate-y-4");
        setTimeout(() => {
            setFlipped(prev => ({
                ...prev,
                [index]: !prev[index]
            }));
            setFadeClass("opacity-100 translate-y-0 transition-opacity duration-500 ease-in-out");
        }); // Add delay for fade-out effect before flipping
    };
    const handleCategoryChange = (categoryId) => {
        setCurrentPage(1); // Reset to page 1 when category changes
        setSelectedCategories((prev) => {
            if (prev.includes(categoryId)) {
                // Remove category if already selected
                return prev.filter(id => id !== categoryId);
            } else {
                // Add category if not already selected
                return [...prev, categoryId];
            }
        });
    };

    const handleLessonChange = (lessonId) => {
        setCurrentPage(1); // Reset to page 1 when lesson changes
        setSelectedLessons((prev) => {
            if (prev.includes(lessonId)) {
                // Remove lesson if already selected
                return prev.filter(id => id !== lessonId);
            } else {
                // Add lesson if not already selected
                return [...prev, lessonId];
            }
        });
    };


    return (<>
            <div className="flex-1 p-6 ml-64 min-h-screen">
                {/* Sidebar */}
                <aside
                    className="absolute top-[78px] left-0 w-64 h-[calc(100vh)] bg-background-color dark:bg-background-color-dark shadow-md border-r border-gray-400 dark:border-gray-700 flex flex-col overflow-y-auto p-5">
                    {/* Search Bar */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Zoeken..."
                            className="w-full p-2 border rounded-2xl focus:ring focus:ring-blue-300 dark:focus:ring-blue-700"
                        />
                        <span className="absolute right-3 top-2.5 text-gray-500">🔍</span>
                    </div>

                    {/* Categories */}
                    <h2 className="text-lg font-semibold mb-1 text-black dark:text-gray-200">Categorieën</h2>
                    <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-400"/>
                    <div className="space-y-2 mb-4">
                        {categories.map((category) => (
                            <label key={category.id} className="flex items-center space-x-2 text-gray-700 dark:text-gray-200">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    onChange={() => handleCategoryChange(category.id)}
                                    checked={selectedCategories.includes(category.id)}
                                />
                                <span>{category.categoryName}</span>
                            </label>))}
                    </div>

                    <h2 className="text-lg font-semibold mb-1">Lessen</h2>
                    <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-500"/>
                    <div className="space-y-2 mb-4">
                        {lessons.map((lesson) => (
                            <label key={lesson.id} className="flex items-center space-x-2 text-gray-700">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    onChange={() => handleLessonChange(lesson.id)}
                                    checked={selectedLessons.includes(lesson.id)}
                                />
                                <span>{lesson.title}</span>
                            </label>))}
                    </div>
                </aside>
                {/* Main Content */}
                <div className="flex-1 p-6">
                    <div className="flex justify-center mb-4">
                        <input
                            type="text"
                            placeholder="Zoeken..."
                            className="w-2/3 p-2 border rounded-2xl focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
                        />
                    </div>

                    <div className="text-xl font-openSans flex justify-center text-black dark:text-gray-200">
                        <h1>
                            Hier kan je oefenen met flitskaarten. Klik op een kaart om de bijbehorende video te tonen.
                        </h1>
                    </div>

                    {/* Grid for Signs with Simple Transition */}
                    <div className="flex flex-col justify-center items-center p-6">
                        {currentSigns.map((sign, index) => (
                            <div
                                key={sign.id}
                                className="relative w-2/3 h-96 bg-white dark:bg-gray-600 shadow-lg rounded-lg border border-black flex flex-col items-center justify-center transition-transform duration-500"
                                onClick={() => toggleFlip(index)}
                            >
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(index);
                                    }}
                                    className="absolute top-2 right-2 text-yellow-400 dark:text-yellow-400 text-2xl"
                                >
                                    {favorites[index] ? <FaStar/> : <FaStar className="text-gray-400 dark:text-gray-200"/>}
                                </button>
                                {!flipped[index] ? (
                                    <h2 className="text-[3rem] font-semibold text-gray-800 dark:text-gray-200">{sign.title}</h2>
                                ) : (
                                    <video className="w-[640px] h-[360px] rounded-lg shadow-lg overflow-hidden" controls>
                                        <source src={`../../public/signs/${sign.title}.mp4`} key={sign.title} type="video/mp4"/>
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center items-center mt-6 space-x-4">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className={`px-8 py-3 rounded-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-button-bg dark:bg-button-bg-dark text-white dark:text-gray-200 hover:bg-button-bg-hover dark:hover:bg-button-bg-hover-dark transition"}`}
                        >
                            Vorige
                        </button>
                        <span className="text-lg font-semibold text-center">
                Flitskaart {currentPage} van {filteredSigns.length}
            </span>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === filteredSigns.length}
                            className={`px-8 py-3 rounded-lg ${currentPage === filteredSigns.length ? "bg-gray-300 cursor-not-allowed" : "bg-button-bg dark:bg-button-bg-dark text-white hover:bg-button-bg-hover dark:hover:bg-button-bg-hover-dark transition"}`}
                        >
                            Volgende
                        </button>
                    </div>
                </div>
            </div>


    </>);
}

export default FlashCards