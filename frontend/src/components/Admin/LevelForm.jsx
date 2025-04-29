import { useState } from 'react';
import { createLevel } from '../../api/api';
import React from "react";

const LevelForm = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLevel({ name, description });
      setName('');
      setDescription('');
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Create Level</h2>
      <input
        type="text"
        placeholder="Name"
        className="border p-2 mb-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        className="border p-2 mb-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create
      </button>
    </form>
  );
};

export default LevelForm;
