import React from "react";
import { FaBookReader } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ReadingActivity() {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={() => navigate("/reading")}
    >
      <FaBookReader className="text-3xl mb-2" />
      <span>Reading</span>
    </div>
  );
}
