import React from "react";
import VolumeLayout from "../../layout/VolumeLayout";
import BooksGrid from "./BooksGrid";

export default function VolumeBooks({ level }) {
  
  return (
    <VolumeLayout level={level}>
      {(books, selectedVolume) => (
        <BooksGrid books={books} volume={selectedVolume} level={level}/>
      )}
    </VolumeLayout>
  );
}
