


function MultipleChoiceQuiz() {
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
                   answer: "Goede Morgen"
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
        {
            id: 2,
            question: "Wat is de volgorde van de getoonde gebaren?",
            options: [
                {
                    id: "1",
                    answer: "Ja, Nee, Iets"
                },
                {
                    id: "2",
                    answer: "Hoe, Wat, Waar"
                },
                {
                    id: "3",
                    answer: "Moet, Waarom, Nee"
                },
                {
                    id: "4",
                    answer: "Veel, Weinig, Enorm"
                }
            ],
            correctAnswer: "Veel, Weinig, Enorm",
        },

    ]

    return (
        <article className= "text-black">
            <h1 className = "font-k2d font-bold text-black justify-center flex text-2xl">
                {quizData.length > 0 ? quizData[0].question : ""}
            </h1>
            <form action="" className="flex-col justify-end container font-openSans">

                {quizData.length > 0 && quizData[0].options.map((option, i) => (
                    <div key={i}>
                    <input type="radio"
                           value={option.id}
                           className="px-4 mx-auto"
                    />
                        <label htmlFor="">{option.answer}</label>
                    </div>
                ))}

            </form>

            <h1 className = "font-k2d font-bold text-black justify-center flex text-2xl">
                {quizData.length > 0 ? quizData[1].question : ""}
            </h1>
            <form action="" className="flex-col felx container font-openSans">

                {quizData.length > 0 && quizData[1].options.map((option, i) => (
                    <div key={i} className="justify-center felx container font-openSans">
                        <input type="radio"
                               value={option.id}
                               className="px-4 mx-auto"
                        />
                        <label htmlFor="">{option.answer}</label>
                    </div>
                ))}

            </form>
        </article>

    )

}

export default MultipleChoiceQuiz;

// "Ja, Nee, Iets", "Hoe, Wat, Waar", "Moet, Waarom, Nee", "Veel, Weinig, Enorm"