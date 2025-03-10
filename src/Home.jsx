function Home() {
    return (
        <>
            <div className="flex flex-col items-center justify-center px-4 text-center">
                <h2 className="pt-16 text-6xl font-k2d">
                    Hallo {/*{users.name}*/} Abigail
                </h2>
                <p className="pb-20 mt-4 text-2xl max-w-2xl font-openSans">
                    Welkom op SignWitch. Hier kan je extra oefeningen doen rondom gebarentaal.
                    Hier zie je een overzicht van je lessen, maar je kan ook het woordenboek bekijken en
                    overzicht van de lessen in de navigatiebalk.
                </p>
            </div>

            <div className="flex gap-20 flex-row items-center justify-center">
                {/* Invisible Placeholder (for centering) */}
                <div className="size-80 opacity-0"></div>
                <div className="pb-36 text-4xl opacity-0">←</div>


                <div className=" inset-0 flex flex-col items-center justify-center">
                    <div className="relative size-80">
                        <svg className="size-full -rotate-90" viewBox="0 0 36 36"
                             xmlns="http://www.w3.org/2000/svg">
                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200"
                                    strokeWidth="2"></circle>
                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-red-600"
                                    strokeWidth="2" strokeDasharray="100" strokeDashoffset={100 - 35}
                                    strokeLinecap="round"></circle>
                        </svg>

                        <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                            <span className="text-center text-4xl font-bold text-black">35%</span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-4xl p-4 font-k2d">Les 1</h2>
                    </div>
                        <div className="inline-block bg-red-600 text-white font-k2d text-xl py-2 px-24 rounded-md hover:bg-red-800 hover:text-white transition-colors"
                        >
                        Beginnen
                        </div>
                        {/*
                            <Link
                              to="/lessons/lesson1"
                              className="inline-block bg-purple-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 hover:text-white transition-colors"
                            >
                              Beginnen
                            </Link>
                            */}
                </div>

                <div className="pb-36 text-4xl">→</div>

                <div className=" inset-0 flex flex-col items-center">
                    <div className="relative size-80">
                        <svg className="size-full -rotate-90" viewBox="0 0 36 36"
                             xmlns="http://www.w3.org/2000/svg">
                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200"
                                    strokeWidth="2"></circle>
                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-red-600"
                                    strokeWidth="2" strokeDasharray="100" strokeDashoffset={100 - 75}
                                    strokeLinecap="round"></circle>
                        </svg>
                        <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                            <span className="text-center text-4xl font-bold text-black">75%</span>
                        </div>
                    </div>


                    <div className="mt-4">
                        <h2 className="text-4xl p-4 font-k2d">Les 2</h2>
                    </div>
                    <div className="inline-block bg-red-600 text-white font-k2d text-xl py-2 px-24 rounded-md hover:bg-red-800 hover:text-white transition-colors"
                    >
                        Beginnen
                    </div>
                    {/*
                            <Link
                              to="/lessons/lesson2"
                              className="inline-block bg-purple-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 hover:text-white transition-colors"
                            >
                              Beginnen
                            </Link>
                            */}
                </div>
            </div>
        </>
    )
        ;
}

export default Home;
