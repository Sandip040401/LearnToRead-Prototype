import React from "react";
import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Admin Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Manage Levels, Volumes, and Books easily from here.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="/admin/books" className="w-full sm:w-auto">
            <button className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-md transition duration-300">
              Add New Book
            </button>
          </Link>

          <Link to="/admin/books/view" className="w-full sm:w-auto">
            <button className="w-full px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg shadow-md transition duration-300">
              Edit Existing Book
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
