import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import mockStudents from "./DummyStudents.jsx";

function Students() {
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [modalMode, setModalMode] = useState(""); // "create", "edit" of "multi"
    const [view, setView] = useState("students"); // "students" of "teachers"


    const fetchStudents = async () => {
        try {
            const response = await fetch("http://145.24.223.94:8000/users", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    apikey: "pinda",
                },
            });
            const data = await response.json();

            if (!response.ok) {
                console.error("Fout bij ophalen users:", response.status, await response.text());
                return;
            }

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

        const newStudent = {
            username: formData.get("username"),
            email: formData.get("email"),
            role: formData.get("role"),
        };

        if (modalMode === "create") {
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
                    fetchStudents();
                }
            } catch (error) {
                console.error("Error in POST request:", error);
            }
        } else if (modalMode === "edit" && currentStudent) {
            try {
                const userId = currentStudent._id;
                const putData = new URLSearchParams();
                putData.append("username", newStudent.username);
                putData.append("email", newStudent.email);
                putData.append("role", newStudent.role);

                const response = await fetch(`http://145.24.223.94:8000/users/${userId}`, {
                    method: "PUT",
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
                setStudents(students.filter((student) => student._id !== userId));
            }
        } catch (error) {
            console.error("Error in DELETE request:", error);
        }
    };

    return (
        <div className="flex flex-col p-12 min-h-screen mx-auto max-w-8xl">
            {/* Main Content */}
            <div className="flex justify-between mb-4">
                <div className="flex justify-center mb-6">
                    <button
                        aria-pressed={view === "students"}
                        className={`py-2 px-6 rounded-l-lg ${view === "students" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                        onClick={() => setView("students")}
                    >
                        Studenten
                    </button>
                    <button
                        aria-pressed={view === "teachers"}
                        className={`py-2 px-6 rounded-r-lg ${view === "teachers" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                        onClick={() => setView("teachers")}
                    >
                        Docenten
                    </button>
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={() => openModal("create")}
                        className="bg-button-bg text-white py-2 px-4 rounded-lg hover:bg-button-bg-hover transition"
                        aria-label="Voeg gebruiker toe"
                    >
                        Voeg Gebruiker Toe
                    </button>
                    <button
                        onClick={() => openModal("multi")}
                        className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition"
                        aria-label="Voeg meerdere studenten toe"
                    >
                        Voeg Meerdere Studenten Toe
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {students.filter(user => user.role === (view === "students" ? "user" : "teacher")).map((user) => (
                    <div key={user._id} className="relative p-4 text-center bg-white shadow-md rounded-lg border">
                        <h2 className="text-xl font-semibold">{user.username}</h2>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-sm text-gray-500">
                            {user.role === 'teacher' ? 'Docent' : user.role === 'user' ? 'Student' : ''}
                        </p>
                        <p className="text-xs text-gray-400">{new Date(user.created_at).toLocaleDateString('nl-NL')}</p>
                        <div className="absolute top-2 right-2 space-x-2">
                            <button
                                onClick={() => openModal("edit", user)}
                                className="text-yellow-400"
                                aria-label={`Bewerk ${user.username}`}
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => handleDelete(user._id)}
                                className="text-red-400"
                                aria-label={`Verwijder ${user.username}`}
                            >
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
                                    {modalMode === "create" ? "Voeg Gebruiker Toe" : "Bewerk Student"}
                                </h2>
                                <form onSubmit={handleCreateOrUpdate}>
                                    <div className="mb-4">
                                        <label htmlFor="username" className="block text-sm font-medium">
                                            Gebruikersnaam
                                        </label>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            defaultValue={currentStudent ? currentStudent.username : ""}
                                            className="w-full p-2 border rounded-lg mt-1"
                                            required
                                            aria-label="Gebruikersnaam"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-sm font-medium">
                                            E-mail
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            defaultValue={currentStudent ? currentStudent.email : ""}
                                            className="w-full p-2 border rounded-lg mt-1"
                                            required
                                            aria-label="E-mail"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="role" className="block text-sm font-medium">
                                            Rol
                                        </label>
                                        <select
                                            id="role"
                                            name="role"
                                            defaultValue={currentStudent ? currentStudent.role : "user"}
                                            className="w-full p-2 border rounded-lg mt-1"
                                            required
                                            aria-label="Rol"
                                        >
                                            <option value="user">Student</option>
                                            <option value="teacher">Docent</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="bg-gray-300 text-white py-2 px-4 rounded-lg"
                                            aria-label="Annuleer"
                                        >
                                            Annuleer
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                                            aria-label="Sla op"
                                        >
                                            {modalMode === "create" ? "Voeg Toe" : "Update"}
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
