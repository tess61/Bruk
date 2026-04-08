// components/Sidebar.jsx
import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navItems = [
    { path: "/", name: "Dashboard" },
    { path: "/todo", name: "Todo List" },
    { path: "/journal", name: "Journal" },
    { path: "/timer", name: "Timer" },
  ];

  return (
    <div
      className={`
        fixed top-0 left-0 w-64 bg-gray-800 p-5 transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0 h-screen" : "-translate-x-full h-screen"}
        md:relative md:translate-x-0 md:min-h-screen md:flex md:flex-col
      `}
    >
      {/* Close button for mobile */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-white text-2xl"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-8">Focus Forge</h2>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? "bg-purple-600 text-white shadow-lg" 
                    : "hover:bg-gray-700 text-gray-300 hover:text-white"
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
                {({ isActive }) => isActive && (
                  <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}