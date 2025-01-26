import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
      <div className="text-white text-2xl font-bold">
        My Paste App
      </div>
      <div className="flex flex-row gap-6">
        <NavLink
          to="/"
          className="text-white text-lg font-medium hover:text-gray-200 transition duration-200"
        >
          Home
        </NavLink>
        <NavLink
          to="/pastes"
          className="text-white text-lg font-medium hover:text-gray-200 transition duration-200"
        >
          Pastes
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
