import React from "react";
import { BsSquare } from "react-icons/bs";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import './style.css'
import Choose from "../../assets/Choose.png";

const ChooseUs = () => {
  const { ref: listRef1, inView: inView1 } = useInView({ triggerOnce: true });
  const { ref: listRef2, inView: inView2 } = useInView({ triggerOnce: true });
  const { ref: listRef3, inView: inView3 } = useInView({ triggerOnce: true });
  const { ref: listRef4, inView: inView4 } = useInView({ triggerOnce: true });
  const { ref: listRef5, inView: inView5 } = useInView({ triggerOnce: true });
  const { ref: listRef6, inView: inView6 } = useInView({ triggerOnce: true });
  const { ref: imageRef, inView: imageInView } = useInView({ triggerOnce: true });

  const listItems = [
    "Personalized Insights with Actionable Recommendations",
    "Empowering Self-Assessment at Home",
    "Location-Based Suggestions for Professional Evaluation",
    "Real-Time Progress Tracking",
    "Guidance at Your Fingertips with a Virtual Chatbot",
    "Visual Representation for a Clear Understanding"
  ];

  return (
    <div className="relative pb-24 pt-12 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-blue-100 via-white to-white">
      <motion.h2
        className="text-2xl lg:text-5xl font-bold mb-6 text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Why <span className="text-blue-500">Choose Us</span>
      </motion.h2>
      <motion.p
        className="text-gray-600 mb-8 text-center text-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Here's why choosing us makes a difference:
      </motion.p>
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="lg:w-1/2 pl-8 lg:pl-36 flex justify-center mb-16 lg:mb-0">
          <ul className="text-gray-500 text-lg">
            {listItems.map((text, index) => (
              <motion.li
                key={index}
                className="flex items-center mb-6 transition-transform transform"
                ref={[listRef1, listRef2, listRef3, listRef4, listRef5, listRef6][index]}
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: [inView1, inView2, inView3, inView4, inView5, inView6][index] ? 1 : 0,
                  y: [inView1, inView2, inView3, inView4, inView5, inView6][index] ? 0 : -20,
                }}
                transition={{ duration: 0.6, delay: index * 0.3 }} // Adjust delay for drop effect
              >
                <BsSquare className="text-blue-500 border-blue-400 border-solid border-4 mr-3 p-1" />
                {text}
              </motion.li>
            ))}
          </ul>
        </div>
        <motion.div
          className={`lg:w-1/2 ${imageInView ? "bounce" : ""}`} // Apply bounce class when in view
          ref={imageRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: imageInView ? 1 : 0, y: imageInView ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <img src={Choose} alt="Choose Us" className="w-full rounded-lg" />
        </motion.div>
      </div>
    </div>
  );
};

export default ChooseUs;
