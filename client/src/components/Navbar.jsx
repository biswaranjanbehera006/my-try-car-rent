import React from 'react';

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/">CarRent</Link>
      <div className="space-x-4">
        <Link to="/cars">Cars</Link>
        {user ? (
          <>
            <Link to="/bookings">My Bookings</Link>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
