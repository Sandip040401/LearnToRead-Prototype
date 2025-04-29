import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaBars, FaLayerGroup, FaBook, FaRegListAlt } from 'react-icons/fa';

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState({
    level: false,
    volume: false,
    book: false,
  });

  const location = useLocation();

  const toggleDropdown = (section) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // For active highlighting
  const isActive = (path) => location.pathname === path;

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-800 text-white transition-all duration-300 min-h-screen`}>
      {/* Top section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <Link to="/admin"><h1 className="text-lg font-bold">{sidebarOpen ? 'Admin' : 'A'}</h1></Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="focus:outline-none">
          <FaBars />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {/* Manage Levels */}
        <div>
          <button
            onClick={() => toggleDropdown('level')}
            className="flex items-center justify-between w-full text-left p-2 rounded hover:bg-gray-700"
          >
            <div className="flex items-center gap-2">
              <FaLayerGroup /> {sidebarOpen && 'Manage Levels'}
            </div>
            {sidebarOpen && (dropdownOpen.level ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />)}
          </button>
          {dropdownOpen.level && (
            <>
            <div className="ml-6 mt-2 space-y-2">
              <Link
                to="/admin/levels"
                className={`block p-2 rounded hover:bg-gray-700 ${isActive('/admin/levels') ? 'bg-gray-700' : ''}`}
              >
                Add Levels
              </Link>
            </div>
            <div className="ml-6 mt-2 space-y-2">
              <Link
                to="/admin/levels/view"
                className={`block p-2 rounded hover:bg-gray-700 ${isActive('/admin/levels/view') ? 'bg-gray-700' : ''}`}
              >
                View Levels
              </Link>
            </div>
            </>
          )}
        </div>

        {/* Manage Volumes */}
        <div>
          <button
            onClick={() => toggleDropdown('volume')}
            className="flex items-center justify-between w-full text-left p-2 rounded hover:bg-gray-700"
          >
            <div className="flex items-center gap-2">
              <FaRegListAlt /> {sidebarOpen && 'Manage Volumes'}
            </div>
            {sidebarOpen && (dropdownOpen.volume ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />)}
          </button>
          {dropdownOpen.volume && (
            <>
            <div className="ml-6 mt-2 space-y-2">
              <Link
                to="/admin/volumes"
                className={`block p-2 rounded hover:bg-gray-700 ${isActive('/admin/volumes') ? 'bg-gray-700' : ''}`}
              >
                Add Volumes
              </Link>
            </div>
            <div className="ml-6 mt-2 space-y-2">
              <Link
                to="/admin/volumes/view"
                className={`block p-2 rounded hover:bg-gray-700 ${isActive('/admin/volumes/view') ? 'bg-gray-700' : ''}`}
              >
                View Volumes
              </Link>
            </div>
            </>
          )}
        </div>

        {/* Manage Books */}
        <div>
          <button
            onClick={() => toggleDropdown('book')}
            className="flex items-center justify-between w-full text-left p-2 rounded hover:bg-gray-700"
          >
            <div className="flex items-center gap-2">
              <FaBook /> {sidebarOpen && 'Manage Books'}
            </div>
            {sidebarOpen && (dropdownOpen.book ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />)}
          </button>
          {dropdownOpen.book && (
            <>
            <div className="ml-6 mt-2 space-y-2">
              <Link
                to="/admin/books"
                className={`block p-2 rounded hover:bg-gray-700 ${isActive('/admin/books') ? 'bg-gray-700' : ''}`}
              >
                Add Books
              </Link>
            </div>
            <div className="ml-6 mt-2 space-y-2">
              <Link
                to="/admin/books/view"
                className={`block p-2 rounded hover:bg-gray-700 ${isActive('/admin/books/view') ? 'bg-gray-700' : ''}`}
              >
                View Books
              </Link>
            </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
