import { useEffect, useState } from "react";
import {useOutletContext, useSearchParams} from "react-router-dom";

function Home() {
    const loginData = useOutletContext();

    return (
        <div className="flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-4xl font-k2d">
                Hallo {loginData ? loginData.name : "gebruiker"}
            </h2>
            <p className="pb-4 mt-4 text-lg max-w-md font-openSans">
                Welkom op SignWitch. Hier kan je extra oefeningen doen rondom gebarentaal.
                Hier zie je een overzicht van je lessen, maar je kan ook het woordenboek bekijken en
                overzicht van de lessen in de navigatiebalk.
            </p>
        </div>
    );
}

export default Home;
