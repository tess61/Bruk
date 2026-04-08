// pages/Journal.jsx
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Journal() {
  const [entries, setEntries] = useLocalStorage("journal", []);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const addEntry = () => {
    if (!text.trim()) return;

    const newEntry = {
      id: Date.now(),
      text,
      createdAt: new Date().toISOString(),
    };

    setEntries([newEntry, ...entries]);
    setText("");
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const startEdit = (entry) => {
    setEditingId(entry.id);
    setEditText(entry.text);
  };

  const saveEdit = (id) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, text: editText } : entry
      )
    );
    setEditingId(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Journal</h1>

      {/* Input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your thoughts..."
        rows="4"
        className="w-full p-3 bg-gray-800 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button
        onClick={addEntry}
        className="bg-purple-600 px-6 py-2 rounded mb-6 hover:bg-purple-700 transition"
      >
        Add Entry
      </button>

      {/* Timeline - Removed max-h-[60vh] so it takes full height */}
      <div className="space-y-4 border-l-2 border-purple-500 pl-4">
        {entries.map((entry) => (
          <div key={entry.id} className="relative">
            <div className="absolute -left-6 top-2 w-3 h-3 bg-purple-500 rounded-full"></div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">
                {new Date(entry.createdAt).toLocaleString()}
              </p>

              {editingId === entry.id ? (
                <>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded mb-2"
                    rows="3"
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={() => saveEdit(entry.id)}
                      className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => setEditingId(null)}
                      className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-700 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="whitespace-pre-wrap">{entry.text}</p>
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={() => startEdit(entry)}
                      className="text-blue-400 hover:text-blue-300 transition"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteEntry(entry.id)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}