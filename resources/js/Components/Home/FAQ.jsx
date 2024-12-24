import React, { useState } from 'react';

export const FAQ = ({ faqs }) => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
      <div className="container py-8 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
              <div>
                  <p className="text-xl md:text-4xl text-center md:text-start font-bold md:mb-4">
                      FAQs
                  </p>
                  <p className="hidden md:block text-gray-500 text-base md:text-lg leading-relaxed">
                      Life is short why spent to design from scratch, Use
                      finalui templates and its dummy text like lorem ipsum
                      dolor sit amet, consectetur adipiscing elit.
                  </p>
              </div>
              <div className="md:space-y-4">
                  {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-gray-300">
                          <button
                              onClick={() => toggleFAQ(index)}
                              className="flex justify-between items-center w-full py-4 text-left text-lg font-medium text-gray-700"
                          >
                              <p className="text-sm md:text-lg">
                                  {faq.question}
                              </p>
                              <span
                                  className={`transform transition-transform ${
                                      openFAQ === index ? "rotate-180" : ""
                                  }`}
                              >
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5 text-gray-500"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                  >
                                      <path
                                          fillRule="evenodd"
                                          d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clipRule="evenodd"
                                      />
                                  </svg>
                              </span>
                          </button>
                          {openFAQ === index && (
                              <p className="text-gray-600 mt-2 text-xs md:text-sm leading-relaxed">
                                  {faq.answer}
                              </p>
                          )}
                      </div>
                  ))}
              </div>
          </div>
      </div>
  );
};