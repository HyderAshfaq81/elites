// import React, {useState} from "react";
// import { useRouter } from 'next/router';
// import Layout from "../../components/Layouts";

// const Quiz = () => {
//   const router = useRouter();
//   const handleSubmit = (status) => {
//     if (status === 'attempt') {
//       router.push(`/quiz/all_quizes`);
//     } else if (status === 'create') {
//       router.push(`/quiz/create_quiz`);
//     }
//   };
//   return (
//     <Layout>
//       <div className="bg-gray-100 p-10">
//         <div className="w-[70%] m-auto">
//           <div className="text-[32px] text-center font-bold my-10">Select one the following</div>
//           <div className="flex gap-[30px] m-10">
//             <div className="flex flex-col w-[50%] p-20 rounded-[8px] border-gray-2 border-[2px] cursor-pointer" style={{ backgroundColor: 'rgba(94, 42, 231, 0.5)' }} onClick={() => handleSubmit("create")}>
//               <div className="items-center justify-center flex flex-col text-center">
//                 <div className="text-[28px] font-medium m-2">Create Quiz</div>
//                 <div className="text-[16px] m-2">Create Mock and Marked Quizes! Also you can add more quiestion to the already available quizes!</div>
//               </div>
//             </div>
//             <div className="flex flex-col w-[50%] p-20 rounded-[8px] border-gray-2 border-[2px] cursor-pointer" style={{ backgroundColor: 'rgba(94, 42, 231, 0.5)' }} onClick={() => handleSubmit("attempt")}>
//               <div className="items-center justify-center flex flex-col text-center">
//                 <div className="text-[28px] font-medium m-2">Attempt Quizes</div>
//                 <div className="text-[16px] m-2">Create Mock and Marked Quizes! Also you can add more quiestion to the already available quizes!</div>
//               </div>
//             </div>
//           </div>  
//         </div>
//       </div>
//     </Layout>
//   )
// }
// export default Quiz;







//Testing Will remove at the end
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Layout from "../../components/Layouts";

const ShowAllQuizes = () => {
  const router = useRouter();
  const [allQuizes, setAllQuizes] = useState([]);
  const [quizType, setQuizType] = useState("all");

  useEffect(() => {
    const fetchQuizes = async () => {
      try {
        const quizes = await fetch('/api/createQuiz', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await quizes.json();
        setAllQuizes(result);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchQuizes();
  }, []);

  const handleSelectedQuiz = (quizId) => {
    router.push(`/quiz/attempt?id=${quizId}`);
  };

  const filteredQuizes = allQuizes.filter((quiz) => {
    if (quizType === "all") {
      return true; // Show all quizzes
    } else {
      return quiz.type === quizType; // Show quizzes based on the selected type (live or mock)
    }
  });

  const handleUpdateQuiz = (quizId) => {
    // Placeholder for handling update action
    console.log(`Update quiz with ID: ${quizId}`);
  };

  const handleDeleteQuiz = (quizId) => {
    // Placeholder for handling delete action
    console.log(`Delete quiz with ID: ${quizId}`);
  };

  return (
    <Layout>
      <div className="bg-gray-100 p-10">
        <div className="w-[70%] font-bold m-auto flex justify-center text-[22px]">
          <div className={`hover:underline cursor-pointer ${quizType === "all" ? "text-blue-500" : ""}`} onClick={() => setQuizType("all")}>All Quizes</div>
        </div>
        <div className="w-[70%] m-auto p-[20px]">
          <div className="flex">
            <div className="w-[70%] font-bold flex justify-center p-10 text-[22px]">
              <div className={`hover:underline cursor-pointer ${quizType === "live" ? "text-blue-500" : ""}`} onClick={() => setQuizType("live")}>Live Quizes</div>
            </div>
            <div className="w-[70%] font-bold flex justify-center p-10 text-[22px]">
              <div className={`hover:underline cursor-pointer ${quizType === "mock" ? "text-blue-500" : ""}`} onClick={() => setQuizType("mock")}>Mock Quizes</div>
            </div>
          </div>
          {filteredQuizes.length === 0 ? (
            <div className="text-center text-gray-500 mt-4">No quizzes found for the selected filter.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredQuizes.map((quiz, index) => (
                <div key={index} className="relative border rounded-lg p-4 bg-white shadow-md">
                  <div className="font-semibold text-lg mb-2">{quiz.title}</div>
                  <div className="text-sm mb-4">{quiz.description}</div>
                  <div className="text-sm mb-4">${quiz.paymentAmount}</div>
                  <div className="flex justify-center">
                    <button onClick={() => handleSelectedQuiz(quiz._id)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2 focus:outline-none focus:ring focus:ring-blue-400">
                      Attempt
                    </button>
                  </div>
                  {/* <div className="absolute top-2 right-2 flex space-x-2">
                    <div className="cursor-pointer" onClick={() => handleUpdateQuiz(quiz._id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                    </div>
                    <div className="cursor-pointer" onClick={() => handleDeleteQuiz(quiz._id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </div>
                  </div> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ShowAllQuizes;
