import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeadphonesAlt, FaMicrophone, FaBookReader } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const bookDetailsData = {
  "Vowel-Sounds": {
    image: "/images/vowel.png",
    description: "This book consists of consonant and short vowel blends. Consonant and vowel blends are sounds that are introduced to the child in the initial stages of reading...",
  },
  "Consonant-Sounds": {
    image: "/images/consonant.png",
    description: "This book teaches the different consonant sounds in the English language...",
  },
  "Consonant-&-Vowel-Blends": {
    image: "/images/blends.png",
    description: "This book introduces blending of consonant and vowel sounds for early readers...",
  },
};

export default function BookDetails() {
  const { volumeId, bookTitle } = useParams();
  const navigate = useNavigate();

  const book = bookDetailsData[bookTitle] || {
    image: "/images/default.png",
    description: "Book description not available.",
  };

  return (
    <div className="flex h-screen bg-blue-200 relative font-[Comic Sans MS]">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-blue-300 p-4 rounded-r-3xl shadow-lg">
        <div className="text-white text-xl font-semibold mb-6">{volumeId}</div>
        {[1, 2, 3, 4].map((vol) => (
          <div
            key={vol}
            className={`cursor-pointer text-white text-lg mb-3 ${
              volumeId === `Volume-${vol}` ? "font-bold underline" : "opacity-80"
            }`}
          >
            Volume-{vol}
          </div>
        ))}
        {/* Footer Icons */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-2 text-white">
          <button>⚙️ Settings</button>
          <button>🔊 Sound</button>
          <button>🏠 Home</button>
          <button>❤️ Favourites</button>
          <button>📑 Index</button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-white m-4 rounded-3xl p-8 relative shadow-xl overflow-y-auto">
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <div className="flex">
            <img
              src={book.image}
              alt={bookTitle}
              className="w-40 h-56 rounded-lg shadow-md mr-6"
            />
            <div>
              <h2 className="text-3xl font-bold text-blue-700 mb-4">{bookTitle.replace(/-/g, " ")}</h2>
              <p className="text-blue-500 leading-relaxed max-w-2xl text-lg">{book.description}</p>
            </div>
          </div>
          <IoMdClose
            onClick={() => navigate(-1)}
            className="text-3xl text-gray-500 cursor-pointer hover:text-red-400"
          />
        </div>

        {/* Activities */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-center text-blue-600 mb-6">Activities</h3>
          <div className="flex justify-around text-blue-600 text-lg">
            <div className="flex flex-col items-center">
              <FaHeadphonesAlt className="text-3xl mb-2" />
              <span>Listening</span>
            </div>
            <div className="flex flex-col items-center">
              <FaMicrophone className="text-3xl mb-2" />
              <span>Speaking</span>
            </div>
            <div className="flex flex-col items-center">
              <FaBookReader className="text-3xl mb-2" />
              <span>Reading</span>
            </div>
            <div className="flex flex-col items-center">
              <MdEdit className="text-3xl mb-2" />
              <span>Writing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
