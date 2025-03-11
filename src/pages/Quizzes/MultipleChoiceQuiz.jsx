


function MultipleChoiceQuiz() {
//     const quizData = [
//         {
//             id: 1,
//             question: "Welke gebaar wordt hier getoond?",
//             options: [{
//                 id: "1",
//                 answer: "Hallo"
//                 },
//                 {
//                    id: "2",
//                    answer: "Morgen"
//                 },
//                 {
//                     id: "3",
//                     answer: "Waarom"
//                 },
//                 {
//                     id: "4",
//                     answer: "Iets"
//                 }
//                 ],
//             correctAnswer: "Waarom",
//         },
//         {
//             id: 2,
//             question: "Wat is de volgorde van de getoonde gebaren?",
//             options: [
//                 {
//                     id: "1",
//                     answer: "Ja, Nee, Iets"
//                 },
//                 {
//                     id: "2",
//                     answer: "Hoe, Wat, Waar"
//                 },
//                 {
//                     id: "3",
//                     answer: "Moet, Waarom, Nee"
//                 },
//                 {
//                     id: "4",
//                     answer: "Veel, Weinig, Enorm"
//                 }
//             ],
//             correctAnswer: "Veel, Weinig, Enorm",
//         },
//
//     ]
//
//     return (
//         <div className="min-h-screen flex flex-col items-center p-4">
//             <h1 className="font-k2d font-bold text-black text-2xl mb-4 text-center">
//                 Les 1 - Vraagwoorden - Opdracht 1
//             </h1>
//             <p className="text-lg text-gray-800 text-center mb-6">
//                 Kijk eerst naar de video.
//             </p>
//
//             <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md flex flex-row ">
//                 {/*Video placeholder*/}
//                 <div className="w-2/3 flex mb-4 justify-center items-center">
//                     <div className="w-64 h-40 bg-gray-600 flex justify-center items-center rounded-md">
//                         <span className="text-white text-2xl">▶️</span>
//
//                     </div>
//                 </div>
//
//                 <form action="" >
//                     <div className="flex flex-col">
//                         {quizData.length > 0 && quizData[0].options.map((option, i) => (
//                             <label htmlFor="" key={i} className="flex items-center space-x-3  p-2 rounded-md hover:bg-gray-100">
//                                 <input type="radio"
//                                        value={option.id}
//                                        className="w-5 h-5 text-red-500 focus:ring-red-500"
//                                        name="quiz"
//                                 />
//                                 <span className="text-lg text-gray-900">{option.answer}</span>
//                             </label>
//                         ))}
//                     </div>
//
//
//                     <div className="max-w-max">
//
//                         <button type="submit" className="bg-green-400 px-6 py-2 rounded-md text-black hover:bg-green-700 hover:text-white">
//                             Controleren
//                         </button>
//
//                     </div>
//
//                 </form>
//
//             </div>
//
//         </div>
//
//     )
//
// }

export default MultipleChoiceQuiz;

// "Ja, Nee, Iets", "Hoe, Wat, Waar", "Moet, Waarom, Nee", "Veel, Weinig, Enorm"

// <article className= "text-black">
//     <h1 className = "font-k2d font-bold text-black justify-center flex text-2xl">
//         {quizData.length > 0 ? quizData[0].question : ""}
//     </h1>
//
//     <div className="flex flex-row container content-center items-center justify-center">
//         <img src="" alt=""/>
//         <div className="px-4 py-4 mx-auto">
//             <form action="" className="flex flex-col items-start justify-between content-evenly container font-openSans">
//
//                 {quizData.length > 0 && quizData[0].options.map((option, i) => (
//                     <div key={i}>
//                         <input type="radio"
//                                value={option.id}
//                                className="p-4 mx-auto justify-between"
//                         />
//                         <label htmlFor="">{option.answer}</label>
//                     </div>
//                 ))}
//
//                 <button
//                     type="submit"
//                     className="px-4 py-2 my-2 bg-green-500 mx-1 text-black rounded hover:bg-green-700 hover:text-white"
//                 >
//                     Controleren
//                 </button>
//
//             </form>
//         </div>
//     </div>
//
// </article>