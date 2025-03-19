import { Link } from "react-router";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

function CategoryContainer({ category }) {
    const loginData = useOutletContext();
    const [userID, setUserID] = useState("");
    const [savedSigns, setSavedSigns] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://145.24.223.94:8000/users/${loginData.email}`, {
                    method: "GET",
                    headers: {
                        "apiKey": "9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz",
                        "Accept": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                setUserID(data._id);

                const filteredSigns = data.signsSaved?.filter(sign => sign.saved === true) || [];
                setSavedSigns(filteredSigns);
                console.log("filteredSigns", filteredSigns);

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, []);

    const [signCount, setSignCount] = useState(0);
    const [categorySigns, setCategorySigns] = useState([]);

    useEffect(() => {
        const fetchCategorySigns = async () => {
            try {
                const response = await fetch(`http://145.24.223.94:8000/categories/${category.id}`, {
                    method: "GET",
                    headers: {
                        "apiKey": "9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz",
                        "Accept": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                setCategorySigns(data.categorySigns);
            } catch (error) {
                console.error("Error fetching category signs:", error);
            }
        };

        fetchCategorySigns();
    }, []);

    useEffect(() => {
        if (categorySigns.length > 0 && savedSigns.length > 0) {
            const count = savedSigns.filter(sign =>
                categorySigns.some(catSign => catSign._id === sign.sign_id)
            ).length;

            setSignCount(count);
        }
    }, [categorySigns, savedSigns]);

    return (
        <div
            className="bg-lesson-container dark:bg-lesson-container-dark text-white p-4 rounded-lg shadow-lg w-96 h-36 m-10 flex flex-col justify-between items-center transition-transform duration-200 hover:scale-105">
            <div className="flex w-72 flex-row justify-between">
                <div></div>
                <h2 className="text-center font-k2d text-xl" aria-live="polite">{category.categoryName}</h2> {/* Gebruik aria-live voor dynamische inhoud */}
                <Link
                    to={`/category/${category.id}`}
                    aria-label={`Bekijk de details van de categorie ${category.categoryName}`}
                    tabindex="0" // Zorg ervoor dat het element toegankelijk is via toetsenbord
                >
                    <div className="text-2xl">➝</div>
                </Link>
            </div>

            <p className="m-5 text-xl" aria-live="polite">
                {signCount}/{categorySigns.length} nog oefenen
                <span className="sr-only"> van de {categorySigns.length} beschikbare tekens in deze categorie</span> {/* Verbetering voor visuele ondersteuning */}
            </p> {/* Dynamische inhoud zichtbaar maken voor schermlezers */}
        </div>
    );
}

export default CategoryContainer;
