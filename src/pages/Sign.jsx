function Sign() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background-color px-6 py-10">
            {/* Video Section */}
            <div className="w-full md:w-1/2 flex justify-center mb-8">
                <video className="w-full max-w-md rounded-lg shadow-md border border-gray-300" controls>
                    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Divider */}
            <hr className="w-full max-w-3xl h-px bg-gray-900 mb-8" />

            {/* Information Section */}
            <div className="w-full md:w-1/2 flex flex-col items-center text-center md:text-left px-4">
                <h1 className="text-4xl tracking-wide text-gray-900 mb-4">
                    "V"
                </h1>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    "Hier komen de handsignalen."
                </p>

                {/* Back Button */}
                <a href="/woordenboek" className="inline-block bg-button-bg text-white px-6 py-3 rounded-lg
                    hover:bg-button-bg-hover transition duration-300 shadow-md">
                    ← Woordenboek
                </a>
            </div>
        </div>
    );
}

export default Sign;
