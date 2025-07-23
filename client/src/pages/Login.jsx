import React from 'react';

import { useState } from "react";
import { login as loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await loginUser({ email, password });
    login(res.data);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" type="password" />
      <button onClick={handleLogin} className="btn mt-4">Login</button>
    </div>
  );
};

export default Login;
