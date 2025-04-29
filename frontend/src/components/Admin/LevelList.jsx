import { useEffect, useState } from 'react';
import { getLevels, deleteLevel } from '../../api/api';
import React from "react";

const LevelList = ({ refreshFlag }) => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    fetchLevels();
  }, [refreshFlag]);

  const fetchLevels = async () => {
    const { data } = await getLevels();
    setLevels(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deleteLevel(id);
      fetchLevels();
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">All Levels</h2>
      <ul>
        {levels.map((level) => (
          <li key={level._id} className="border-b p-2 flex justify-between">
            <div>
              <p className="font-semibold">{level.name}</p>
              <p className="text-sm text-gray-500">{level.description}</p>
            </div>
            <button onClick={() => handleDelete(level._id)} className="text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LevelList;
