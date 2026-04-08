import { useState, useEffect } from "react";
import quotes from "../utils/quotes";

export default function Dashboard() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    getRandomQuote();
  }, []);

  const getRandomQuote = () => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to FocusForge 🔥</h1>

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-[2px] rounded-xl">
  <div className="bg-gray-800 p-6 rounded-xl">
    <p className="text-lg italic">"{quote}"</p>
  </div>
</div>

      <button
        onClick={getRandomQuote}
        className="mt-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
      >
        New Quote
      </button>
    </div>
  );
}