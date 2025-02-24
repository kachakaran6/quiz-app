import { useRef, useState } from "react";
import "./ans.css";
import { data } from "../assets/data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let opt1 = useRef(null);
  let opt2 = useRef(null);
  let opt3 = useRef(null);
  let opt4 = useRef(null);

  let option_array = [opt1, opt2, opt3, opt4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9FA2FC] to-[#6C79F7] flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-[#9FA2FC] mb-6">
          Quiz App
        </h1>
        <hr className="mb-6 border-t-4 border-[#9FA2FC] rounded" />

        {result ? (
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800">
              You scored {score} out of {data.length}
            </h2>
            <button
              onClick={reset}
              className="mt-6 px-8 py-3 bg-[#9FA2FC] text-white text-lg font-semibold rounded-full hover:bg-[#8a90e6] transition-all duration-300 ease-in-out"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {index + 1}. {question.question}
            </h2>

            <ul className="space-y-4">
              {["opt1", "opt2", "opt3", "opt4"].map((opt, i) => (
                <li
                  key={i}
                  ref={eval(opt)}
                  onClick={(e) => checkAns(e, i + 1)}
                  className="text-lg text-gray-700 p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#9FA2FC] hover:text-white"
                >
                  {question[opt]}
                </li>
              ))}
            </ul>

            <button
              onClick={next}
              className="mt-6 px-8 py-3 bg-[#9FA2FC] text-white text-lg font-semibold rounded-full hover:bg-[#8a90e6] transition-all duration-300 ease-in-out"
            >
              Next Question
            </button>

            <div className="mt-6 text-center text-gray-600">
              Question {index + 1} of {data.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
