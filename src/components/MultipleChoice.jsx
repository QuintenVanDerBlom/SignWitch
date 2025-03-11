


function MultipleChoice() {
    const quizData = [
        {
            id: 1,
            question: "Welke gebaar wordt hier getoond?",
            options: [{
                id: "1",
                answer: "Hallo"
            },
                {
                    id: "2",
                    answer: "Morgen"
                },
                {
                    id: "3",
                    answer: "Waarom"
                },
                {
                    id: "4",
                    answer: "Iets"
                }
            ],
            correctAnswer: "Waarom",
        },

    ]

    return (
        <div className="min-h-screen flex flex-col items-center p-4">
            <p className="text-lg text-gray-800 text-center mb-6">
                Kijk eerst naar de video.
            </p>

            <div className="w-full max-w-2xl p-6 rounded-lg shadow-md flex flex-row ">
                {/*Video placeholder*/}
                <div className="w-2/3 flex mb-4 justify-center items-center">
                    <div className="w-64 h-40 bg-gray-600 flex justify-center items-center rounded-md">
                        <span className="text-white text-2xl">▶️</span>

                    </div>
                </div>

                <form action="" >
                    <div className="flex flex-col">
                        {quizData.length > 0 && quizData[0].options.map((option, i) => (
                            <label htmlFor="" key={i} className="flex items-center space-x-3  p-2 rounded-md hover:bg-gray-100">
                                <input type="radio"
                                       value={option.id}
                                       className="w-5 h-5 text-red-500 focus:ring-red-500"
                                       name="quiz"
                                />
                                <span className="text-lg text-gray-900">{option.answer}</span>
                            </label>
                        ))}
                    </div>


                    <div className="max-w-max">

                        <button type="submit" className="bg-green-400 px-6 py-2 rounded-md text-black hover:bg-green-700 hover:text-white">
                            Controleren
                        </button>

                    </div>

                </form>

            </div>

        </div>

    )

}

export default MultipleChoice;