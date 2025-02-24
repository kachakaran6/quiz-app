import Quiz from "./components/Quiz";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <Quiz />
      </div>
    </div>
  );
}

export default App;
