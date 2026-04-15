import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../config/api";
import "../Login.css";

function Login() {
  const [mode, setMode] = useState("student-login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const role = mode === "admin-login" ? "ADMIN" : "STUDENT";

      const res = await apiClient.post("/login", {
        email,
        password,
        role,
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  const signup = async (e) => {
    e.preventDefault();

    try {
      await apiClient.post("/signup", {
        name,
        email,
        password,
      });

      alert("Registration successful. Please login.");
      clearForm();
      setMode("student-login");
    } catch (err) {
      alert(err.response?.data || "Signup failed");
    }
  };

  return (
    <div className="login-container">

      {/* 🔷 LEFT SIDE */}
      <div className="login-left">
        <h1>Smart Complaint Portal</h1>
        <p>
          Welcome! Raise and track your complaints easily.  
          Our system connects students and administration efficiently.
        </p>
      </div>

      {/* 🔷 RIGHT SIDE */}
      <form
        onSubmit={mode === "student-register" ? signup : login}
        className="login-form"
      >
        <h2>
          {mode === "student-register"
            ? "Student Register"
            : mode === "admin-login"
            ? "Admin Login"
            : "Student Login"}
        </h2>
        <p className="subtitle">
          {mode === "student-register"
            ? "Create a student account"
            : "Access your account"}
        </p>

        <select
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
            clearForm();
          }}
        >
          <option value="student-login">Student Login</option>
          <option value="student-register">Student Register</option>
          <option value="admin-login">Admin Login</option>
        </select>

        {mode === "student-register" && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          {mode === "student-register" ? "Register" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;