import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/solid';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import backgroundImage from '../../../../assets/bgquest.jpg';
import Confetti from 'react-confetti';
import AnimatedStars from './AnimatedStars';


// Bind modal to your appElement for accessibility reasons
Modal.setAppElement('#root');

function MonthQuestions() {
  const { month, category, childId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(parseInt(category));
  const [completedCategories, setCompletedCategories] = useState([]);
  const [userResponses, setUserResponses] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const navigate = useNavigate();
  const [confetti, setConfetti] = useState(false);

  const handleNext = () => {
    handleNextCategory(
      questions,
      userResponses,
      currentCategory,
      setCurrentCategory,
      setCompletedCategories,
      completedCategories,
      childId
    );
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/months/${month}/categories/${currentCategory}/questions`
        );
        const questionsData = response.data;

        const questionsWithOptions = await Promise.all(
          questionsData.map(async (question) => {
            const optionsResponse = await axios.get(
              `http://localhost:8080/api/questions/${question.question_id}/options`
            );
            return { ...question, options: optionsResponse.data };
          })
        );

        setQuestions(questionsWithOptions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [month, currentCategory]);

  const handleNextCategory = async (
    questions,
    userResponses,
    currentCategory,
    setCurrentCategory,
    setCompletedCategories,
    completedCategories,
    childId
  ) => {
    const allQuestionsAnswered = questions.every(
      (question) => userResponses[question.question_id] !== undefined
    );

    if (!allQuestionsAnswered) {
      toast.error('Kindly select all options for each question before proceeding.');
      return;
    }

    // Check if all responses are 'yes'
    const allYes = questions.every(
      (question) => userResponses[question.question_id] === 10 // Assuming 'yes' = 10
    );

    const someYes = questions.some(
      (question) => userResponses[question.question_id] === 10
    );
    

    try {
      // Fetch category feedback
      const feedbackResponse = await axios.get(`http://localhost:8080/api/feedback/${childId}/${currentCategory}`);
      const { feedback } = feedbackResponse.data;

      if (allYes) {
        setFeedbackMessage('Great job! Your child is doing really well in this category.');
        setFeedbackType('success');
        setConfetti(true);
      } else if (someYes) {
        setFeedbackMessage('Good progress! There are areas where your child can improve. Keep up the great work!');
        setFeedbackType('info');
        setConfetti(true);
      } else {
        setFeedbackMessage('Every step counts! Continue working with your child to help them improve.');
        setFeedbackType('info');
        setConfetti(true);
      }

      setShowFeedback(true);

      // Proceed to the next category after a delay to allow the user to read the message
      setTimeout(() => {
        if (currentCategory < 5) {
          setCompletedCategories([...completedCategories, currentCategory]);
          setCurrentCategory(currentCategory + 1);
        }
        setShowFeedback(false); // Hide feedback modal after proceeding
        setConfetti(false);
      }, 4000); // Adjust delay as needed
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setFeedbackMessage('Error fetching feedback');
      setFeedbackType('error');
      setShowFeedback(true);
    }
  };

  const handlePreviousCategory = () => {
    if (currentCategory > 1) {
      setCurrentCategory(currentCategory - 1);
      setUserResponses({});
    }
  };

  const handleOptionSelect = async (questionId, optionMarks) => {
    const response = {
      child_id: childId,
      question_id: questionId,
      option_marks: optionMarks,
      month: month, // Include the selected month
    };
  
    try {
      await axios.post('http://localhost:8080/api/responses', response);
      setUserResponses((prevResponses) => ({
        ...prevResponses,
        [questionId]: optionMarks,
      }));
    } catch (error) {
      console.error('Error saving response:', error);
      setFeedbackMessage('Error saving your response. Please try again.');
      setFeedbackType('error');
      setShowFeedback(true);
    }
  };
  

  const handleSubmit = async () => {
    const allQuestionsAnswered = questions.every(
      (question) => userResponses[question.question_id] !== undefined
    );

    if (!allQuestionsAnswered) {
      setFeedbackMessage('Please answer all questions before submitting.');
      setFeedbackType('error');
      setShowFeedback(true);
      return;
    }

    try {
      await axios.post(`http://localhost:8080/api/generate-report`, {
        childId,
        month,
      });

      setFeedbackMessage('Report generated successfully!');
      setFeedbackType('success');
      setShowFeedback(true);
      setTimeout(() => {
        navigate(`/dashboard/${childId}`);
      }, 2000); // Adjust delay as needed
    } catch (error) {
      console.error('Error generating report:', error);
      setFeedbackMessage('Error generating report. Please try again later.');
      setFeedbackType('error');
      setShowFeedback(true);
    }
  };
  

  const categories = [
    'Communication',
    'Gross Motor',
    'Fine Motor',
    'Problem Solving',
    'Personal Social Interaction',
  ];

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {confetti && <Confetti />}
      <div className="bg-gray-900 bg-opacity-50 min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-grow overflow-y-auto">
          <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
            {/* Header */}
            <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600 mb-2">
                {month} Month Questionnaire
              </h1>
              <h2 className="text-2xl font-semibold text-yellow-400">
                {categories[currentCategory - 1]}
              </h2>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center items-center mb-8">
              {categories.map((cat, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`h-10 w-10 flex items-center justify-center rounded-full ${currentCategory === index + 1
                        ? 'bg-blue-950 text-white'
                        : completedCategories.includes(index + 1)
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-600 text-white'
                          : 'bg-gray-300 text-gray-800'
                      }`}
                  >
                    {completedCategories.includes(index + 1) ? (
                      <CheckCircleIcon className="h-6 w-6" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < categories.length - 1 && (
                    <div className="w-10 h-1 bg-gray-400 mx-2"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Questions Grid */}
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {questions.map((question, index) => {
                const isAnswered =
                  userResponses[question.question_id] !== undefined;
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg shadow-md transition duration-300 ${isAnswered
                        ? 'bg-green-100 border-l-4 border-blue-500'
                        : 'bg-white'
                      }`}
                  >
                    <p className="text-gray-800 font-medium mb-3">
                      {`${index + 1}. ${question.Question_text}`}
                    </p>
                    <div className="space-y-2">
                      {question.options &&
                        question.options.map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className="flex items-center cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={`question-${question.question_id}`}
                              value={option.marks}
                              checked={
                                userResponses[question.question_id] ===
                                option.marks
                              }
                              onChange={() =>
                                handleOptionSelect(
                                  question.question_id,
                                  option.marks
                                )
                              }
                              className="form-radio h-5 w-5 text-blue-500"
                            />
                            <span className="ml-2 text-gray-700">
                              {option.option_text}
                            </span>
                          </label>
                        ))}
                    </div>
                  </div>
                );
              })}
            </form>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10">
              <button
                onClick={handlePreviousCategory}
                disabled={currentCategory === 1}
                className={`px-6 py-2 rounded-md text-white font-semibold transition duration-300 ${currentCategory === 1
                    ? 'bg-blue-950 cursor-not-allowed'
                    : 'bg-blue-950 hover:bg-gray-400'
                  }`}
              >
                Previous
              </button>

              {currentCategory < 5 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 rounded-md bg-blue-950 text-white font-semibold hover:bg-gray-400 transition duration-300"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 rounded-md bg-blue-950 text-white font-semibold hover:bg-green-600 transition duration-300"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Feedback Modal */}
        <Modal
          isOpen={showFeedback}
          onRequestClose={() => setShowFeedback(false)}
          contentLabel="Feedback"
          className="flex items-center justify-center p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="relative bg-white p-8 rounded-lg text-center">
          {feedbackType === 'info' && <AnimatedStars />}
          <div
            className={`bg-white p-6 rounded-lg shadow-lg text-center ${feedbackType === 'success'
                ? 'bg-green-100'
                : feedbackType === 'info'
                  ? 'bg-white'
                  : 'bg-red-100'
              }`}
          >
            <h2
              className={`text-2xl font-bold mb-4 ${feedbackType === 'success'
                  ? 'text-green-700'
                  : feedbackType === 'info'
                    ? 'text-red-800'
                    : 'text-red-700'
                }`}
            >
              {feedbackType === 'success'
                ? 'Yayyy!'
                : feedbackType === 'info'
                  ? 'Keep Going!'
                  : 'Oops!'}
            </h2>
            <p className="text-lg mb-4">{feedbackMessage}</p>
            <button
              onClick={() => setShowFeedback(false)}
              className="px-6 py-2 rounded-md bg-blue-950 text-white font-semibold hover:bg-blue-600 transition duration-300"
            >
              OK
            </button>
          </div>
          </div>
        </Modal>
        <ToastContainer />
      </div>
    </div>
  );
}

export default MonthQuestions;
