import React, { useState } from 'react';
import axios from 'axios';

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    month: '',
    category: '',
    questions: ['', '', '', '', '', ''], // Initialize with 6 empty strings
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleQuestionInputChange = (index, event) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: newQuestions,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send form data to backend for processing
      await axios.post('http://localhost:8082/api/questions/add', formData); // Update URL
      // Reset form data
      setFormData({
        month: '',
        category: '',
        questions: ['', '', '', '', '', ''],
      });
      alert('Questions added successfully!');
    } catch (error) {
      console.error('Error adding questions:', error);
      alert('An error occurred while adding questions.');
    }
  };

  // Generate options for specific months (2, 4, 6, ..., 36)
  const monthOptions = Array.from({ length: 60 }, (_, index) => (index + 1)).map(
    (month) => (
      <option key={month} value={month}>
        {month}
      </option>
    )
  );

  // Options for categories dropdown
  const categoryOptions = [
    'Communication',
    'Gross Motor',
    'Fine Motor',
    'Problem Solving',
    'Personal Social Interaction',
  ].map((category, index) => (
    <option key={index} value={category}>
      {category}
    </option>
  ));

  return (
    <div className="mt-8 mb-28 bg-gray-100 p-8 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add Question Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="month" className="block font-medium mb-2">
            Select Month
          </label>
          <select
            name="month"
            id="month"
            className="block w-full bg-white border border-gray-300 rounded-md py-2 px-4 mb-3 focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={formData.month}
          >
            <option value="">Select Month</option>
            {monthOptions}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block font-medium mb-2">
            Select Category
          </label>
          <select
            name="category"
            id="category"
            className="block w-full bg-white border border-gray-300 rounded-md py-2 px-4 mb-3 focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={formData.category}
          >
            <option value="">Select Category</option>
            {categoryOptions}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Add Questions</label>
          {formData.questions.map((question, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                className="block w-full bg-white border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:border-blue-500"
                placeholder={`Question ${index + 1}`}
                value={question}
                onChange={(event) => handleQuestionInputChange(index, event)}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
