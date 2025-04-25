import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active route by comparing with location.pathname
  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-inner flex justify-around items-center py-3 px-4 z-40">
      <NavIcon label="Settings" icon="⚙️" path="/settings" isActive={isActive("/settings")} onClick={() => navigate("/settings")} />
      <NavIcon label="Sound" icon="🔊" path="/sound" isActive={isActive("/sound")} onClick={() => navigate("/sound")} />
      <NavIcon label="Home" icon="🏠" path="/user" isActive={isActive("/user")} onClick={() => navigate("/user")} />
      <NavIcon label="Favourites" icon="❤️" path="/favourites" isActive={isActive("/favourites")} onClick={() => navigate("/favourites")} />
      <NavIcon label="Index" icon="📄" path="/index" isActive={isActive("/index")} onClick={() => navigate("/index")} />
    </div>
  );
}

function NavIcon({ icon, label, onClick, isActive }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center focus:outline-none ${isActive ? "text-blue-600" : "text-gray-600"}`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs">{label}</span>
    </button>
  );
}
