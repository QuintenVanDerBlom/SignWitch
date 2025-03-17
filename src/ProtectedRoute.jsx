import React, { useState, useEffect } from "react";
import { Navigate, useOutletContext } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
    // Get loginData from context (ensure your Layout passes it via Outlet)
    const loginData = useOutletContext();
    const [isLoading, setIsLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // If no loginData exists, not authorized.
        if (!loginData) {
            setAuthorized(false);
            setIsLoading(false);
            return;
        }

        // Fetch the user list (if you need to check against the API)
        fetch(`http://145.24.223.94:8000/users`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                apikey: "pinda",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Find the user in the API response
                const user = data.users.find(u => u.email === loginData.email);
                // Check if the user's role is included in allowedRoles
                if (user && allowedRoles.includes(user.role)) {
                    setAuthorized(true);
                } else {
                    setAuthorized(false);
                }
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                setAuthorized(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [loginData, allowedRoles]);

    if (isLoading) {
        // Optionally, show a loading spinner or message while checking
        return <div>Loading...</div>;
    }

    if (!authorized) {
        // If not authorized, redirect to the Unauthorised page
        return <Navigate to="/unauthorised" replace />;
    }

    // If authorized, render the children components
    return children;
};

export default ProtectedRoute;
