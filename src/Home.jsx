function Home() {
    return (
        <div className="flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-4xl font-k2d">
                Hallo {/*{users.name}*/} Abigail
            </h2>
            <p className="pb-4 mt-4 text-lg max-w-md font-openSans text-black">
                Welkom op SignWitch. Hier kan je extra oefeningen doen rondom gebarentaal.
                Hier zie je een overzicht van je lessen, maar je kan ook het woordenboek bekijken en
                overzicht van de lessen in de navigatiebalk.
            </p>

            <div className="">
                <div className=" inset-0 flex flex-col items-center justify-center">
                    <div className="w-60 h-60 rounded-full border border-black flex items-center justify-center relative">
                        <div className="w-48 h-48 rounded-full border border-black"></div>
                        <div className="absolute text-6xl text-black font-k2d">0%</div>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-2xl p-4 font-k2d text-black">Les 1</h2>
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
                <div
                    className="absolute"
                    style={{
                        left: "calc(50% + 200px)",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                >
                    <div className="flex flex-col items-center">
                        <div className="w-48 h-48 rounded-full border border-black flex items-center justify-center relative">
                            <div className="w-36 h-36 rounded-full border border-black"></div>
                            <div className="absolute text-4xl text-black font-k2d">0%</div>
                        </div>
                        <div className="mt-4 text-center">
                            <h2 className="text-2xl font-k2d text-black">Les 2</h2>
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

                <div
                    className="absolute"
                    style={{
                        left: "calc(53% + 100px)",
                        top: "46%",
                        transform: "translateY(-50%)",
                    }}
                >
                    <div className="text-4xl text-black">→</div>
                </div>
            </div>
        </div>
    );
}

export default Home;
