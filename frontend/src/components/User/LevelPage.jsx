import React from "react";
import { useParams } from "react-router-dom";
import VolumeBooks from "./VolumeBooks";

export default function LevelPage() {
  const { level } = useParams();
  const formattedLevel = level.replace(/-/g, " "); // e.g., 'level-1' → 'level 1'

  return (
    <VolumeBooks level={formattedLevel} />
  );
}
