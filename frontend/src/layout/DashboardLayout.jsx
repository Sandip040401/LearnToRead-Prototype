import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import BottomNavbar from "../components/User/BottomNavbar";

export default function DashboardLayout({ children }) {
  const [showModal, setShowModal] = useState(false);

  const logout = () => {
    localStorage.clear();
    signOut(auth)
      .then(() => (window.location.href = "/login"))
      .catch((error) => console.error("Error signing out: ", error));
  };

  return (
    <div className="min-h-screen bg-blue-400 relative pb-24 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <img src="/images/logo.png" alt="i-Life Logo" className="h-12" />
        <button
          className="text-white text-2xl bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
          onClick={() => setShowModal(true)}
        >
          ×
        </button>
      </div>


      {/* Content from children */}
      {children}

      <BottomNavbar />

      {/* Logout Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-30 backdrop-blur-md p-6 rounded-xl w-80 text-center shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Do you want to exit?</h2>
            <div className="flex justify-center gap-6">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
                onClick={logout}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-full"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
