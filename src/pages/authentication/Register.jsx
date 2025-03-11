import React, { useState } from "react";
import {Link} from "react-router";

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        studentNumber: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = "Vul je volledige naam in";
        if (!formData.studentNumber.trim()) newErrors.studentNumber = "Vul je studenten nummer in";
        if (!formData.email.trim()) newErrors.email = "Vul een geldig e-mailadres in";
        if (!formData.password.trim()) newErrors.password = "Voer een wachtwoord in";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            alert("Registratie succesvol!"); // Hier kun je de aanmeldlogica toevoegen
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-purple-200">
            <div className="bg-[#6653A3] p-10 rounded-xl shadow-lg flex gap-6 mt-10">
                <div className="flex flex-col items-center justify-center flex-grow">
                    <img src="../../../public/hello.png" alt="Hello" className="w-60 h-80" />
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="bg-purple-500 p-6 rounded-lg w-80 flex flex-col gap-4"
                >
                    <h2 className="text-xl font-semibold text-white">Registreren</h2>

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Volledige naam"
                        className="p-2 rounded border border-gray-300 bg-white text-black"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    {errors.fullName && <p className="text-black text-sm">{errors.fullName}</p>}

                    <input
                        type="text"
                        name="studentNumber"
                        placeholder="Studenten nummer"
                        className="p-2 rounded border border-gray-150 bg-white text-black"
                        value={formData.studentNumber}
                        onChange={handleChange}
                    />
                    {errors.studentNumber && <p className="text-black text-sm">{errors.studentNumber}</p>}

                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail adres"
                        className="p-2 rounded border border-gray-150 bg-white text-black"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-black text-sm">{errors.email}</p>}

                    <input
                        type="password"
                        name="password"
                        placeholder="Wachtwoord"
                        className="p-2 rounded border border-gray-200 bg-white text-black"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="text-black text-sm">{errors.password}</p>}

                    <button className="bg-login-container text-white p-2 rounded mt-2 hover:bg-[#87669F]">
                        <Link to="/" className="block w-full h-full text-white text-center">Aanmelden</Link>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
