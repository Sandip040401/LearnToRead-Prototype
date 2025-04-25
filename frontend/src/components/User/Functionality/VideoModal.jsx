import React from "react";
import { IoMdClose } from "react-icons/io";

export default function VideoModal({ onClose, videoUrl }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-xl shadow-lg relative w-11/12 max-w-2xl">
        <IoMdClose
          className="absolute top-3 right-3 text-2xl cursor-pointer text-gray-600 hover:text-red-400"
          onClick={onClose}
        />
        <video controls className="w-full rounded-lg mt-4">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
