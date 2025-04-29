import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook, getVolumes, getLevels } from '../../api/api';

const BookForm = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [volumeId, setVolumeId] = useState('');
  const [levelId, setLevelId] = useState('');
  const [levels, setLevels] = useState([]);
  const [volumes, setVolumes] = useState([]);
  const [filteredVolumes, setFilteredVolumes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchLevels();
    fetchVolumes();
  }, []);

  const fetchLevels = async () => {
    const { data } = await getLevels();
    setLevels(data);
  };

  const fetchVolumes = async () => {
    const { data } = await getVolumes();
    setVolumes(data);
  };

  useEffect(() => {
    if (levelId) {
      const filtered = volumes.filter(vol => vol.level?._id === levelId);
      setFilteredVolumes(filtered);
      setVolumeId('');
    } else {
      setFilteredVolumes([]);
    }
  }, [levelId, volumes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBook({ title, volume: volumeId });
      setTitle('');
      setVolumeId('');
      setLevelId('');
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg relative">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Create Book</h2>

        <form onSubmit={handleSubmit}>
          {/* Book Title */}
          <input
            type="text"
            placeholder="Title"
            className="border p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Select Level */}
          <select
            className="border p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={levelId}
            onChange={(e) => setLevelId(e.target.value)}
            required
          >
            <option value="">Select Level</option>
            {levels.map((lvl) => (
              <option key={lvl._id} value={lvl._id}>
                {lvl.name}
              </option>
            ))}
          </select>

          {/* Select Volume */}
          <select
            className="border p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            value={volumeId}
            onChange={(e) => setVolumeId(e.target.value)}
            required
            disabled={!levelId}
          >
            <option value="">Select Volume</option>
            {filteredVolumes.length === 0 && levelId ? (
              <option disabled>No volumes available</option>
            ) : (
              filteredVolumes.map((vol) => (
                <option key={vol._id} value={vol._id}>
                  {vol.name}
                </option>
              ))
            )}
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
