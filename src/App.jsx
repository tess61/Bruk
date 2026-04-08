import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Todo from "./pages/Todo";
import Journal from "./pages/Journal";
import Timer from "./pages/Timer";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-900 text-white">
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Mobile Menu Button - Only show when sidebar is closed on mobile */}
          <button
            onClick={() => setIsOpen(true)}
            className="fixed top-4 left-4 z-40 md:hidden bg-gray-800 p-2 rounded-lg shadow-lg"
          >
            ☰
          </button>
          
          {/* Page Content */}
          <div className="p-4 md:p-6 pt-16 md:pt-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/timer" element={<Timer />} />
            </Routes>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;