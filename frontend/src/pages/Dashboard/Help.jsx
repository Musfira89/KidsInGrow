import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FAQ from '../../LandingPage/FAQ/Faq'; // Ensure this path is correct

const Help = () => {
  // State to manage FAQ visibility
  const [isFAQVisible, setIsFAQVisible] = useState(false);

  // Toggle FAQ visibility
  const handleToggleFAQ = () => {
    setIsFAQVisible(!isFAQVisible);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-6 w-[90%] ml-20">
        <header className="bg-orange-400 text-white p-6 rounded-lg shadow-lg mx-auto max-w-7xl h-45 flex items-center justify-between">
          <div className="flex flex-col justify-center h-full">
            <p className="text-sm">Welcome!</p>
            <h1 className="text-3xl font-bold">Answer The Frequently Asked Questions</h1>
            <p className="text-sm">Need assistance? Visit our Help section for support and FAQs!</p>
          </div>
          <div className="h-full">
            <img
              src="https://carpetmilloutletstores.com/wp-content/uploads/2019/01/CMO_FB_little-girl-toys.jpg"
              alt="Logo"
              className="h-[200px] w-[700px] object-cover"
            />
          </div>

      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
   
        {/* FAQ Section */}
        <section className="mt-8">
          <button
            onClick={handleToggleFAQ}
            className="bg-blue-500 text-white p-2 ml-[45%] rounded-lg shadow-lg mb-4 hover:bg-blue-600 transition duration-300"
          >
            {isFAQVisible ? 'Hide FAQs' : 'Show FAQs'}
          </button>
          {isFAQVisible && <FAQ />}
        </section>

       
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center p-4">
        &copy; 2024 Kids InGrow. All rights reserved.
      </footer>
    </div>
  );
};

export default Help;
