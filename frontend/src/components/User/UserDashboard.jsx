import React, { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import LevelsSection from "./LevelsSection";
import VolumeBooks from "./VolumeBooks";

export default function UserDashboard() {
  const [selectedLevel, setSelectedLevel] = useState(null);

  if (selectedLevel) {
    return (
      <>
        <VolumeBooks level={selectedLevel} onClose={() => setSelectedLevel(null)} />
      </>
    );
  }

  return (
    <DashboardLayout>
      <LevelsSection onSelectLevel={setSelectedLevel} />
    </DashboardLayout>
  );
}
