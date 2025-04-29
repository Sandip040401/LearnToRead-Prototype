import { useEffect, useState } from 'react';
import { getVolumes, deleteVolume, updateVolume } from '../../api/api';
import { getLevels } from '../../api/api';
import React from "react";

const VolumeList = ({ refreshFlag }) => {
  const [volumes, setVolumes] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    fetchData();
  }, [refreshFlag]);

  const fetchData = async () => {
    const [volumesRes, levelsRes] = await Promise.all([
      getVolumes(),
      getLevels()
    ]);
    setVolumes(volumesRes.data);
    setLevels(levelsRes.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this volume?')) {
      await deleteVolume(id);
      fetchData();
    }
  };

  const handleMove = async (volumeId, newLevelId) => {
    await updateVolume(volumeId, { level: newLevelId });
    fetchData();
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">All Volumes</h2>
      <ul>
        {volumes.map((volume) => (
          <li key={volume._id} className="border-b p-2 flex justify-between items-center">
            <div>
              <p className="font-semibold">{volume.name}</p>
              {/* <p className="text-sm text-gray-500">Level ID: {volume.level}</p> */}
            </div>
            <div className="flex gap-2">
              <select
                onChange={(e) => handleMove(volume._id, e.target.value)}
                className="border p-1"
              >
                <option>Move to Level</option>
                {levels.map((lvl) => (
                  <option key={lvl._id} value={lvl._id}>
                    {lvl.name}
                  </option>
                ))}
              </select>
              <button onClick={() => handleDelete(volume._id)} className="text-red-500">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolumeList;
