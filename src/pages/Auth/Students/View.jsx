import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import mockStudents from "./DummyStudents.jsx";

function Students() {
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [modalMode, setModalMode] = useState(""); // "create" or "edit"

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
        const newStudent = {
            username: formData.get("username"),
            email: formData.get("email"),
            created_date: new Date().toISOString(),
        };

        if (modalMode === "create") {
            setStudents([...students, newStudent]);
        } else if (modalMode === "edit" && currentStudent) {
            const updatedStudents = students.map((student) =>
                student.username === currentStudent.username ? newStudent : student
            );
            setStudents(updatedStudents);
        }
        closeModal();
    };

    const handleDelete = (username) => {
        setStudents(students.filter(student => student.username !== username));
    };

    const handleFileImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileExtension = file.name.split(".").pop().toLowerCase();

        if (fileExtension === "xml") {
            const reader = new FileReader();
            reader.onload = (event) => {
                const xmlContent = event.target.result;
                const parsedStudents = parseXML(xmlContent);
                insertStudentsFromFile(parsedStudents);
            };
            reader.readAsText(file);
        } else if (fileExtension === "csv") {
            const reader = new FileReader();
            reader.onload = (event) => {
                const csvContent = event.target.result;
                const parsedStudents = parseCSV(csvContent);
                insertStudentsFromFile(parsedStudents);
            };
            reader.readAsText(file);
        } else {
            alert("Alleen XML of CSV bestanden toegestaan!");
        }
    };

    // XML Parsing
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

    // CSV Parsing
    const parseCSV = (csvContent) => {
        const lines = csvContent.split("\n");
        const header = lines[0].split(",");
        const studentsArray = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(",");
            if (values.length === header.length) {
                const student = {};
                header.forEach((field, index) => {
                    student[field.trim()] = values[index]?.trim();
                });
                studentsArray.push({
                    username: student["username"],
                    email: student["email"],
                    created_date: new Date().toISOString(),
                });
            }
        }

        return studentsArray;
    };

    const insertStudentsFromFile = (newStudents) => {
        setStudents((prevStudents) => [...prevStudents, ...newStudents]);
    };

    return (
        <div className="flex flex-col p-12 min-h-screen mx-auto max-w-8xl">
            {/* Main Content */}
            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-semibold">Studenten</h1>
                <div className="flex space-x-4">
                    <label className="bg-green-600 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-green-700 transition">
                        Importeer Bestand
                        <input
                            type="file"
                            accept=".xml, .csv"
                            onChange={handleFileImport}
                            className="hidden"
                        />
                    </label>
                    <button
                        onClick={() => openModal("create")}
                        className="bg-button-bg text-white py-2 px-4 rounded-lg hover:bg-button-bg-hover transition"
                    >
                        Voeg Student Toe
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

            {/* Modal voor Create/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-semibold mb-4">{modalMode === "create" ? "Voeg Student Toe" : "Bewerk Student"}</h2>
                        <form onSubmit={handleCreateOrUpdate}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-medium">Username</label>
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
                                <label htmlFor="email" className="block text-sm font-medium">Email</label>
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
                    </div>
                </div>
            )}
        </div>
    );
}

export default Students;
