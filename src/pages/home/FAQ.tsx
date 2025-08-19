"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const faqData = [
  {
    question: "Can I use Landwind in open-source projects?",
    answer: (
      <>
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Landwind is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Check out this guide to learn how to{" "}
          <a href="#" className="text-purple-600 dark:text-purple-500 hover:underline">
            get started
          </a>
          {" "}and start developing websites even faster with components on top of Tailwind CSS.
        </p>
      </>
    ),
  },
  {
    question: "Is there a Figma file available?",
    answer: (
      <>
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Landwind is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Check out the{" "}
          <a href="#" className="text-purple-600 dark:text-purple-500 hover:underline">
            Figma design system
          </a>{" "}
          based on the utility classes from Tailwind CSS and components from Landwind.
        </p>
      </>
    ),
  },
  {
    question: "What are the differences between Landwind and Tailwind UI?",
    answer: (
      <>
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          The main difference is that the core components from Landwind are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Landwind relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.
        </p>
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          However, we actually recommend using both Landwind, Landwind Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.
        </p>
        <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
        <ul className="pl-5 text-gray-500 list-disc dark:text-gray-400">
          <li>
            <a href="#" className="text-purple-600 dark:text-purple-500 hover:underline">
              Landwind Pro
            </a>
          </li>
          <li>
            <a href="#" className="text-purple-600 dark:text-purple-500 hover:underline">
              Tailwind UI
            </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "What about browser support?",
    answer: (
      <>
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          The main difference is that the core components from Landwind are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Landwind relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.
        </p>
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          However, we actually recommend using both Landwind, Landwind Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.
        </p>
        <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
        <ul className="pl-5 text-gray-500 list-disc dark:text-gray-400">
          <li>
            <a href="#" className="text-purple-600 dark:text-purple-500 hover:underline">
              Landwind Pro
            </a>
          </li>
          <li>
            <a href="#" className="text-purple-600 dark:text-purple-500 hover:underline">
              Tailwind UI
            </a>
          </li>
        </ul>
      </>
    ),
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-24 lg:px-6 ">
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-center text-gray-900 lg:mb-8 lg:text-3xl dark:text-white">
          Frequently asked questions
        </h2>
        <div className="max-w-screen-md mx-auto">
          <div>
            {faqData.map((item, idx) => (
              <div key={idx}>
                <h3 id={`accordion-flush-heading-${idx + 1}`}>
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 ${openIndex === idx
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                      }`}
                    aria-expanded={openIndex === idx}
                    aria-controls={`accordion-flush-body-${idx + 1}`}
                    onClick={() => handleToggle(idx)}
                  >
                    <span>{item.question}</span>
                    <IoIosArrowDown size={16}
                      className={`shrink-0 transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`}
                    />

                  </button>
                </h3>
                <div
                  id={`accordion-flush-body-${idx + 1}`}
                  className={openIndex === idx ? "" : "hidden"}
                  aria-labelledby={`accordion-flush-heading-${idx + 1}`}
                >
                  <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}