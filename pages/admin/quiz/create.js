import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layouts';
import { useRouter } from 'next/router';
import { TailSpin } from "react-loader-spinner";

const CreateQuiz = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    quizType: '',
    category: '', // Newly added category field
    questions: [
      {
        text: '',
        answers: [{ text: '', isCorrect: false }],
      },
    ],
    paymentAmount: 0,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/category', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setLoading(false)
        const result = await response.json();
        if (result.categories) {
          setCategories(result.categories);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
        // Handle error, show message, or implement retry logic
      }
    };
    fetchCategories();
  }, []);
  useEffect (() => {
    if (quizData.quizType === 'mock') {
      setQuizData({...quizData, paymentAmount: 0})
    }
  }, [quizData.quizType])
  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    try {
      // Include the selected category in the quizData sent to the API endpoint
      const dataToSend = { ...quizData, category: quizData.category };
      setLoading(true)
      const response = await fetch('/api/createQuiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      setLoading(false)
      if (response.ok) {
        const createdQuiz = await response.json();
        console.log('Quiz created:', createdQuiz);

        router.push(`/admin/quiz`);
      } else {
        console.error('Failed to create quiz');
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };


  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          text: '',
          answers: [{ text: '', isCorrect: false }],
        },
      ],
    });
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index][name] = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleAnswerChange = (questionIndex, answerIndex, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].answers[answerIndex][name] = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const addAnswer = (questionIndex) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].answers.push({ text: '', isCorrect: false });
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleCorrectAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].answers[answerIndex].isCorrect = !updatedQuestions[questionIndex].answers[answerIndex].isCorrect;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  return (
    <Layout>
      <div className="loader-container">
        {isLoading && (
          <TailSpin type="TailSpin" color="#00BFFF" className="h-[80px] w-[80px]" />
        )}
      </div>
      <form className="p-4 bg-gray-100" onSubmit={handleCreateQuiz}>
        <h2 className="text-3xl font-bold mb-4 flex justify-center">Create Quiz</h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Quiz Title</label>
          <input
            type="text"
            value={quizData.title}
            onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
            className="block w-full rounded-md p-2 mb-2 border border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            required
            value={quizData.description}
            onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
            className="block w-full rounded-md p-2 mb-2 border border-gray-300"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Select Category</label>
          <select
            value={quizData.category}
            onChange={(e) => setQuizData({ ...quizData, category: e.target.value })}
            className="block w-full rounded-md p-2 border border-gray-300"
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Quiz Type</label>
          <div>
            <input
              type="radio"
              id="live"
              name="quizType"
              value="live"
              checked={quizData.quizType === "live"}
              onChange={(e) => setQuizData({ ...quizData, quizType: e.target.value })}
              className="mr-2"
            />
            <label htmlFor="live" className="mr-4">Live</label>
            <input
              type="radio"
              id="mock"
              name="quizType"
              value="mock"
              checked={quizData.quizType === "mock"}
              onChange={(e) => setQuizData({ ...quizData, quizType: e.target.value })}
              className="mr-2"
            />
            <label htmlFor="mock">Mock</label>
          </div>
        </div>
        {quizData.quizType === "live" &&
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Payment Amount (Live Quiz)</label>
            <input
              type="number"
              value={quizData.paymentAmount}
              onChange={(e) => setQuizData({ ...quizData, paymentAmount: parseInt(e.target.value, 10) || null })}
              className="block w-full rounded-md p-2 mb-2 border border-gray-300"
            />
          </div>
        }
        {quizData.questions.map((question, index) => (
          <div key={index} className="bg-gray-100 rounded-md p-4 mb-4">
            <input
              required
              type="text"
              placeholder={`Question ${index + 1}`}
              value={question.text}
              name="text"
              onChange={(e) => handleQuestionChange(index, e)}
              className="block w-full rounded-md p-2 mb-2 border border-gray-300"
            />
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex} className="flex items-center">
                <input
                  required
                  type="text"
                  placeholder={`Answer ${answerIndex + 1}`}
                  value={answer.text}
                  name="text"
                  onChange={(e) => handleAnswerChange(index, answerIndex, e)}
                  className="block w-full rounded-md p-2 mb-2 ml-4 border border-gray-300"
                />
                <input
                  type="checkbox"
                  checked={answer.isCorrect}
                  onChange={() => handleCorrectAnswer(index, answerIndex)}
                  className="ml-2"
                />
                <label className="ml-1">Correct Answer</label>
              </div>
            ))}
            <button
              onClick={() => addAnswer(index)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-400 ml-4"
            >
              Add Answer
            </button>
          </div>
        ))}
        <button
          onClick={addQuestion}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-400"
        >
          Add Question
        </button>
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-purple-400 ml-4"
        >
          Create Quiz
        </button>
      </form>
    </Layout>
  );
};

export default CreateQuiz;
