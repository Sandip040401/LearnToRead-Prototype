import { useParams } from "react-router-dom";
import VolumeLayout from "../../layout/VolumeLayout";
import BookDetails from "./BookDetails";
import DashboardLayout from "../../layout/DashboardLayout";
import React from "react";

function BookDetailsWrapper() {
  const { level, volumeId } = useParams();
    console.log(level);
    
  return (
    <DashboardLayout>
      <VolumeLayout level={level}>
        {(books, selectedVolume) => (
          <BookDetails books={books} selectedVolume={selectedVolume} />
        )}
      </VolumeLayout>
    </DashboardLayout>
  );
}

export default BookDetailsWrapper