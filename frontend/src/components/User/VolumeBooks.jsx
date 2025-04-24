import React, { useState } from "react";
import { Link } from "react-router-dom";

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

export default function VolumeBooks({ onClose, level }) {
  const [selectedVolume, setSelectedVolume] = useState("Volume-1");

  return (
    <div className="min-h-screen bg-[#8db3ff] p-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-3xl font-bold">{level}</h1>
        <button
          onClick={onClose}
          className="w-10 h-10 bg-blue-800 text-white text-2xl rounded-full shadow-md flex justify-center items-center"
        >
          ×
        </button>
      </div>

      {/* Main Content */}
      <div className="flex bg-white rounded-2xl shadow-xl overflow-hidden h-[75vh]">
        {/* Left Volume List */}
        <div className="w-[200px] bg-blue-300 bg-opacity-70 p-4 space-y-6 text-white font-semibold text-lg">
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

        {/* Right Books Grid */}
        <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {booksData[selectedVolume].length > 0 ? (
            booksData[selectedVolume].map((book, index) => (
              <Link
                to={`/book-details/${selectedVolume}/${book.title.replace(/\s+/g, "-")}`}
                key={index}
                className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition-transform"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-32 h-44 object-contain mb-3"
                />
                <h3 className="text-blue-700 font-bold text-center">{book.title}</h3>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center mt-12">
              No books added yet for {selectedVolume}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
