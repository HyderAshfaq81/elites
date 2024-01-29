import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layouts';
import { TailSpin } from "react-loader-spinner";
import { toast } from 'react-toastify';

const QuizAttempt = () => {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const fetchQuiz = async () => {
      try {
        setLoading(true)
        const result = await fetch(`/api/createQuiz?id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!result.ok) {
          setLoading(false)
          throw new Error('Failed to fetch quiz data');
        }
        setLoading(false)
        const data = await result.json();
        setQuizData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchQuiz();
    } else {
      setError('Quiz ID not found in query parameters');
      setLoading(false);
    }
  }, []);

  const handleAnswerSelection = (questionId, selectedAnswer) => {
    setAnswers({ ...answers, [questionId]: selectedAnswer });
  };

  const handleSubmit = () => {
    toast.success("Quiz Submitted!")
    setShowResults(true);
  };

  const calculateScore = () => {
    let score = 0;
    const results = quizData?.questions?.map((question) => {
      const userAnswerId = answers[question._id];
      const selectedAnswer = question.answers.find(answer => answer._id === userAnswerId);
  
      const isCorrect = selectedAnswer ? selectedAnswer.isCorrect : false;
      if (isCorrect) {
        score += 1;
      }

      const correctAnswer = question.answers.find((answer) => answer.isCorrect);
      console.log("correctAnswercorrectAnswer", correctAnswer)
      return {
        ...question,
        userAnswer: selectedAnswer ? selectedAnswer.text : 'Not answered',
        isCorrect,
        correctAnswer
      };
    });
    return { score, results };
  };
  
  const { score, results } = calculateScore();
  console.log("resultsresults", results)

  return (
    <Layout>
      <div className="loader-container">
        {loading && (
          <TailSpin type="TailSpin" color="#00BFFF" className="h-[80px] w-[80px]" />
        )}
      </div>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Quiz</h1>
          {!showResults ? (
            <div>
              {quizData.questions?.map((question) => (
                <div key={question._id} className="bg-white shadow-md rounded-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
                  <ul className="space-y-2">
                    {question.answers?.map((choice) => (
                      <li key={choice._id}>
                        <label className="flex items-center">
                          <input
                            type={'radio'}
                            name={`question${question._id}`}
                            value={choice.text}
                            checked={answers[question._id] === choice._id}
                            onChange={() => handleAnswerSelection(question._id, choice._id)}
                            className="mr-2"
                          />
                          {choice.text}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-400"
              >
                Submit
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Results:</h2>
              <p className="mb-2">Score: {score} / {quizData.questions?.length}</p>
              {results.map((result) => (
                <div key={result._id} className="bg-white shadow-md rounded-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">{result.text}</h2>
                  <p>Your Answer: {result.userAnswer}</p>
                  {result.isCorrect ? (
                    <p className="text-green-600 font-semibold">Correct Answer: {result.correctAnswer?.text}</p>
                  ) : (
                    <p className="text-red-600 font-semibold">
                      Incorrect. Correct Answer: {result.correctAnswer?.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
          {/* Rest of your component code remains the same */}
        </div>
      </div>
    </Layout>
  );
};

export default QuizAttempt;
