import React, { useState } from "react";
import { FaHeadphonesAlt } from "react-icons/fa";
import Modal from "./VideoModal"; // Reusable modal component

export default function ListeningActivity() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <FaHeadphonesAlt className="text-3xl mb-2" />
        <span>Listening</span>
      </div>

      {open && (
        <Modal onClose={() => setOpen(false)} videoUrl="/videos/listening.mp4" />
      )}
    </>
  );
}
