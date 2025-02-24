const Quiz = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">
        Quiz App
      </h1>
      <hr className="mb-6" />

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        What is the full form of HTML?
      </h2>

      <ul className="list-disc pl-8 space-y-4">
        <li className="text-lg text-gray-700 hover:text-blue-500 cursor-pointer transition-all duration-300 ease-in-out">
          Hyper Text Markup Language
        </li>
        <li className="text-lg text-gray-700 hover:text-blue-500 cursor-pointer transition-all duration-300 ease-in-out">
          Hyper Text Markup Lang
        </li>
        <li className="text-lg text-gray-700 hover:text-blue-500 cursor-pointer transition-all duration-300 ease-in-out">
          Hyper Text Manual Lang
        </li>
        <li className="text-lg text-gray-700 hover:text-blue-500 cursor-pointer transition-all duration-300 ease-in-out">
          Hybrid Text Manual Lang
        </li>
      </ul>
    </div>
  );
};

export default Quiz;
