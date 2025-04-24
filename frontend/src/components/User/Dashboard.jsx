import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import VolumeBooks from "./VolumeBooks"; // ✅ import the component

const levels = [
  { title: "Level-1", image: "/images/level1.png" },
  { title: "Level-2", image: "/images/level2.png" },
  { title: "Level-3", image: "/images/level3.png" },
  { title: "Level-4", image: "/images/level4.png" },
];

export default function UserDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null); // ✅ Track clicked level

  const logout = () => {
    localStorage.clear();
    signOut(auth)
      .then(() => (window.location.href = "/login"))
      .catch((error) => console.error("Error signing out: ", error));
  };

  if (selectedLevel) {
    return (
      <>
        <VolumeBooks level={selectedLevel} onClose={() => setSelectedLevel(null)} />
        <BottomNavbar />
      </>
    );
  }

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

      {/* Title */}
      <div className="text-center mt-4 mb-8">
        <h1 className="text-4xl font-bold text-white">Love To Read</h1>
        <p className="text-white mt-2 text-lg bg-blue-600 inline-block px-4 py-1 rounded-full font-semibold">
          Choose Your Level
        </p>
      </div>

      {/* Level Cards */}
      <div className="flex overflow-x-auto gap-6 px-6 pb-4 scrollbar-hide">
        {levels.map((level, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-56 bg-white rounded-xl shadow-xl p-4 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
            onClick={() => setSelectedLevel(level.title)} // ✅ set selected level
          >
            <img src={level.image} alt={level.title} className="w-28 h-28 object-contain mb-4" />
            <h2 className="text-xl font-semibold text-blue-700">{level.title}</h2>
          </div>
        ))}
      </div>

      {/* Bottom Navbar */}
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

function BottomNavbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-inner flex justify-around items-center py-3 px-4 z-40">
      <NavIcon label="Settings" icon="⚙️" />
      <NavIcon label="Sound" icon="🔊" />
      <NavIcon label="Home" icon="🏠" isActive />
      <NavIcon label="Favourites" icon="❤️" />
      <NavIcon label="Index" icon="📄" />
    </div>
  );
}

function NavIcon({ icon, label, isActive }) {
  return (
    <div className={`flex flex-col items-center ${isActive ? "text-blue-600" : "text-gray-600"}`}>
      <span className="text-2xl">{icon}</span>
      <span className="text-xs">{label}</span>
    </div>
  );
}
