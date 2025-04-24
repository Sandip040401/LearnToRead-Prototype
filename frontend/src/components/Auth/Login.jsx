import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import { loginUser } from "../../api/api"; // Import loginUser from api.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Google Sign-In
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const userCred = await signInWithPopup(auth, provider);
      // console.log("Google User logged in:", userCred.user);

      // Send Firebase token to backend for validation and JWT
      const idToken = await userCred.user.getIdToken();
      
      // Use the loginUser API method to send the token
      const response = await loginUser({ idToken });

      // Handle successful login (e.g., store JWT, redirect user)
      localStorage.setItem("authToken", response.data.token);
      navigate("/user");
      // Optionally, you can redirect or show a success message
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Email/Password Sign-In
  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      // Sign in with Firebase authentication
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      // console.log("User logged in:", userCred.user);

      // Send Firebase token to backend for validation and JWT
      const idToken = await userCred.user.getIdToken();

      // Use the loginUser API method to send the token
      const response = await loginUser({ idToken });

      // Handle successful login (e.g., store JWT, redirect user)
      localStorage.setItem("authToken", response.data.token);
      navigate("/user");
      // Optionally, you can redirect or show a success message
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        
        {/* Email/Password Login */}
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="input mt-3"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 mt-5 rounded"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login with Email"}
        </button>
        
        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 mt-3 rounded"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login with Google"}
        </button>
      </div>
    </div>
  );
}
