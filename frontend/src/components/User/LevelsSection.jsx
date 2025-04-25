import React from "react";
import { useNavigate } from "react-router-dom";

const levels = [
  { title: "Level-1", image: "/images/level1.png" },
  { title: "Level-2", image: "/images/level2.png" },
  { title: "Level-3", image: "/images/level3.png" },
  { title: "Level-4", image: "/images/level4.png" },
];

export default function LevelsSection() {
  const navigate = useNavigate();

  const handleLevelClick = (levelTitle) => {
    const formattedLevel = levelTitle.toLowerCase().replace(/\s+/g, "-");
    navigate(`/user/${formattedLevel}`);
  };

  return (
    <>
      {/* Title */}
      <div className="text-center mt-4 mb-8">
        <h1 className="text-4xl font-bold text-white">Love To Read</h1>
        <p className="text-white mt-2 text-lg bg-blue-600 inline-block px-4 py-1 rounded-full font-semibold">
          Choose Your Level
        </p>
      </div>

      <div className="flex overflow-x-auto gap-6 px-6 pb-4 scrollbar-hide">
        {levels.map((level, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-56 bg-white rounded-xl shadow-xl p-4 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
            onClick={() => handleLevelClick(level.title)}
          >
            <img src={level.image} alt={level.title} className="w-28 h-28 object-contain mb-4" />
            <h2 className="text-xl font-semibold text-blue-700">{level.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
