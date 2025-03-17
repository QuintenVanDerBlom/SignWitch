import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import mockStudents from "./DummyStudents.jsx";

function Students() {
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [modalMode, setModalMode] = useState(""); // "create", "edit" of "multi"

    const fetchStudents = async () => {
        try {
            // GET-verzoek sturen
            const response = await fetch("http://145.24.223.94:8000/users", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    apikey: "pinda",
                },
            });
            const data = await response.json();

            // Controleren of het goed gaat
            if (!response.ok) {
                console.error("Fout bij ophalen users:", response.status, await response.text());
                return;
            }

            // JSON parsen
            //const data = await response.json();

            // Resultaat loggen en in state zetten
            console.log("Data van de API:", data);
            // setStudents(data);
            setStudents(data.users);
        } catch (error) {
            console.error("Er ging iets mis:", error);
        }
    };


    useEffect(() => {
        fetchStudents();
    }, []);

    const openModal = (mode, student = null) => {
        setModalMode(mode);
        setCurrentStudent(student);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentStudent(null);
    };

    const handleCreateOrUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Object met nieuwe waarden
        const newStudent = {
            username: formData.get("username"),
            email: formData.get("email"),
            role: formData.get("role"),
        };

        if (modalMode === "create") {
            // === CREATE ===
            try {
                const postData = new URLSearchParams();
                postData.append("username", newStudent.username);
                postData.append("email", newStudent.email);
                postData.append("role", newStudent.role);

                const response = await fetch("http://145.24.223.94:8000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Accept: "application/json",
                        apikey: "pinda",
                    },
                    body: postData.toString(),
                });

                if (!response.ok) {
                    console.error("Fout bij aanmaken user:", response.status, await response.text());
                } else {
                    const data = await response.json();
                    console.log("Gebruiker aangemaakt via API:", data);
                    // Eventueel direct opnieuw fetchen of toevoegen aan state
                    // Voorbeeld: opnieuw fetchen om de lijst te updaten
                    fetchStudents();
                }
            } catch (error) {
                console.error("Error in POST request:", error);
            }
        } else if (modalMode === "edit" && currentStudent) {
            // === EDIT ===
            try {
                // Gebruiker ID uit currentStudent (API geeft '_id' terug)
                const userId = currentStudent._id;

                // x-www-form-urlencoded body maken
                const putData = new URLSearchParams();
                putData.append("username", newStudent.username);
                putData.append("email", newStudent.email);
                putData.append("role", newStudent.role);

                const response = await fetch(`http://145.24.223.94:8000/users/${userId}`, {
                    method: "PUT", // Of 'PATCH' als jouw API dat verlangt
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Accept: "application/json",
                        apikey: "pinda",
                    },
                    body: putData.toString(),
                });

                if (!response.ok) {
                    console.error("Fout bij updaten user:", response.status, await response.text());
                } else {
                    const data = await response.json();
                    console.log("Gebruiker bijgewerkt via API:", data);
                    // Hier kun je de lokale state bijwerken, of opnieuw fetchen
                    // Bijv. opnieuw fetchen om zeker te weten dat je de actuele data hebt
                    fetchStudents();
                }
            } catch (error) {
                console.error("Error in PUT request:", error);
            }
        }

        closeModal();
    };

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`http://145.24.223.94:8000/users/${userId}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    apikey: "pinda",
                },
            });

            if (!response.ok) {
                console.error("Fout bij verwijderen user:", response.status, await response.text());
            } else {
                console.log("Gebruiker verwijderd");
                // Lokaal uit je state halen of opnieuw fetchen
                setStudents(students.filter((student) => student._id !== userId));
            }
        } catch (error) {
            console.error("Error in DELETE request:", error);
        }
    };

    // Hier is de logica voor "Meerdere studenten" (multi) ongewijzigd:
    const handleMultiSubmit = async (e) => {
        e.preventDefault();

        // 1. Haal de ruwe input op
        const formData = new FormData(e.target);
        const users = formData.get("multiUsers");

        // 2. Splits op '@hr.nl' (voorbeeld) of gebruik jouw eigen parse-logica
        const parts = users.split("@hr.nl");
        const emails = parts.slice(0, -1).map((part) => part.trim() + "@hr.nl");

        // 3. Bouw een array van objecten
        const bodyArray = emails.map((email) => ({
            username: "username",
            email: email,
            role: "user",
        }));

        try {
            // 4. Verstuur als JSON-array naar de API
            const response = await fetch("http://145.24.223.94:8000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    apikey: "pinda", // Jouw API-key
                },
                body: JSON.stringify(bodyArray),
            });

            if (!response.ok) {
                // Eventueel foutafhandeling
                console.error("Fout bij het aanmaken van meerdere users:", response.status, await response.text());
            } else {
                // Bij succes: verwerk de response of update je state
                const data = await response.json();
                console.log("Succesvol aangemaakt via API:", data);
            }
        } catch (error) {
            console.error("Error in POST request:", error);
        }

        // 5. Sluit de modal (als alles klaar is)
        closeModal();
    };


    const handleXMLImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const xmlContent = event.target.result;
            const parsedStudents = parseXML(xmlContent);
            insertStudentsFromXML(parsedStudents);
        };
        reader.readAsText(file);
    };

    const parseXML = (xmlContent) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlContent, "application/xml");
        const studentsNodes = xmlDoc.getElementsByTagName("student");

        const studentsArray = [];
        for (let i = 0; i < studentsNodes.length; i++) {
            const studentNode = studentsNodes[i];
            const username = studentNode.getElementsByTagName("username")[0]?.textContent;
            const email = studentNode.getElementsByTagName("email")[0]?.textContent;
            const role = studentNode.getElementsByTagName("role")[0]?.textContent;

            if (username && email) {
                studentsArray.push({
                    username: username,
                    email: email,
                    role: role,
                    created_date: new Date().toISOString(),
                });
            }
        }
        return studentsArray;
    };

    const insertStudentsFromXML = (newStudents) => {
        setStudents((prevStudents) => [...prevStudents, ...newStudents]);
    };


    const [roleFilter, setRoleFilter] = useState("user");

    return (
        <div className="flex flex-col p-12 min-h-screen mx-auto max-w-8xl">
            {/* Header met filters en knoppen */}
            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-semibold">
                    {roleFilter === "user" ? "Studenten" : "Docenten"}
                </h1>

                <div className="flex space-x-4">
                    <button
                        onClick={() => setRoleFilter("user")}
                        className={`py-2 px-4 rounded-lg ${roleFilter === "user" ? "bg-blue-700 text-white" : "bg-gray-300"}`}
                    >
                        Studenten
                    </button>
                    <button
                        onClick={() => setRoleFilter("teacher")}
                        className={`py-2 px-4 rounded-lg ${roleFilter === "teacher" ? "bg-blue-700 text-white" : "bg-gray-300"}`}
                    >
                        Docenten
                    </button>
                    <button
                        onClick={() => openModal("create")}
                        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                    >
                        Voeg {roleFilter === "user" ? "Student" : "Docent"} Toe
                    </button>
                </div>
            </div>

            {/* Gebruikerslijst */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {students.map((user) => {
                    if (user.role !== roleFilter) return null; // Filter direct in map()

                    return (
                        <div key={user.id} className="relative p-4 text-center bg-white shadow-md rounded-lg border">
                            <h2 className="text-xl font-semibold">{user.username}</h2>
                            <p className="text-sm text-gray-500">{user.email}</p>

                            {/* Bewerken / Verwijderen Knoppen */}
                            <div className="absolute top-2 right-2 space-x-2">
                                <button onClick={() => openModal("edit", user)} className="text-yellow-400">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(user.id)} className="text-red-400">
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


    export default Students;
