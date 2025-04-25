import React from "react";
import { Link } from "react-router-dom";

export default function BooksGrid({ books, volume, level}) {
  return books.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map((book, index) => (
        <Link
          to={`/book-details/${level}/${volume}/${book.title.replace(/\s+/g, "-")}`}
          key={index}
          className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition-transform"
        >
          <img
            src={book.image}
            alt={book.title}
            className="w-32 h-44 object-contain mb-3"
          />
          <h3 className="text-blue-700 font-bold text-center">{book.title}</h3>
        </Link>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 text-center mt-12">
      No books added yet for {volume}
    </p>
  );
}
