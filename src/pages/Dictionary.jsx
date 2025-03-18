import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa"; // Importing star icon
import {useNavigate, useOutletContext} from "react-router-dom";

function Dictionary() {
    const [signs, setSigns] = useState([]);
    const [categories, setCategories] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Zoekterm

    const navigate = useNavigate();
    const loginData = useOutletContext();
    const [userID, setUserID] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const [totalPages, setTotalPages] = useState(1); // Totaal aantal pagina's
    const [fadeClass, setFadeClass] = useState("opacity-0 translate-y-4");
    const [favorites, setFavorites] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories
    const [selectedLessons, setSelectedLessons] = useState([]); // Track selected lessons

    useEffect(() => {
        setFadeClass("opacity-100 translate-y-0 transition-opacity duration-500 ease-in-out");
    }, [currentPage]);

    useEffect(() => {
        const fetchSigns = async () => {
            try {
                const response = await fetch(`http://145.24.223.94:8000/signs?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}&category=${selectedCategories}`, {
                    method: "GET",
                    headers: {
                        "apiKey": "9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz",
                        "Accept": "application/json",
                        // "Accept-version": "v2",
                    },
                });
                const data = await response.json();

                if (data && data.items) {
                    setSigns(data.items);
                    setTotalPages(data.pagination.totalPages); // Totaal aantal pagina's
                    console.log(`http://145.24.223.94:8000/signs?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}&category=${selectedCategories}`)
                    console.log(data.items)
                } else {
                    console.error("Unexpected data format:", data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchSigns();
    }, [currentPage, selectedCategories, searchTerm]);
    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        setCurrentPage(1);
    };
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
        const fetchLessons = async () => {
            try {
                const response = await fetch("http://145.24.223.94:8000/lessons", {
                    method: "GET",
                    headers: {
                        "apiKey": "9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz", // Replace with your actual API key
                        "Accept": "application/json",
                    },
                });
                const data = await response.json();
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

        fetchLessons();
    }, []);
    useEffect(() => {
        // Fetch the signs data from the API
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://145.24.223.94:8000/users/${loginData.email}`, {
                    method: "GET",
                    headers: {
                        "apiKey": "9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz", // Replace with your actual API key
                        "Accept": "application/json",
                    },
                });
                const data = await response.json();

                // Access the 'items' array and set it to the signs state
                    setFavorites(data.signsSaved)
                    setUserID(data._id)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchUser();
    }, []);

    async function toggleFavorite(id) {
        try {
            // Zoek de favoriet in de lijst
            const favoriteItem = favorites.find(fav => fav.sign_id === id);
            const newSavedStatus = favoriteItem ? !favoriteItem.saved : true; // Als het item nog niet bestaat, stel het in op true
            setCurrentPage(1); // Reset naar de eerste pagina

            // Werk de lokale 'favorites' state bij
            setFavorites(prevFavorites => {
                const newFavorites = prevFavorites.map(fav => {
                    if (fav.sign_id === id) {
                        return { ...fav, saved: newSavedStatus };
                    }
                    return fav;
                });
                if (!favoriteItem) {
                    newFavorites.push({ sign_id: id, saved: newSavedStatus }); // Als het nog niet bestaat, voeg het toe
                }
                return newFavorites;
            });

            // Stuur de PATCH request naar de server
            const response = await fetch(`http://145.24.223.94:8000/users/${userID}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "apiKey": "9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz", // Vervang met je daadwerkelijke API-sleutel
                },
                body: JSON.stringify({
                    signId: id, // Voeg signId toe
                    saved: newSavedStatus
                })
            });

            if (!response.ok) {
                throw new Error("Fout bij updaten van favoriet");
            }

            console.log(`Favoriet ${id} succesvol geüpdatet!`);
        } catch (error) {
            console.error("Fout bij het updaten van favoriet:", error);
        }
    }


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
            setCurrentPage(prevPage => prevPage + 1)
            console.log("in de if");

        }
        console.log(currentPage);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setFadeClass("opacity-0 translate-y-4");
            setTimeout(() => setCurrentPage(currentPage - 1), 200);
        }
    };

    // const toggleFavorite = (index) => {
    //     setFavorites((prev) => ({
    //         ...prev,
    //         [index]: !prev[index], // Toggle favorite state
    //     }));
    // };

    const handleCategoryChange = (categoryId) => {
        setCurrentPage(1); // Reset to page 1 when category changes
        setSelectedCategories((prev) => {
            if (prev.includes(categoryId)) {
                // Remove category if already selected

                return prev.filter(id => id !== categoryId);
            } else {

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
    const filteredSigns = showFavoritesOnly
        ? signs.filter((sign) => favorites.some(favorite => favorite.sign_id === sign._id && favorite.saved === true))
        : signs;

    return (
        <div className="flex-1 p-6 ml-64 min-h-screen">
            {/* Sidebar */}
            <aside
                className="absolute top-[78px] left-0 w-64 h-[calc(100vh)] bg-background-color dark:bg-background-color-dark shadow-md border-r border-gray-400 dark:border-gray-600 flex flex-col overflow-y-auto p-5">
                {/* Search Bar */}
                {/*<div className="relative mb-4">*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        placeholder="Zoeken..."*/}
                {/*        className="w-full p-2 border rounded-2xl focus:ring focus:ring-blue-300"*/}
                {/*    />*/}
                {/*    <span className="absolute right-3 top-2.5 text-gray-600 dark:text-gray-200">🔍</span>*/}
                {/*</div>*/}

                {/* Categories */}
                <h2 className="text-lg font-semibold mb-1 text-black dark:text-gray-200">Categorieën</h2>
                <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-300"/>
                <div className="space-y-2 mb-4">
                    {categories.map((category) => (
                        <label key={category.id} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
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
                <h2 className="text-lg font-semibold mb-1 text-black dark:text-gray-200">Lessen</h2>
                <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-300"/>
                <div className="space-y-2 mb-4">
                    {lessons.map((lesson) => (
                        <label key={lesson.id} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
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
                <div className="flex flex-col justify-center items-center mb-4 w-full">
                    <input
                        type="text"
                        placeholder="Zoeken..."
                        value={searchTerm}
                        onChange={handleInputChange}
                        className="p-2 border rounded-2xl focus:ring focus:ring-blue-300 w-full"
                    />
                    <button
                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                        className="mt-4 px-4 py-2 rounded-lg bg-blue-500 text-white w-64 hover:bg-blue-600 transition"
                    >
                        {showFavoritesOnly ? "Toon alle tekens" : "Toon alleen favorieten"}
                    </button>
                </div>

                {/* Grid for Signs with Simple Transition */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${fadeClass}`}>
                    {filteredSigns.slice().map((sign) => {

                        const isFavorite = favorites.some(favorite => favorite.sign_id === sign._id && favorite.saved === true);
                        return (
                            <div key={sign._id}
                                 className="relative p-4 text-center bg-white dark:bg-gray-300 shadow-md rounded-lg border border-black flex flex-col">
                                {/* Favorite Icon in Top Right */}
                                <button
                                    onClick={() => toggleFavorite(sign._id)}
                                    className="absolute top-2 right-2 text-yellow-400 text-2xl"
                                >
                                    <FaStar className={isFavorite ? "text-yellow-400" : "text-gray-300"}/>
                                </button>

                                <h2 className="text-xl font-semibold text-gray-800 m-2">{sign.title}</h2>

                                <button
                                    onClick={() =>
                                        navigate(`/woordenboek/woord/${sign._id}?category_ids=${selectedCategories.join(',')}&lesson_ids=${selectedLessons.join(',')}`)
                                    }
                                    className="mt-auto bg-button-bg dark:bg-button-bg-dark text-white py-2 px-4 rounded-lg hover:bg-button-bg-hover-dark dark:hover:bg-button-bg-hover transition">
Bekijken                                </button>
                            </div>
                        );
                    })}


                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-6 space-x-4">
                    <button onClick={goToPreviousPage} disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg bg-gray-300 text-black">
                        Vorige
                    </button>
                    <span>Pagina {currentPage} van {totalPages}</span>
                    <button onClick={goToNextPage} disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-lg bg-gray-300 text-black">
                        Volgende
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dictionary;
