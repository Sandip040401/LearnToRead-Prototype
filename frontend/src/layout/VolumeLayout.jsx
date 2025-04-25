import React, { useState } from "react";

const booksData = {
  "Volume-1": [
    { title: "Vowel Sounds", image: "/images/vowel.png" },
    { title: "Consonant Sounds", image: "/images/consonant.png" },
    { title: "Consonant & Vowel Blends", image: "/images/blends.png" },
  ],
  "Volume-2": [],
  "Volume-3": [],
  "Volume-4": [],
};

export default function VolumeLayout({ level, children }) {
  const [selectedVolume, setSelectedVolume] = useState("Volume-1");

  return (
    <div className="p-6 h-[80vh] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-3xl font-bold">{level}</h1>
      </div>

      {/* Main Content (Fixed height, scrollable inside) */}
      <div className="flex flex-1 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Volume Selector (scrollable if many volumes) */}
        <div className="w-[200px] bg-blue-300 bg-opacity-70 p-4 overflow-y-auto">
          <div className="space-y-4 text-white font-semibold text-lg">
            {Object.keys(booksData).map((vol) => (
              <div
                key={vol}
                className={`cursor-pointer px-2 py-1 rounded-lg ${
                  selectedVolume === vol ? "bg-white text-black" : ""
                }`}
                onClick={() => setSelectedVolume(vol)}
              >
                {vol}
              </div>
            ))}
          </div>
        </div>

        {/* Children Content (scrollable if many children) */}
        <div className="flex-1 p-6 overflow-y-auto min-h-0">
          {children(booksData[selectedVolume], selectedVolume)}
        </div>
      </div>
    </div>
  );
}
