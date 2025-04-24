import { useState } from "react";
import { auth, googleProvider } from "../../firebase.js";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { registerUser } from "../../api/api.js";  // Importing the registerUser function from api.js
import React from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle Email & Password Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Firebase registration
      const userCred = await createUserWithEmailAndPassword(auth, email, "123456");
      // console.log("User registered:", userCred.user);

      // Send user data to the backend API to store user in MongoDB
      const response = await registerUser({
        email,
        password: "123456",  // Use password '123456' for registration
        role: "user", // You can modify this to dynamically assign roles
        uid: userCred.user.uid,
      });

      // console.log("User successfully registered in backend:", response.data);

      // Handle successful registration (e.g., redirect user)
      // Example: Redirecting user after successful registration
      // window.location.href = "/dashboard"; // or use react-router for SPA routing

    } catch (err) {
      console.error("Registration error:", err.message);
      setError("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      // Firebase Google sign-in
      const userCred = await signInWithPopup(auth, googleProvider);
      // console.log("Google sign-in:", userCred.user);

      // Send user data to the backend API to store user in MongoDB
      const response = await registerUser({
        email: userCred.user.email,
        password: "123456",  // Store as '123456' or handle accordingly
        role: "user",  // You can modify the role dynamically
        uid: userCred.user.uid,
      });

      // console.log("User successfully registered via Google in backend:", response.data);

      // Handle successful registration (e.g., redirect user)
      // Example: Redirecting user after successful registration
      // window.location.href = "/dashboard"; // or use react-router for SPA routing

    } catch (err) {
      console.error("Google sign-in error:", err.message);
      setError("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            className="w-full p-3 border rounded outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded text-white transition ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center my-4">— or —</div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className={`w-full p-3 rounded text-white transition ${
            loading ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {loading ? "Please wait..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}
