/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from "react";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  let [question, setQuestion] = useState(data[index]);

  const checkAns = (e, ans) => {
    if (question.ans === ans) {
      e.target.classList.add("correct");
    } else {
      e.target.classList.add("wrong");
    }
  };
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1
        className="text-4xl font-bold text-center"
        style={{ color: "#9FA2FC" }}
      >
        Quiz App
      </h1>
      <hr className="mb-6" style={{ borderColor: "#9FA2FC" }} />

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {index + 1}. {question.question}
      </h2>

      <ul className="list-disc pl-8 space-y-4">
        <li
          onClick={(e) => {
            checkAns(e, 1);
          }}
          className="text-lg text-gray-700 hover:text-[#9FA2FC] cursor-pointer transition-all duration-300 ease-in-out"
        >
          {question.opt1}
        </li>
        <li
          onClick={(e) => {
            checkAns(e, 2);
          }}
          className="text-lg text-gray-700 hover:text-[#9FA2FC] cursor-pointer transition-all duration-300 ease-in-out"
        >
          {question.opt2}
        </li>
        <li
          onClick={(e) => {
            checkAns(e, 3);
          }}
          className="text-lg text-gray-700 hover:text-[#9FA2FC] cursor-pointer transition-all duration-300 ease-in-out"
        >
          {question.opt3}
        </li>
        <li
          onClick={(e) => {
            checkAns(e, 4);
          }}
          className="text-lg text-gray-700 hover:text-[#9FA2FC] cursor-pointer transition-all duration-300 ease-in-out"
        >
          {question.opt4}
        </li>
      </ul>

      <button className="mt-6 px-6 py-2 bg-[#9FA2FC] text-white rounded-md hover:bg-[#8a90e6] transition-all duration-300 ease-in-out">
        Next
      </button>

      <div className="mt-4 text-center text-gray-600">1 of 5 Questions</div>
    </div>
  );
};

export default Quiz;
