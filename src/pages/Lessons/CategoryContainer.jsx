import {Link} from "react-router";
import {useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";

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
                        "apiKey": "9tavSjz5IYTNCGpIhjnkcS2HIXnVMrFz", // Zorg dat je hier je API key gebruikt
                        "Accept": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                setUserID(data._id);

                // Filter alleen de gesavede signs (waar saved: true is)
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
                // Opslaan in state
                setCategorySigns(data.categorySigns);
            } catch (error) {
                console.error("Error fetching category signs:", error);
            }
        };

        fetchCategorySigns();
    }, []);

    useEffect(() => {
        if (categorySigns.length > 0 && savedSigns.length > 0) {

            // Check hoeveel opgeslagen tekens in de categorie zitten
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
                <h2 className="text-center font-k2d text-xl">{category.categoryName}</h2>
                <div className="">➝</div>
            </div>
            <p className="m-5 text-xl">{signCount}/{categorySigns.length} nog oefenen</p>
        </div>
    );
}


export default CategoryContainer