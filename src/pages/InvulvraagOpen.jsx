import { useState } from "react";

const Invulvraagopen = () => {
    const exercise = {
        videoUrl: "https://www.youtube.com/watch?v=fsdi9SJc42s&list=PLP8IosJB9PlVHJHTW7D0x7s0wtBsnIss2&index=2",
        question: "De (1)____ schijnt en de lucht is helemaal (2)____. ",
        correctAnswer: ["zon", "blauw"],
    };

    const [answers, setAnswers] = useState(Array(exercise.correctAnswer.length).fill(""));

    const handleChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    // Functie om de YouTube video URL om te zetten naar de embed URL met aangepaste parameters
    const getEmbedUrl = (url) => {
        const videoId = url.split("v=")[1].split("&")[0];
        return `https://www.youtube.com/watch?v=fsdi9SJc42s&list=PLP8IosJB9PlVHJHTW7D0x7s0wtBsnIss2&index=2`;
    };

    // Dynamisch aantal invulvelden creëren
    const renderInputs = () => {
        return exercise.correctAnswer.map((_, index) => (
            <div key={index} className="mb-6 text-center">
                <input
                    type="text"
                    value={answers[index] || ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="border-b-4 border-button-bg mx-1 w-72 text-center text-lg p-4 bg-gray-100 rounded-lg shadow"
                    placeholder={` (${index + 1})`}
                />
            </div>
        ));
    };

    return (
        <div className="flex flex-col justify-center items-center p-8 w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-8 text-center">Vul de juiste woorden in</h2>
            <div className="flex gap-12 items-start w-full">
                {/* YouTube Video zonder interface */}
                <div className="w-full md:w-1/2 h-[35vh]">
                    <iframe
                        width="100%"
                        height="100%"
                        src={getEmbedUrl(exercise.videoUrl)}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg shadow-lg"
                    ></iframe>
                </div>

                {/* Vragen sectie naast de video */}
                <div className="w-full md:w-3/5">
                    <p className="text-xl mb-6 text-center">{exercise.question}</p>
                    <div className="mb-6 text-center">
                    </div>
                    {/* Dynamisch de invoervelden renderen */}
                    <div className="flex flex-col gap-6 items-center">
                        {renderInputs()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invulvraagopen;
