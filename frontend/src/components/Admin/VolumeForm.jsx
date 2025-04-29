import { useState, useEffect } from 'react';
import { createVolume, getVolumes } from '../../api/api';
import { getLevels } from '../../api/api';
import React from "react";

const VolumeForm = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [levelId, setLevelId] = useState('');
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    const { data } = await getLevels();
    setLevels(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVolume({ name, level: levelId });
      setName('');
      setLevelId('');
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Create Volume</h2>
      <input
        type="text"
        placeholder="Name"
        className="border p-2 mb-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select
        className="border p-2 mb-2 w-full"
        value={levelId}
        onChange={(e) => setLevelId(e.target.value)}
        required
      >
        <option value="">Select Level</option>
        {levels.map((level) => (
          <option key={level._id} value={level._id}>
            {level.name}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Create
      </button>
    </form>
  );
};

export default VolumeForm;
