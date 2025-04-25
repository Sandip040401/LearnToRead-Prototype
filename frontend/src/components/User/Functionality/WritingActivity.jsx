import React from "react";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function WritingActivity() {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={() => navigate("/writing")}
    >
      <MdEdit className="text-3xl mb-2" />
      <span>Writing</span>
    </div>
  );
}
