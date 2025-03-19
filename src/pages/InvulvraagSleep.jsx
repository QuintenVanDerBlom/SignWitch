import React, { useState, useEffect } from 'react';

function App() {
    const [answer, setAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [videoPlayed, setVideoPlayed] = useState(false);

    const handleAnswerChange = (event) => {
        setAnswer(event.target.value);
    };

    const handleCheckAnswer = () => {
        if (answer.toLowerCase() === 'juiste antwoord') {
            setIsCorrect(true);
            setFeedback('Goed gedaan!');
        } else {
            setIsCorrect(false);
            setFeedback('Helaas, probeer het nog eens.');
        }
    };

    const handleVideoPlay = () => {
        setVideoPlayed(true);
    };

    useEffect(() => {
        if (isCorrect !== null) {
            const timeout = setTimeout(() => {
                setIsCorrect(null);
                setFeedback('');
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [isCorrect]);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Quiz App</h1>

            <section className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Vraag: Wat is het juiste antwoord?</h2>
                <input
                    type="text"
                    value={answer}
                    onChange={handleAnswerChange}
                    aria-label="Vul het juiste antwoord in"
                    className="border border-gray-300 p-2 rounded-md w-full"
                    aria-required="true"
                    placeholder="Voer je antwoord in"
                />
                <button
                    onClick={handleCheckAnswer}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Controleer het antwoord"
                >
                    Controleer het antwoord
                </button>
                {feedback && (
                    <div
                        role="alert"
                        aria-live="assertive"
                        className={`mt-4 text-center ${isCorrect ? 'text-green-500' : 'text-red-500'}`}
                    >
                        {feedback}
                    </div>
                )}
            </section>

            <section className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Bekijk de Video</h2>
                <video
                    controls
                    aria-label="Educatieve video over quiz onderwerp"
                    onPlay={handleVideoPlay}
                    className="w-full h-auto"
                    tabIndex="0"
                >
                    <source src="video.mp4" type="video/mp4" />
                    Je browser ondersteunt deze video niet.
                </video>
                {videoPlayed && (
                    <div
                        role="alert"
                        aria-live="polite"
                        className="mt-4 text-center text-blue-500"
                    >
                        De video is gestart!
                    </div>
                )}
            </section>
        </div>
    );
}

export default App;
