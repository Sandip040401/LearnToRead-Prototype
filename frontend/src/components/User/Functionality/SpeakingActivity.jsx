import React from "react";
import { FaMicrophone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SpeakingActivity() {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={() => navigate("/speaking")}
    >
      <FaMicrophone className="text-3xl mb-2" />
      <span>Speaking</span>
    </div>
  );
}
