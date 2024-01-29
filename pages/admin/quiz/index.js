import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layouts";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { TailSpin } from "react-loader-spinner";

const Admin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });
  const [quizzes, setQuizzes] = useState([]);
  
  const handleToggle = async (id, enabled) => {
    try {
      const status = enabled;
      setLoading(true)
      const response = await fetch('/api/createQuiz', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({quiz: {_id: id, enabled: status}})
      });
      setLoading(false)
      const result = await response.json();
      if (result) {
        setQuizzes(result);
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
      // Handle error, show message, or implement retry logic
    }
  };

  useEffect(() => {
    getCategories();
    getAllQuizes();
  }, []);

  const getCategories = async () => {
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

  const getAllQuizes = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/createQuiz', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoading(false)
      const result = await response.json();
      if (result) {
        setQuizzes(result);
      }
    } catch (error) {
      console.log("Error fetching Quizes:", error);
      // Handle error, show message, or implement retry logic
    }
  };

  // const createCategory = async () => {
  //   try {
  //     setLoading(true)
  //     const response = await fetch('/api/category', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newCategory)
  //     });
  //     const result = await response.json();
  //     setLoading(false)
  //     setCategories(result);
  //     setShowModal(false);
  //     setNewCategory({ name: '', description: '' });
  //   } catch (error) {
  //     console.log("Error creating category:", error);
  //     // Handle error, show message, or implement retry logic
  //   }
  // };

  const handleSelectedCategory = (category) => {
    // Logic for handling selected category
    console.log(`Selected category: ${category}`);
  };

  const handleAddCategory = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSaveCategory = async () => {
    try {
      const response = await fetch('/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });
  
      if (response.ok) {
        const result = await response.json();
        setCategories([...categories, result]); // Update categories state with the new category
        setShowModal(false);
        setNewCategory({ name: '', description: '' }); // Resetting the form fields
        window.location.reload(); // Reload the page after successfully saving the category
      } else {
        console.log("Failed to save category");
      }
    } catch (error) {
      console.log("Error creating category:", error);
      // Handle error, show message, or implement retry logic
    }
  };
  
  const handleUpdateQuiz = (quizId) => {
    router.push(`/admin/quiz/edit?id=${quizId}`);
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      const result = await fetch(`/api/createQuiz?id=${quizId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!result.ok) {
        throw new Error('Failed to fetch quiz data');
      }

      const data = await result.json();
      toast.success('Quiz Deleted Successfully!');
      setQuizzes(data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleDeleteCategory = async (id) => {
    try {
      const result = await fetch(`/api/category?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!result.ok) {
        throw new Error('Failed to fetch quiz data');
      }

      const data = await result.json();
      if (data.categories) {
        toast.success('Category Deleted Successfully!');
        setCategories(data.categories);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleAddQuiz = () => {
    router.push(`/admin/quiz/create`);
  }
  return (
    <Layout>
      <div className="loader-container">
        {loading && (
          <TailSpin type="TailSpin" color="#00BFFF" className="h-[80px] w-[80px]" />
        )}
      </div>
      <div className="bg-gray-100 p-6 lg:p-10">
        <div className="w-[90%] mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">All Categories</h1>
        </div>
        <div className="w-[90%] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.isArray(categories) && categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-300 rounded-md overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
                  onClick={() => handleSelectedCategory(category)}
                >
                  <div className="p-4 relative">
                    <div className="absolute top-2 right-2 flex space-x-2 ">
                      <div className="cursor-pointer" onClick={() => handleDeleteCategory(category._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                      <p className="text-gray-600 text-sm">{category.description}</p>
                    </div>
                  </div>
                </div>
              ))
            }
            <div
              className="bg-white border border-dashed border-gray-300 rounded-md overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer flex items-center justify-center"
              onClick={handleAddCategory}
            >
              <button className="text-blue-600 font-semibold py-2 px-4 focus:outline-none">
                + Add Category
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 lg:p-10 pt-0 lg:pt-0">
        <div className="w-[90%] mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">Quizes</h1>
          {Array.isArray(categories) && categories.map((category, index) => {
            const filteredQuizzes = quizzes?.filter((quiz) => quiz.category === category.name); // Accessing specific property, for example, 'name'
            return (
              <div key={index}>
                <div className="text-3xl lg:text-2xl font-bold my-6">{category.name}</div>
                {filteredQuizzes?.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredQuizzes.map((filteredQuiz, quizIndex) => (
                      <div
                        key={quizIndex}
                        className="bg-white border border-gray-300 rounded-md overflow-hidden shadow-md hover:shadow-lg transition duration-300"
                        // onClick={() => handleUpdateQuiz(filteredQuiz._id)}
                      >
                        <div className="pt-6 p-4 relative">
                          <div className="text-lg font-semibold mb-2">{filteredQuiz.title}<span className="text-sm">({filteredQuiz.type})</span></div>
                          <div className="text-gray-600 text-sm">{filteredQuiz.description}</div>
                          <div className="flex justify-center">
                            {/* <button onClick={() => handleSelectedQuiz(quiz._id)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2 focus:outline-none focus:ring focus:ring-blue-400">
                              Attempt
                            </button> */}
                          </div>
                          <div className="absolute top-2 right-2 flex space-x-2 ">
                            <div className="cursor-pointer" onClick={() => handleUpdateQuiz(filteredQuiz._id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                              </svg>
                            </div>
                            <div className="cursor-pointer" onClick={() => handleDeleteQuiz(filteredQuiz._id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                            </div>
                            <div className="flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  id={"quizToggle_" + filteredQuiz._id}
                                  className="hidden"
                                  checked={filteredQuiz.enabled}
                                  onChange={(e) => handleToggle(filteredQuiz._id, e.target.checked)}
                                />
                                <label
                                  htmlFor={"quizToggle_" + filteredQuiz._id}
                                  className="cursor-pointer"
                                >
                                  <div
                                    className={`toggle__line w-10 h-4 rounded-full shadow-inner ${
                                      filteredQuiz.enabled ? 'bg-green-500' : 'bg-gray-400'
                                    }`}
                                  ></div>
                                  <div
                                    className={`toggle__dot absolute w-6 h-6 rounded-full shadow inset-y-0 left-0 -top-1 bg-white ${
                                      filteredQuiz.enabled ? 'transform translate-x-full' : ''
                                    }`}
                                  ></div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center">No quizzes found for this category.</p>
                )}
              </div>
            );
          })}
          <div
            className="bg-white border border-dashed border-gray-300 rounded-md overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer flex items-center justify-center w-fit mt-10 p-4"
            onClick={handleAddQuiz}
          >
            <button className="text-blue-600 font-semibold py-2 px-4 focus:outline-none">
              + Add New Quiz
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-80">
            <h2 className="text-lg font-semibold mb-4">Add Category</h2>
            <input
              type="text"
              placeholder="Category Name"
              className="border border-gray-300 rounded-md p-2 mb-4 w-full"
              name="name"
              value={newCategory.name}
              onChange={handleInputChange}
            />
            <textarea
              placeholder="Category Description"
              className="border border-gray-300 rounded-md p-2 mb-4 w-full h-24 resize-none"
              name="description"
              value={newCategory.description}
              onChange={handleInputChange}
            ></textarea>
            <div className="flex justify-end">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md mr-2" onClick={handleSaveCategory}>
                Save
              </button>
              <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Admin;
