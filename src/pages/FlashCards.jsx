import {useEffect, useState} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {FaStar} from "react-icons/fa";

function FlashCards() {
    // Kan ongebruikte code uitcommenten, maar wordt misschien later nog gebruikt.
    const [signs, setSigns] = useState([]);
    const [categories, setCategories] = useState([]);
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    const itemsPerPage = 12;
    const totalPages = Math.ceil(signs.length / itemsPerPage);
    const [fadeClass, setFadeClass] = useState("opacity-0 translate-y-4");
    const [favorites, setFavorites] = useState({}); // Store favorite states
    const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories
    const [selectedLessons, setSelectedLessons] = useState([]); // Track selected lessons
    const [flipped, setFlipped] = useState({});
    const loginData = useOutletContext();
    const [userID, setUserID] = useState("");


    useEffect(() => {
        setFadeClass("opacity-100 translate-y-0 transition-opacity duration-500 ease-in-out");
    }, [currentPage]);
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
                    const shuffledSigns = shuffleSigns(data.items);
                    setSigns(shuffledSigns);  // Use the 'items' array from the response
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

    const filteredSigns = (showFavoritesOnly
        ? signs.filter((sign) => favorites.some(favorite => favorite.sign_id === sign._id && favorite.saved === true))
        : signs)
        .filter(sign => {
            const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(sign.category);
            const isLessonMatch = selectedLessons.length === 0 || selectedLessons.includes(sign.lesson);
            return isCategoryMatch && isLessonMatch;
        });

    const startIndex = currentPage - 1; // Zorg dat de index bij 0 begint


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
    // const toggleFavorite = (index) => {
    //     setFavorites((prev) => ({
    //         ...prev, [index]: !prev[index], // Toggle favorite state
    //     }));
    // };
    async function toggleFavorite(id) {
        try {
            // Zoek de favoriet in de lijst
            const favoriteItem = favorites.find(fav => fav.sign_id === id);
            const newSavedStatus = favoriteItem ? !favoriteItem.saved : true; // Als het item nog niet bestaat, stel het in op true
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
    console.log(favorites)
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

    const shuffleSigns = (signs) => {
        for (let i = signs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [signs[i], signs[j]] = [signs[j], signs[i]];
        }
        return signs;
    };



    return (<>
            <div className="flex-1 p-6 ml-64 min-h-screen">
                {/* Sidebar */}
                <aside
                    className="absolute top-[78px] left-0 w-64 h-[calc(100vh)] bg-background-color dark:bg-background-color-dark shadow-md border-r border-gray-400 dark:border-gray-700 flex flex-col overflow-y-auto p-5">
                    {/* Search Bar */}
                    {/*<div className="relative mb-4">*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        placeholder="Zoeken..."*/}
                    {/*        className="w-full p-2 border rounded-2xl focus:ring focus:ring-blue-300 dark:focus:ring-blue-700"*/}
                    {/*    />*/}
                    {/*    <span className="absolute right-3 top-2.5 text-gray-500">🔍</span>*/}
                    {/*</div>*/}

                    {/* Categories */}
                    <h2 className="text-lg font-semibold mb-1 text-black dark:text-gray-200">Categorieën</h2>
                    <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-400"/>
                    <div className="space-y-2 mb-4">
                        {categories.map((category) => (
                            <label key={category.id}
                                   className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    onChange={() => handleCategoryChange(category.id)}
                                    checked={selectedCategories.includes(category.id)}
                                />
                                <span>{category.categoryName}</span>
                            </label>))}
                    </div>

                    <h2 className="text-lg font-semibold mb-1 text-black dark:text-gray-200">Lessen</h2>
                    <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-300"/>
                    <div className="space-y-2 mb-4">
                        {lessons.map((lesson) => (
                            <label key={lesson.id}
                                   className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
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
                    {/*<div className="flex justify-center mb-4">*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        placeholder="Zoeken..."*/}
                    {/*        className="w-2/3 p-2 border rounded-2xl focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <div className="text-xl flex flex-col font-openSans justify-center items-center text-black dark:text-gray-200">
                        <h1>
                            Hier kan je oefenen met flitskaarten. Klik op een kaart om de bijbehorende video te tonen.
                        </h1>
                        <button
                            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                            className="mt-4 px-4 py-2 rounded-lg bg-blue-500 text-white w-64 hover:bg-blue-600 transition"
                        >
                            {showFavoritesOnly ? "Toon alle tekens" : "Toon alleen favorieten"}
                        </button>
                    </div>

                    {/* Grid for Signs with Simple Transition */}
                    <div className="flex flex-col justify-center items-center p-6">
                        {currentSigns.map((sign, index) => (
                            <div
                                key={sign._id}
                                className="relative w-2/3 h-96 bg-white dark:bg-gray-600 shadow-lg rounded-lg border border-black flex flex-col items-center justify-center transition-transform duration-500"
                                onClick={() => toggleFlip(index)}
                            >
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(sign._id);
                                    }}
                                    className="absolute top-2 right-2 text-yellow-400 text-2xl"
                                >
                                    {favorites && favorites.some(fav => fav.sign_id === sign._id && fav.saved) ? (
                                        <FaStar /> // If it's a favorite
                                    ) : (
                                        <FaStar className="text-gray-400 dark:text-gray-200" /> // If it's not a favorite
                                    )}
                                </button>
                                {!flipped[index] ? (
                                    <h2 className="text-[3rem] font-semibold text-gray-800 dark:text-gray-200">{sign.title}</h2>
                                ) : (
                                    <video className="w-[640px] h-[360px] rounded-lg shadow-lg overflow-hidden" controls>
                                        <source src={`/signs/${sign.title}.mp4`} key={sign.title} type="video/mp4"/>
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