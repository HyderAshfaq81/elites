import react, { useState, useEffect } from "react";
import Layout from "../../../components/Layouts"; 
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { TailSpin } from "react-loader-spinner";

const Edit = () => {
  const router = useRouter();
  let urlParams;
  if (typeof window !== 'undefined') {
    // Code that depends on the browser's window object
    urlParams = new URLSearchParams(window.location.search);
  }
  let id = '';
  if (urlParams) {
    id = urlParams.get('id');
  }
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleQuestionTextChange = (questionId, newText) => {
    setQuizData(prevQuizData => {
      const updatedQuestions = prevQuizData.questions.map(question => {
        if (question._id === questionId) {
          return { ...question, text: newText };
        }
        return question;
      });
      return { ...prevQuizData, questions: updatedQuestions };
    });
  };
  const handleAnswerTextChange = (questionId, answerId, newText) => {
    setQuizData(prevQuizData => {
      const updatedQuestions = prevQuizData.questions.map(question => {
        if (question._id === questionId) {
          const updatedAnswers = (question.answers || []).map(answer => {
            if (answer._id === answerId) {
              return { ...answer, text: newText };
            }
            return answer;
          });
          return { ...question, answers: updatedAnswers };
        }
        return question;
      });
      return { ...prevQuizData, questions: updatedQuestions };
    });
  };  
  useEffect(() => {
    const fetchQuizbyId = async () => {
      try {
        setLoading(true)
        const result = await fetch(`/api/createQuiz?id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setLoading(false)
        if (!result.ok) {
          throw new Error('Failed to fetch quiz data');
        }

        const data = await result.json();
        if (data) {
          setQuizData(data);
          setLoading(false);
        }
      } catch (error) {
        toast.error('error.message!');
        setError(error.message);
        setLoading(false);
      }
    };
    fetchQuizbyId()
  }, [])

  const saveUpdatedQuiz = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const questions = quizData;
      const result = await fetch(`/api/createQuiz?id=${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({questions})
      });
      if (!result.ok) {
        throw new Error('Failed to fetch quiz data');
      }
      const data = await result.json();
      toast.success('Quiz Updated Successfully!');
      router.push(`/admin/quiz`);
      setQuizData(data);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
      setLoading(false);
    }
  }
  return (
    <Layout>
      <div className="loader-container">
        {loading && (
          <TailSpin type="TailSpin" color="#00BFFF" className="h-[80px] w-[80px]" />
        )}
      </div>
      <form onSubmit={saveUpdatedQuiz} className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Quiz</h1>
          {quizData.questions?.map((question) => (
            <div key={question._id} className="bg-white shadow-md rounded-md p-6 mb-6">
              <div className="relative">
                <input
                  className="text-xl font-semibold mb-4"
                  type="text"
                  value={question.text}
                  onChange={(e) => handleQuestionTextChange(question._id, e.target.value)}
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </div>  
                </div>
              </div>
              <ul className="space-y-2">
                {question.answers?.map((choice) => (
                  <div key={choice._id}>
                    <label className="flex items-center cursor-pointer">
                      <input
                        className="text-sm"
                        type="text"
                        value={choice.text}
                        onChange={(e) => handleAnswerTextChange(question._id, choice._id, e.target.value)}
                      />
                    </label>
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md mr-2">
            Save
          </button>
        </div>
      </form>
    </Layout>
  )
}
export default Edit;
