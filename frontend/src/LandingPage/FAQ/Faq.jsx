import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Faq = () => {
  const faqData = [
    {
      question: "What is KidsInGrow and how does it work?",
      answer:
        "KidsInGrow is a growth and developmental screening tool for children aged birth to 5 years.",
    },
    {
      question: "Why does screening matter for children's development?",
      answer:
        "Screening is essential for identifying developmental delays or concerns early on, allowing for timely intervention and support.",
    },
    {
      question: "How can parents benefit from KidInGrow?",
      answer:
        "Parents can utilize KidsInGrow to understand their child's development better, receive guidance on how screening can help their child, and have their most pressing questions about KidInGrow answered.",
    },
    {
      question: "What are some features of KidInGrow?",
      answer:
        "KidInGrow offers easy-to-complete questionnaires for parents, online management of KidInGrow data, and fun, age-appropriate learning activities to encourage their child's development.",
    },
    {
      question:
        "How can I track my child's progress in different developmental areas using KidInGrow questionnaires?",
      answer:
        "KidInGrow questionnaires allow parents to assess their child's development in key areas like social interaction, problem-solving, communication, gross motor skills, and fine motor skills.",
    },
    {
      question: "What areas of development is my child focusing on?",
      answer:
        "Your child may be engaging in activities that support various aspects of development such as social interaction, problem-solving, communication, gross motor skills, and fine motor skills.",
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef(null);

  const toggleAnswer = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full pb-24 px-4 md:px-8 lg:px-16">
      <div className="w-full md:w-2/3 lg:w-1/2">
        {/* Heading */}
        <motion.h2
          ref={headingRef}
          className="text-2xl lg:text-5xl font-bold mb-6 text-center text-gray-800"
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -80 }}
          transition={{ duration: 0.9 }}
        >
          Frequently Asked
          <span className="text-blue-500"> Questions</span>
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-8 text-center text-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Do you need some help with something or do you have questions about
          our features?
        </motion.p>
        {/* FAQ Container */}
        <div className="bg-white shadow-lg rounded-lg border border-blue-200 p-6">
          {/* FAQ Questions */}
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="flex flex-col border-b border-gray-200 py-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between">
                <p className="text-gray-800 font-semibold text-lg">
                  {faq.question}
                </p>
                <button
                  className="text-blue-500 text-xl focus:outline-none"
                  onClick={() => toggleAnswer(index)}
                >
                  {expandedIndex === index ? "-" : "+"}
                </button>
              </div>
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    className="mt-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-700">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
