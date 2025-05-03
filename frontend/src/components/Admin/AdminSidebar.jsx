import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaLayerGroup,
  FaBook,
  FaRegListAlt,
  FaSearch,
  FaPlus,
  FaEye
} from 'react-icons/fa';

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const isExactMatch = (path) => location.pathname === path;
  const isParentActive = (parentPath) => location.pathname.startsWith(parentPath + '/');

  const handleDropdownToggle = (key) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  const navItems = [
    {
      key: 'level',
      label: 'Manage Levels',
      icon: <FaLayerGroup />,
      basePath: '/admin/levels',
      links: [
        { path: '/admin/levels', label: 'Add Levels', icon: <FaPlus /> },
        { path: '/admin/levels/view', label: 'View Levels', icon: <FaEye /> },
      ],
    },
    {
      key: 'volume',
      label: 'Manage Volumes',
      icon: <FaRegListAlt />,
      basePath: '/admin/volumes',
      links: [
        { path: '/admin/volumes', label: 'Add Volumes', icon: <FaPlus /> },
        { path: '/admin/volumes/view', label: 'View Volumes', icon: <FaEye /> },
      ],
    },
    {
      key: 'book',
      label: 'Manage Books',
      icon: <FaBook />,
      basePath: '/admin/books',
      links: [
        { path: '/admin/books', label: 'Add Books', icon: <FaPlus /> },
        { path: '/admin/books/view', label: 'View Books', icon: <FaEye /> },
      ],
    },
  ];

  return (
    <div
      className={`${
        sidebarOpen ? 'w-64' : 'w-16'
      } bg-gradient-to-b from-indigo-400 to-purple-500 text-white transition-all duration-300 min-h-screen shadow-lg flex flex-col p-3 relative`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <Link to="/admin">
          <h1 className="text-xl font-bold tracking-wide text-black">
            {sidebarOpen ? 'Admin Panel' : 'A'}
          </h1>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-black hover:text-yellow-300 transition-colors"
        >
          <FaBars />
        </button>
      </div>

      {/* Search */}
      <div className={`mt-4 ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="flex items-center bg-white rounded-lg shadow-md">
          <FaSearch className="text-gray-600 ml-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full px-3 py-2 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 space-y-4">
        {navItems.map(({ key, label, icon, links, basePath }) => {
          const parentIsActive = isParentActive(basePath) || links.some((l) => isExactMatch(l.path));
          const isDropdownOpen = activeDropdown === key;

          return (
            <div key={key} className="relative group">
              <button
                onClick={() => handleDropdownToggle(key)}
                className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-md transition-all ${
                  parentIsActive ? 'bg-indigo-600' : 'hover:bg-indigo-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  {icon}
                  {sidebarOpen && <span className="font-medium">{label}</span>}
                </div>
                {sidebarOpen &&
                  (isDropdownOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />)}
              </button>

              {/* Dropdown for expanded sidebar */}
              {sidebarOpen && isDropdownOpen && (
                <div className="ml-6 mt-2 space-y-2">
                  {links.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-4 py-2 rounded-md text-sm flex items-center gap-3 transition-all hover:bg-indigo-600 ${
                        isExactMatch(link.path) ? 'bg-indigo-600 text-white' : ''
                      }`}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Dropdown box for collapsed sidebar */}
              {!sidebarOpen && isDropdownOpen && (
                <div className="absolute left-full top-0 ml-2 w-48 bg-white text-gray-800 rounded-md shadow-lg p-2 z-50 space-y-2">
                  {links.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-3 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-indigo-500 hover:text-white transition-all ${
                        isExactMatch(link.path) ? 'bg-indigo-500 text-white' : ''
                      }`}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
