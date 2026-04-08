import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Todo() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (!input.trim()) return;

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEdit = (task) => {
  setEditingId(task.id);
  setEditText(task.text);
};

const saveEdit = (id) => {
  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, text: editText } : task
    )
  );
  setEditingId(null);
};

const filteredTasks = tasks.filter((task) => {
  if (filter === "completed") return task.completed;
  if (filter === "active") return !task.completed;
  return true;
});

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      
      <div className="flex gap-2 mb-4">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
    </div>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
        className="flex-1 p-2 rounded bg-gray-800"
        placeholder="Add a task..."
      />  
        <button
          onClick={addTask}
          className="bg-purple-600 px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* Tasks */}
      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <li
  key={task.id}
  className="flex justify-between items-center bg-gray-800 p-3 rounded"
>
  {editingId === task.id ? (
    <input
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      className="flex-1 p-1 bg-gray-700 rounded"
    />
  ) : (
    <span
      onClick={() => toggleTask(task.id)}
      className={`cursor-pointer ${
        task.completed ? "line-through text-gray-400" : ""
      }`}
    >
      {task.text}
    </span>
  )}

  <div className="flex gap-2">
    {editingId === task.id ? (
      <button onClick={() => saveEdit(task.id)}>Save</button>
    ) : (
      <button onClick={() => startEdit(task)}>Edit</button>
    )}

    <button onClick={() => deleteTask(task.id)} className="text-red-400">
      Delete
    </button>
  </div>
</li>
        ))}
      </ul>
    </div>
  );
}