import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa"; // Importing star icon
import { useNavigate } from "react-router-dom";

function Dictionary() {
    const [signs, setSigns] = useState([]);
    // const categories = [
    //     { id: 1, name: "Cijfers" },
    //     { id: 2, name: "Letters" },
    //     { id: 3, name: "Woorden" },
    //     { id: 4, name: "Basis" },
    // ];
    const [categories, setCategories] = useState([]);
    const [lessons, setLessons] = useState([]);


    // const lessons = [
    //     { id: 1, name: "Les 1" },
    //     { id: 2, name: "Les 2" },
    //     { id: 3, name: "Les 3" },
    //     { id: 4, name: "Les 4" },
    //     { id: 5, name: "Les 5" },
    // ];

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const totalPages = Math.ceil(signs.length / itemsPerPage);
    const [fadeClass, setFadeClass] = useState("opacity-0 translate-y-4");
    const [favorites, setFavorites] = useState({}); // Store favorite states
    const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories
    const [selectedLessons, setSelectedLessons] = useState([]); // Track selected lessons

    useEffect(() => {
        setFadeClass("opacity-100 translate-y-0 transition-opacity duration-500 ease-in-out");
    }, [currentPage]);

    useEffect(() => {
        // Fetch the signs data from the API
        const fetchSigns = async () => {
            try {
                const response = await fetch("http://145.24.223.94:8000/signs", {
                    method: "GET",
                    headers: {
                        "apiKey": "9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz", // Replace with your actual API key
                        "Accept": "application/json",
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
                    method: "GET",
                    headers: {
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
    useEffect(() => {
        // Fetch the signs data from the API
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://145.24.223.94:8000/lessons", {
                    method: "GET",
                    headers: {
                        "apiKey": "9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz", // Replace with your actual API key
                        "Accept": "application/json",
                    },
                });
                const data = await response.json();

                console.log("Fetched data:", data);

                // Access the 'items' array and set it to the signs state
                if (data && data.items && Array.isArray(data.items)) {
                    setLessons(data.items); // Use the 'items' array from the response
                    console.log(data.items);
                } else {
                    console.error("Unexpected data format:", data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCategories();
    }, []);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentSigns = selectedCategories.length > 0 || selectedLessons.length > 0
        ? signs.filter(sign => {
            const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(sign.category);
            const isLessonMatch = selectedLessons.length === 0 || selectedLessons.includes(sign.lesson);
            return isCategoryMatch && isLessonMatch;
        }).slice(startIndex, startIndex + itemsPerPage)
        : signs.slice(startIndex, startIndex + itemsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setFadeClass("opacity-0 translate-y-4");
            setTimeout(() => setCurrentPage(currentPage + 1), 200);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setFadeClass("opacity-0 translate-y-4");
            setTimeout(() => setCurrentPage(currentPage - 1), 200);
        }
    };

    const toggleFavorite = (index) => {
        setFavorites((prev) => ({
            ...prev,
            [index]: !prev[index], // Toggle favorite state
        }));
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

    return (
        <div className="flex-1 p-6 ml-64 min-h-screen">
            {/* Sidebar */}
            <aside
                className="absolute top-[78px] left-0 w-64 h-[calc(100vh)] bg-background-color shadow-md border-r border-gray-400 flex flex-col overflow-y-auto p-5">
                {/* Search Bar */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Zoeken..."
                        className="w-full p-2 border rounded-2xl focus:ring focus:ring-blue-300"
                    />
                    <span className="absolute right-3 top-2.5 text-gray-500">🔍</span>
                </div>

                {/* Categories */}
                <h2 className="text-lg font-semibold mb-1">Categorieën</h2>
                <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-300"/>
                <div className="space-y-2 mb-4">
                    {categories.map((category) => (
                        <label key={category.id} className="flex items-center space-x-2 text-gray-700">
                            <input
                                type="checkbox"
                                className="w-4 h-4"
                                onChange={() => handleCategoryChange(category.id)}
                                checked={selectedCategories.includes(category.id)}
                            />
                            <span>{category.categoryName}</span>
                        </label>
                    ))}
                </div>

                {/* Lessons */}
                <h2 className="text-lg font-semibold mb-1">Lessen</h2>
                <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-300"/>
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
                        </label>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="flex justify-center mb-4">
                    <input
                        type="text"
                        placeholder="Zoeken..."
                        className="w-2/3 p-2 border rounded-2xl focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Grid for Signs with Simple Transition */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${fadeClass}`}>
                    {currentSigns.map((sign, index) => {
                        const realIndex = startIndex + index;
                        return (
                            <div key={realIndex}
                                 className="relative p-4 text-center bg-white shadow-md rounded-lg border border-black flex flex-col">
                                {/* Favorite Icon in Top Right */}
                                <button
                                    onClick={() => toggleFavorite(realIndex)}
                                    className="absolute top-2 right-2 text-yellow-400 text-2xl"
                                >
                                    {favorites[realIndex] ? <FaStar/> : <FaStar className="text-gray-300"/>}
                                </button>

                                {/*<img src={`../../public/signs/${sign.title}.mp4`} alt={sign.title} className="w-24 h-24 mx-auto mb-2"/>*/}
                                <h2 className="text-xl font-semibold text-gray-800 m-2">{sign.title}</h2>
                                <button
                                    onClick={() => navigate(`/woordenboek/woord/${sign._id}`)} // Make sure sign.id is available
                                    className="mt-auto bg-button-bg text-white py-2 px-4 rounded-lg hover:bg-button-bg-hover transition">
Bekijken                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-6 space-x-4">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-button-bg text-white hover:bg-button-bg-hover transition"}`}
                    >
                        Vorige
                    </button>
                    <span className="text-lg font-semibold">
                        Pagina {currentPage} van {totalPages}
                    </span>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-button-bg text-white hover:bg-button-bg-hover transition"}`}
                    >
                        Volgende
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dictionary;
