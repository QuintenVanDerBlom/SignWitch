import {useState} from "react";

function ApiKey() {

    const [apiKey, setApiKey] = useState('')
    const [formData, setFormData] = useState('')
    async function handleSubmit() {
        try {
            const response = await fetch('http://145.24.223.94:8000/keygen', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();
            console.log(data);
            setApiKey(data)
        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
        }
    }

    return(
        <>
            <h1 className="text-black font-bold text-lg">Api Key Generator</h1>
            <p className="text-black my-4">
                Generate de Api Key met de onderstaande knop. Zodra je op de knop klikt wordt de key aangemaakt
                en gewhitelist. Plaats deze key in de headers van elk (fetch) request als 'apiKey': '{apiKey.key}'
            </p>
            <button onClick={handleSubmit} className="text-black bg-red-500 px-6 py-2 rounded-lg font-bold hover:bg-red-400">Generate API Key</button>
            <p className="text-black font-bold my-2">API Key: {apiKey.key}</p>
        </>
    )
}

export default ApiKey;