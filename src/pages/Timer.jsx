// import { useState, useEffect } from "react";

// export default function Timer() {
//   const [minutes, setMinutes] = useState(25);
//   const [seconds, setSeconds] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);

//   // Countdown logic
//   useEffect(() => {
//     let interval;

//     if (isRunning) {
//       interval = setInterval(() => {
//         if (seconds > 0) {
//           setSeconds(seconds - 1);
//         } else if (minutes > 0) {
//           setMinutes(minutes - 1);
//           setSeconds(59);
//         } else {
//           setIsRunning(false);
//         }
//       }, 1000);
//     }

//     return () => clearInterval(interval);
//   }, [isRunning, seconds, minutes]);

//   const startTimer = () => setIsRunning(true);
//   const pauseTimer = () => setIsRunning(false);

//   const resetTimer = () => {
//     setIsRunning(false);
//     setMinutes(25);
//     setSeconds(0);
//   };

//   const setPomodoro = (mins) => {
//     setIsRunning(false);
//     setMinutes(mins);
//     setSeconds(0);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-[80vh]">
//       <h1 className="text-2xl font-bold mb-6">Study Timer</h1>
       
//        {/* Custom Input */} 

//       <input
//         type="number"
//         min="1"
//         value={minutes}
//         onChange={(e) => setMinutes(Number(e.target.value))}
//         className="mb-4 p-2 bg-gray-800 rounded text-center w-24"
//     />

//       {/* Timer Display */}
      
//       <div className="text-6xl font-mono mb-6 bg-gray-800 p-8 rounded-xl shadow-lg text-center">
//         {String(minutes).padStart(2, "0")}:
//         {String(seconds).padStart(2, "0")}
//       </div>

//       {/* Controls */}
//       <div className="flex gap-4 mb-6">
//         <button
//           onClick={startTimer}
//           className="bg-green-600 px-4 py-2 rounded"
//         >
//           Start
//         </button>

//         <button
//           onClick={pauseTimer}
//           className="bg-yellow-500 px-4 py-2 rounded"
//         >
//           Pause
//         </button>

//         <button
//           onClick={resetTimer}
//           className="bg-red-600 px-4 py-2 rounded"
//         >
//           Reset
//         </button>
//       </div>

//       {/* Pomodoro Presets */}
//       <div className="flex gap-4">
//         <button
//           onClick={() => setPomodoro(25)}
//           className="bg-purple-600 px-4 py-2 rounded"
//         >
//           25 min Focus
//         </button>

//         <button
//           onClick={() => setPomodoro(5)}
//           className="bg-blue-600 px-4 py-2 rounded"
//         >
//           5 min Break
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";

export default function Timer() {
  // Load saved state from localStorage or use defaults
  const [minutes, setMinutes] = useState(() => {
    const saved = localStorage.getItem("timerMinutes");
    return saved !== null ? parseInt(saved) : 25;
  });
  
  const [seconds, setSeconds] = useState(() => {
    const saved = localStorage.getItem("timerSeconds");
    return saved !== null ? parseInt(saved) : 0;
  });
  
  const [isRunning, setIsRunning] = useState(() => {
    const saved = localStorage.getItem("timerIsRunning");
    return saved !== null ? JSON.parse(saved) : false;
  });
  
  const [endTime, setEndTime] = useState(() => {
    const saved = localStorage.getItem("timerEndTime");
    return saved !== null ? parseInt(saved) : null;
  });

  // Save timer state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("timerMinutes", minutes);
    localStorage.setItem("timerSeconds", seconds);
    localStorage.setItem("timerIsRunning", JSON.stringify(isRunning));
    if (endTime) {
      localStorage.setItem("timerEndTime", endTime);
    } else {
      localStorage.removeItem("timerEndTime");
    }
  }, [minutes, seconds, isRunning, endTime]);

  // Countdown logic with endTime for persistence
  useEffect(() => {
    let interval;

    if (isRunning) {
      // If we have an endTime, use it to calculate remaining time
      if (endTime) {
        const now = Date.now();
        const remaining = Math.max(0, endTime - now);
        
        if (remaining <= 0) {
          // Timer finished
          setIsRunning(false);
          setMinutes(0);
          setSeconds(0);
          setEndTime(null);
          return;
        }
        
        const remainingMinutes = Math.floor(remaining / 60000);
        const remainingSeconds = Math.floor((remaining % 60000) / 1000);
        
        if (remainingMinutes !== minutes || remainingSeconds !== seconds) {
          setMinutes(remainingMinutes);
          setSeconds(remainingSeconds);
        }
      }

      interval = setInterval(() => {
        if (endTime) {
          const now = Date.now();
          const remaining = Math.max(0, endTime - now);
          
          if (remaining <= 0) {
            // Timer finished
            setIsRunning(false);
            setMinutes(0);
            setSeconds(0);
            setEndTime(null);
            localStorage.removeItem("timerEndTime");
          } else {
            const remainingMinutes = Math.floor(remaining / 60000);
            const remainingSeconds = Math.floor((remaining % 60000) / 1000);
            setMinutes(remainingMinutes);
            setSeconds(remainingSeconds);
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, endTime, minutes, seconds]);

  const startTimer = () => {
    // Calculate end time based on current minutes and seconds
    const totalMilliseconds = (minutes * 60 + seconds) * 1000;
    const newEndTime = Date.now() + totalMilliseconds;
    setEndTime(newEndTime);
    setIsRunning(true);
  };
  
  const pauseTimer = () => {
    setIsRunning(false);
    setEndTime(null);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
    setEndTime(null);
  };

  const setPomodoro = (mins) => {
    setIsRunning(false);
    setMinutes(mins);
    setSeconds(0);
    setEndTime(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-2xl font-bold mb-6">Study Timer</h1>
       
      {/* Custom Input */} 
      <input
        type="number"
        min="1"
        value={minutes}
        onChange={(e) => {
          if (!isRunning) {
            setMinutes(Number(e.target.value));
            setSeconds(0);
          }
        }}
        className="mb-4 p-2 bg-gray-800 rounded text-center w-24"
        disabled={isRunning}
      />

      {/* Timer Display */}
      <div className="text-6xl font-mono mb-6 bg-gray-800 p-8 rounded-xl shadow-lg text-center">
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={startTimer}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
          disabled={isRunning || (minutes === 0 && seconds === 0)}
        >
          Start
        </button>

        <button
          onClick={pauseTimer}
          className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Pause
        </button>

        <button
          onClick={resetTimer}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Reset
        </button>
      </div>

      {/* Pomodoro Presets */}
      <div className="flex gap-4">
        <button
          onClick={() => setPomodoro(25)}
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
          disabled={isRunning}
        >
          25 min Focus
        </button>

        <button
          onClick={() => setPomodoro(5)}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={isRunning}
        >
          5 min Break
        </button>
      </div>
      
      {/* Status indicator
      {isRunning && (
        <div className="mt-4 text-sm text-green-400">
          ● Timer running (persists on reload)
        </div>
      )} */}
    </div>
  );
}