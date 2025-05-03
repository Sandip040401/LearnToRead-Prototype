import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/Admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Here the dynamic page content will come */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
