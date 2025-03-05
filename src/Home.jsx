import { useState } from "react";

function Home() {
    const [swapped, setSwapped] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center px-4 text-center">
            {/* Header & Intro */}
            <h2 className="text-4xl font-k2d">Hallo {/*{users.name}*/} Abigail</h2>
            <p className="pb-4 mt-4 text-lg max-w-md font-openSans">
                Welkom op SignWitch. Hier kan je extra oefeningen doen rondom gebarentaal.
                Hier zie je een overzicht van je lessen, maar je kan ook het woordenboek bekijken en
                overzicht van de lessen in de navigatiebalk.
            </p>

            {/* Container holding the two lesson circles and arrow */}
            <div className="flex gap-12">
                {/* Lesson 1 Container */}
                <div
                    className="absolute"
                    style={{
                        left: swapped ? "calc(50% - 250px)" : "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <div className="flex flex-col items-center">
                        <div
                            className={`rounded-full border border-black flex items-center justify-center relative ${
                                swapped ? "w-48 h-48" : "w-60 h-60"
                            }`}
                        >
                            {swapped ? (
                                <>
                                    <div className="w-36 h-36 rounded-full border border-black"></div>
                                    <div className="absolute text-4xl text-black font-k2d">0%</div>
                                </>
                            ) : (
                                <>
                                    <div className="w-48 h-48 rounded-full border border-black"></div>
                                    <div className="absolute text-6xl text-black font-k2d">0%</div>
                                </>
                            )}
                        </div>
                        <div className="mt-4">
                            <h2 className={`text-2xl font-k2d ${swapped ? "p-2" : "p-4"}`}>
                                Les 1
                            </h2>
                            {/*
              <Link
                to="/lessen/les1"
                className="inline-block bg-purple-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 hover:text-white transition-colors"
              >
                Beginnen
              </Link>
              */}
                        </div>
                    </div>
                </div>

                {/* Lesson 2 Container (clickable to swap) */}
                <div
                    className="absolute cursor-pointer"
                    onClick={() => setSwapped((prev) => !prev)}
                    style={{
                        left: swapped ? "50%" : "calc(50% + 250px)",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <div className="flex flex-col items-center">
                        <div
                            className={`rounded-full border border-black flex items-center justify-center relative ${
                                swapped ? "w-60 h-60" : "w-48 h-48"
                            }`}
                        >
                            {swapped ? (
                                <>
                                    <div className="w-48 h-48 rounded-full border border-black"></div>
                                    <div className="absolute text-6xl text-black font-k2d">0%</div>
                                </>
                            ) : (
                                <>
                                    <div className="w-36 h-36 rounded-full border border-black"></div>
                                    <div className="absolute text-4xl text-black font-k2d">0%</div>
                                </>
                            )}
                        </div>
                        <div className="mt-4 text-center">
                            <h2 className="text-2xl font-k2d">Les 2</h2>
                            {/*
              <Link
                to="/lessen/les2"
                className="inline-block bg-purple-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-yellow-500 transition-colors"
              >
                Beginnen
              </Link>
              */}
                        </div>
                    </div>
                </div>

                {/* Arrow positioned between the circles */}
                <div
                    className="absolute"
                    style={{
                        left: swapped
                            ? "calc(50% - 140px)"
                            : "calc(50% + 140px)",
                        top: "46%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <div className="text-4xl">→</div>
                </div>
            </div>
        </div>
    );
}

export default Home;
