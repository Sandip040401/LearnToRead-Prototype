import { useState } from 'react';
import LevelForm from '../components/Admin/LevelForm';
import LevelList from '../components/Admin/LevelList';
import VolumeForm from '../components/Admin/VolumeForm';
import VolumeList from '../components/Admin/VolumeList';
import BookForm from '../components/Admin/BookForm';
import BookList from '../components/Admin/BookEditor';
import React from "react";


const AdminDashboard = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LevelForm onSuccess={handleRefresh} />
        <LevelList refreshFlag={refresh} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <VolumeForm onSuccess={handleRefresh} />
        <VolumeList refreshFlag={refresh} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <BookForm onSuccess={handleRefresh} />
        <BookList refreshFlag={refresh} />
      </div>
    </div>
  );
};

export default AdminDashboard;
