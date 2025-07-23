import React from 'react';

import { useState } from "react";
import { register as registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    await registerUser(form);
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input name="name" value={form.name} onChange={handleChange} className="input" placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} className="input" placeholder="Email" />
      <input name="password" value={form.password} onChange={handleChange} className="input" placeholder="Password" type="password" />
      <button onClick={handleRegister} className="btn mt-4">Register</button>
    </div>
  );
};

export default Register;
