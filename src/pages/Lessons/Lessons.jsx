import { useState, useEffect } from "react";
import {useOutletContext, useSearchParams} from "react-router-dom";

function Lessons() {
    const loginData = useOutletContext();

    return (
        <div>
            <h1>Lessons</h1>
            {loginData ? <p>Token: {loginData.token}</p> : <p>Loading...</p>}
        </div>
    );
}

export default Lessons;
