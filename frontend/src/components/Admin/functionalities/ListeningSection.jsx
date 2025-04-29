import React from "react";

const ListeningSection = ({ selectedBook }) => {
  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-4">Listening Section</h2>
      {selectedBook?.listening?.videoUrl ? (
        <div className="flex justify-center">
          <video
            src={selectedBook.listening.videoUrl}
            controls
            className="w-full max-w-md rounded shadow"
          />
        </div>
      ) : (
        <p>No listening video available.</p>
      )}
    </div>
  );
};

export default ListeningSection;
