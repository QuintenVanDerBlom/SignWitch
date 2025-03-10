function Dictionary() {
    const signs = [
        { letter: "V", description: "'V'", image: "/public/v.png" },
        { letter: "V", description: "'V'", image: "/public/v.png" },
        { letter: "V", description: "'V'", image: "/public/v.png" },
        { letter: "V", description: "'V'", image: "/public/v.png" },
        { letter: "V", description: "'V'", image: "/public/v.png" },
        { letter: "V", description: "'V'", image: "/public/v.png" },
        { letter: "V", description: "'V'", image: "/public/v.png" },
        { letter: "V", description: "'V'", image: "/public/v.png" },
        { letter: "V", description: "'V'", image: "/public/v.png" },
        { letter: "V", description: "'V'", image: "/public/v.png" },
        { letter: "V", description: "'V'", image: "/public/v.png" },
        { letter: "V", description: "'V'", image: "/public/v.png" },
        { letter: "V", description: "'V'", image: "/public/v.png" },
        { letter: "V", description: "'V'", image: "/public/v.png" },
        { letter: "V", description: "'V'", image: "/public/v.png" },
        { letter: "V", description: "'V'", image: "/public/v.png" },
    ];

    return (
        <div className="flex-1 p-6 ml-64 min-h-screen">
                {/* Sidebar */}
                <aside
                    className="fixed left-0 top-0 h-screen w-64 p-6 bg-white shadow-md border-r border-gray-300 flex flex-col overflow-y-auto">
                    {/* Search Bar */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Zoeken..."
                            className="w-full p-2 border rounded-2xl focus:ring focus:ring-blue-300"
                        />
                        <span className="absolute right-3 top-2.5 text-gray-500">🔍</span>
                    </div>

                    {/* Categories */}
                    <h2 className="text-lg font-semibold mb-1">Categorieën</h2>
                    <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-300"/>
                    <div className="space-y-2 mb-4">
                        <label className="flex items-center space-x-2 text-gray-700">
                            <input type="checkbox" className="w-4 h-4"/>
                            <span>Cijfers</span>
                        </label>
                        <label className="flex items-center space-x-2 text-gray-700">
                            <input type="checkbox" className="w-4 h-4"/>
                            <span>Letters</span>
                        </label>
                        <label className="flex items-center space-x-2 text-gray-700">
                            <input type="checkbox" className="w-4 h-4"/>
                            <span>Woorden</span>
                        </label>
                        <label className="flex items-center space-x-2 text-gray-700">
                            <input type="checkbox" className="w-4 h-4"/>
                            <span>Basis</span>
                        </label>
                    </div>

                    {/* Dropdown for Lessons */}
                    <h2 className="text-lg font-semibold mb-2">Lessen</h2>
                    <hr className="h-px mb-2 bg-gray-200 border-0 dark:bg-gray-300"/>
                    <select className="w-full p-2 border rounded-md bg-white focus:ring focus:ring-blue-300">
                        <option>Selecteer les...</option>
                        <option>Les 1</option>
                        <option>Les 2</option>
                        <option>Les 3</option>
                    </select>
                </aside>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <div className="flex justify-center mb-4">
                        <input
                            type="text"
                            placeholder="Zoeken..."
                            className="w-2/3 p-2 border rounded-2xl focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {signs.map((sign, index) => (
                            <div key={index}
                                 className="p-4 text-center bg-white shadow-md rounded-lg border border-black flex flex-col">
                                <img src={sign.image} alt={sign.letter} className="w-24 h-24 mx-auto mb-2"/>
                                <h2 className="text-xl font-semibold text-gray-800">{sign.description}</h2>
                                <button
                                    className="mt-auto bg-button-bg text-white py-2 px-4 rounded-lg hover:bg-button-bg-hover transition">Meer
                                    Informatie
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            );
            }

            export default Dictionary;
