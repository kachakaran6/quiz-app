import { useRef, useState, useEffect } from "react";
import "./ans.css";
import { data } from "../assets/data"; // Make sure data contains subject options

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [selectedSubject, setSelectedSubject] = useState("AJP"); // Add state for selected subject
  let [questionCount, setQuestionCount] = useState(5); // Add state for selected number of questions
  const [shuffledQuestions, setShuffledQuestions] = useState([]); // State to store shuffled questions

  // Option refs for correct/wrong answer styling
  let opt1 = useRef(null);
  let opt2 = useRef(null);
  let opt3 = useRef(null);
  let opt4 = useRef(null);
  let option_array = [opt1, opt2, opt3, opt4];

  // Fisher-Yates Shuffle function
  const shuffleArray = (array) => {
    let shuffledArray = [...array]; // Copy the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]; // Swap elements
    }
    return shuffledArray;
  };

  // Load the first question when the subject changes
  useEffect(() => {
    if (data[selectedSubject] && data[selectedSubject].length > 0) {
      const shuffled = shuffleArray(data[selectedSubject]); // Shuffle the questions
      setShuffledQuestions(shuffled); // Set shuffled questions
      setQuestion(shuffled[0]); // Load the first question of the selected subject
      setIndex(0); // Reset the index to 0 when changing the subject
      setScore(0); // Reset score when changing the subject
      setLock(false); // Reset lock to allow answering new questions
      setResult(false); // Reset the result
    }
  }, [selectedSubject, questionCount]); // Re-run when selectedSubject changes

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
      if (
        index === questionCount - 1 ||
        index === data[selectedSubject].length - 1
      ) {
        setResult(true);
        return;
      }
      const newIndex = index + 1;
      setIndex(newIndex);
      setQuestion(data[selectedSubject][newIndex]);
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
    setQuestion(shuffledQuestions[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
    setIndex(0); // Reset index when changing subject
    setQuestion(data[subject][0]); // Load the first question of the selected subject
    setLock(false);
    setScore(0);
    setResult(false);
  };

  const handleQuestionCountChange = (count) => {
    setQuestionCount(count);
    setIndex(0); // Reset to the first question
    setScore(0);
    setLock(false);
    setResult(false);
  };

  // Ensure question is available before rendering
  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9FA2FC] to-[#6C79F7] flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-[#9FA2FC] mb-6">
          Quiz App
        </h1>
        <hr className="mb-6 border-t-4 border-[#9FA2FC] rounded" />

        {/* Subject Selection Toggle */}
        <div className="mb-6">
          <label className="text-lg font-semibold">Select Subject: </label>
          <div className="flex space-x-4">
            <button
              onClick={() => handleSubjectChange("AJP")}
              className={`px-6 py-2 rounded-full ${
                selectedSubject === "AJP"
                  ? "bg-[#9FA2FC] text-white"
                  : "bg-gray-200"
              }`}
            >
              AJP
            </button>
            <button
              onClick={() => handleSubjectChange("CG")}
              className={`px-6 py-2 rounded-full ${
                selectedSubject === "CG"
                  ? "bg-[#9FA2FC] text-white"
                  : "bg-gray-200"
              }`}
            >
              CG
            </button>
          </div>
        </div>

        {/* Question Count Toggle */}
        <div className="mb-6">
          <label className="text-lg font-semibold">
            Select Number of Questions:{" "}
          </label>
          <div className="flex space-x-4">
            {[5, 10, 15].map((count) => (
              <button
                key={count}
                onClick={() => handleQuestionCountChange(count)}
                className={`px-6 py-2 rounded-full ${
                  questionCount === count
                    ? "bg-[#9FA2FC] text-white"
                    : "bg-gray-200"
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* Result or Question Display */}
        {result ? (
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800">
              You scored {score} out of {questionCount}
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
              Question {index + 1} of {questionCount}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
