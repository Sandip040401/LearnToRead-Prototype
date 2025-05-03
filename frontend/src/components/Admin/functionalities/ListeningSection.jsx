import React from "react";
import { Video } from "lucide-react";

const ListeningSection = ({ selectedBook }) => {
  return (
    <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-white to-gray-100 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Video className="text-indigo-500" />
        <h2 className="text-2xl font-semibold text-gray-800">Listening Section</h2>
      </div>

      {selectedBook?.listening?.videoUrl ? (
        <div className="flex justify-center">
          <video
            src={selectedBook.listening.videoUrl}
            controls
            className="w-full max-w-2xl rounded-xl shadow-lg border border-gray-300"
          />
        </div>
      ) : (
        <p className="text-gray-600 italic text-center mt-4">
          🎧 No listening video available for this book.
        </p>
      )}
    </div>
  );
};

export default ListeningSection;
