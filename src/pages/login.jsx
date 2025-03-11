import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Login() {
    const [searchParams] = useSearchParams();

    // Extract query parameters
    const token = searchParams.get("token");
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    // State to store login data
    const [loginData, setLoginData] = useState(null);

    useEffect(() => {
        if (token && name && email) {
            setLoginData({ token, name, email });
        } else {
            // Correct way to redirect to an external URL
            window.location.href = "https://cmgt.hr.nl/chat-login/handle/tle2-1?redirect=http://localhost:5175";
        }


    }, [token, name, email]);

    return (
        <div>
            <h1>Welkom op de loginpagina</h1>
            {loginData ? (
                <div>
                    <p><strong>Naam:</strong> {loginData.name}</p>
                    <p><strong>Email:</strong> {loginData.email}</p>
                    <p><strong>Token:</strong> {loginData.token}</p>
                </div>
            ) : (
                <p>Redirecting to login...</p>
            )}
        </div>
    );
}

export default Login;
