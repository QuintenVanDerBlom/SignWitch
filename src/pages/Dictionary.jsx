import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa"; // Importing star icon
import { useNavigate } from "react-router-dom";

function Dictionary() {
    const [signs, setSigns] = useState([]);
    const [favorites, setFavorites] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLessons, setSelectedLessons] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const [fadeClass, setFadeClass] = useState("opacity-0 translate-y-4");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const totalPages = Math.ceil(signs.length / itemsPerPage);
    const navigate = useNavigate();

    const categories = [
        { id: 1, name: "Cijfers" },
        { id: 2, name: "Letters" },
        { id: 3, name: "Woorden" },
        { id: 4, name: "Basis" },
    ];

    const lessons = [
        { id: 1, name: "Les 1" },
        { id: 2, name: "Les 2" },
        { id: 3, name: "Les 3" },
        { id: 4, name: "Les 4" },
        { id: 5, name: "Les 5" },
    ];

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
                        "apiKey": "EHKG61Lr3Bq0PDncCoALn9hvG2LeHVBB",
                        "Accept": "application/json",
                    },
                });
                const data = await response.json();
                if (data && data.items && Array.isArray(data.items)) {
                    setSigns(data.items);
                } else {
                    console.error("Unexpected data format:", data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchSigns();
    }, []);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const filteredSigns = signs.filter(sign => {
        const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(sign.category_id);
        const isLessonMatch = selectedLessons.length === 0 || selectedLessons.includes(sign.lesson_id);
        return isCategoryMatch && isLessonMatch;
    });

    const currentSigns = showFavorites
        ? filteredSigns.filter(sign => favorites[sign._id])
        : filteredSigns;

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

    const toggleFavorite = async (signId) => {
        try {
            const isFavorite = favorites[signId];
            if (isFavorite) {
                // Delete
                await fetch(`http://145.24.223.94:8000/favorites/${signId}`, {
                    method: "DELETE",
                    headers: {
                        "apiKey": "EHKG61Lr3Bq0PDncCoALn9hvG2LeHVBB",
                    },
                });
            } else {
                // Add
                await fetch(`http://145.24.223.94:8000/favorites/${signId}`, {
                    method: "POST",
                    headers: {
                        "apiKey": "EHKG61Lr3Bq0PDncCoALn9hvG2LeHVBB",
                    },
                });
            }

            setFavorites(prev => ({
                ...prev,
                [signId]: !isFavorite,
            }));
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    const handleCategoryChange = (categoryId) => {
        setCurrentPage(1);
        setSelectedCategories((prev) => {
            if (prev.includes(categoryId)) {
                return prev.filter(id => id !== categoryId);
            } else {
                return [...prev, categoryId];
            }
        });
    };

    const handleLessonChange = (lessonId) => {
        setCurrentPage(1);
        setSelectedLessons((prev) => {
            if (prev.includes(lessonId)) {
                return prev.filter(id => id !== lessonId);
            } else {
                return [...prev, lessonId];
            }
        });
    };

    return (
        <div className="flex-1 p-6 ml-64 min-h-screen">
            {/* Sidebar */}
            <aside
                className="absolute top-[78px] left-0 w-64 h-[calc(100vh)] bg-background-color shadow-md border-r border-gray-400 flex flex-col overflow-y-auto p-5">
                <h2 className="text-lg font-semibold mb-1">Categorieën</h2>
                <div className="space-y-2 mb-4">
                    {categories.map((category) => (
                        <label key={category.id} className="flex items-center space-x-2 text-gray-700">
                            <input
                                type="checkbox"
                                className="w-4 h-4"
                                onChange={() => handleCategoryChange(category.id)}
                                checked={selectedCategories.includes(category.id)}
                            />
                            <span>{category.name}</span>
                        </label>
                    ))}
                </div>
                <h2 className="text-lg font-semibold mb-1">Lessen</h2>
                <div className="space-y-2 mb-4">
                    {lessons.map((lesson) => (
                        <label key={lesson.id} className="flex items-center space-x-2 text-gray-700">
                            <input
                                type="checkbox"
                                className="w-4 h-4"
                                onChange={() => handleLessonChange(lesson.id)}
                                checked={selectedLessons.includes(lesson.id)}
                            />
                            <span>{lesson.name}</span>
                        </label>
                    ))}
                </div>

                {/* Favorites Toggle Hier. */}
                <div className="mt-4 flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="showFavorites"
                        className="w-4 h-4"
                        onChange={() => setShowFavorites(!showFavorites)}
                        checked={showFavorites}
                    />
                    <label htmlFor="showFavorites" className="text-gray-700">Toon alleen favorieten</label>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* De Grid */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${fadeClass}`}>
                    {currentSigns.map((sign) => (
                        <div key={sign._id} className="relative p-4 text-center bg-white shadow-md rounded-lg border border-black flex flex-col">
                            <button
                                onClick={() => toggleFavorite(sign._id)}
                                className="absolute top-2 right-2 text-yellow-400 text-2xl"
                            >
                                {favorites[sign._id] ? <FaStar /> : <FaStar className="text-gray-300" />}
                            </button>
                            <img src={sign.image} alt={sign.title} className="w-24 h-24 mx-auto mb-2" />
                            <h2 className="text-xl font-semibold text-gray-800">{sign.title}</h2>
                            <button
                                onClick={() => navigate(`/woordenboek/woord/${sign._id}`)}
                                className="mt-auto bg-button-bg text-white py-2 px-4 rounded-lg hover:bg-button-bg-hover transition"
                            >
                                Meer Informatie
                            </button>
                        </div>
                    ))}
                </div>

                {/* Pagination Simplified */}
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
