import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import mockStudents from "./DummyStudents.jsx";

function Students() {
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [modalMode, setModalMode] = useState(""); // "create", "edit" of "multi"

    const fetchStudents = () => {
        setStudents(mockStudents);
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

        // Maak een object van de ingevoerde gegevens
        const newStudent = {
            username: formData.get("username"),
            email: formData.get("email"),
            created_date: new Date().toISOString(),
            role: "user", // Voorbeeld: standaard 'user'
        };

        // Bij "create" versturen we de data naar de API
        if (modalMode === "create") {
            try {
                // Gebruik URLSearchParams voor application/x-www-form-urlencoded
                const postData = new URLSearchParams();
                postData.append("username", newStudent.username);
                postData.append("email", newStudent.email);
                postData.append("role", newStudent.role);

                const response = await fetch("http://145.24.223.94:8000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Accept: "application/json",
                        apikey: "pinda", // Zet hier je API-key
                    },
                    body: postData.toString(),
                });

                if (!response.ok) {
                    // Toon fout in console als het misgaat
                    console.error("Fout bij aanmaken user:", response.status, await response.text());
                } else {
                    // Optioneel: de nieuwe user-gegevens uit de response halen
                    const data = await response.json();
                    console.log("Gebruiker aangemaakt via API:", data);

                    // Toevoegen aan je lokale state (optioneel)
                    setStudents((prev) => [
                        ...prev,
                        {
                            // Hier kun je data uit de response gebruiken
                            username: data.username,
                            email: data.email,
                            created_date: new Date().toISOString(),
                        },
                    ]);
                }
            } catch (error) {
                console.error("Error in POST request:", error);
            }
        }
        // Bij "edit" werk je alleen je lokale state bij (of doe je een PUT/PATCH naar de API, afhankelijk van je behoefte)
        else if (modalMode === "edit" && currentStudent) {
            const updatedStudents = students.map((student) =>
                student.username === currentStudent.username ? newStudent : student
            );
            setStudents(updatedStudents);
        }

        // Modal sluiten
        closeModal();
    };

    const handleDelete = (username) => {
        setStudents(students.filter((student) => student.username !== username));
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

            if (username && email) {
                studentsArray.push({
                    username: username,
                    email: email,
                    created_date: new Date().toISOString(),
                });
            }
        }
        return studentsArray;
    };

    const insertStudentsFromXML = (newStudents) => {
        setStudents((prevStudents) => [...prevStudents, ...newStudents]);
    };

    return (
        <div className="flex flex-col p-12 min-h-screen mx-auto max-w-8xl">
            {/* Main Content */}
            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-semibold">Studenten</h1>
                <div className="flex space-x-4">
                    {/* Import XML Button */}
                    {/*<label className="bg-green-600 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-green-700 transition">*/}
                    {/*    Importeer XML*/}
                    {/*    <input*/}
                    {/*        type="file"*/}
                    {/*        accept=".xml"*/}
                    {/*        onChange={handleXMLImport}*/}
                    {/*        className="hidden"*/}
                    {/*    />*/}
                    {/*</label>*/}
                    <button
                        onClick={() => openModal("create")}
                        className="bg-button-bg text-white py-2 px-4 rounded-lg hover:bg-button-bg-hover transition"
                    >
                        Voeg Student Toe
                    </button>
                    {/* Nieuwe knop voor meerdere studenten */}
                    <button
                        onClick={() => openModal("multi")}
                        className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition"
                    >
                        Voeg Meerdere Studenten Toe
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {students.map((student) => (
                    <div key={student.username} className="relative p-4 text-center bg-white shadow-md rounded-lg border">
                        <h2 className="text-xl font-semibold">{student.username}</h2>
                        <p className="text-sm text-gray-500">{student.email}</p>
                        <p className="text-xs text-gray-400">{new Date(student.created_date).toLocaleDateString()}</p>
                        <div className="absolute top-2 right-2 space-x-2">
                            <button onClick={() => openModal("edit", student)} className="text-yellow-400">
                                <FaEdit />
                            </button>
                            <button onClick={() => handleDelete(student.username)} className="text-red-400">
                                <FaTrashAlt />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal voor Create/Edit/Multi */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        {(modalMode === "create" || modalMode === "edit") && (
                            <>
                                <h2 className="text-xl font-semibold mb-4">
                                    {modalMode === "create" ? "Voeg Student Toe" : "Bewerk Student"}
                                </h2>
                                <form onSubmit={handleCreateOrUpdate}>
                                    <div className="mb-4">
                                        <label htmlFor="username" className="block text-sm font-medium">
                                            Username
                                        </label>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            defaultValue={currentStudent ? currentStudent.username : ""}
                                            className="w-full p-2 border rounded-lg mt-1"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-sm font-medium">
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            defaultValue={currentStudent ? currentStudent.email : ""}
                                            className="w-full p-2 border rounded-lg mt-1"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400"
                                        >
                                            Annuleren
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                        >
                                            {modalMode === "create" ? "Toevoegen" : "Bewerken"}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                        {modalMode === "multi" && (
                            <>
                                <h2 className="text-xl font-semibold mb-4">Voeg Meerdere Studenten Toe</h2>
                                <form onSubmit={handleMultiSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="multiUsers" className="block text-sm font-medium">
                                            Gebruikers
                                        </label>
                                        <input
                                            id="multiUsers"
                                            name="multiUsers"
                                            type="text"
                                            placeholder="1234567@hr.nl1234568@hr.nls.wesselsss@hr.nl"
                                            className="w-full p-2 border rounded-lg mt-1"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400"
                                        >
                                            Annuleren
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                        >
                                            Toevoegen
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Students;
