import React, { useEffect, useState } from 'react';
import { getBooks, getTemplates } from '../../api/api';
import ListeningSection from './functionalities/ListeningSection';
import SpeakingSection from './functionalities/SpeakingSection';
import ReadingSection from './functionalities/ReadingSection';
import WritingSection from './functionalities/WritingSection';

const BookEditor = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const booksRes = await getBooks();
      setBooks(booksRes.data);
      const templatesRes = await getTemplates();
      setTemplates(templatesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSelectBook = (e) => {
    const bookId = e.target.value;
    setSelectedBookId(bookId);
    const book = books.find((b) => b._id === bookId);
    setSelectedBook(book || null);
    setActiveTab('');
  };

  return (
    <div className="p-4">
      {/* Book Selection */}
      <div className="mb-4">
        <select
          value={selectedBookId}
          onChange={handleSelectBook}
          className="border p-2 w-full"
        >
          <option value="">Select a Book</option>
          {books.map((book) => (
            <option key={book._id} value={book._id}>
              {book.title}
            </option>
          ))}
        </select>
      </div>

      {/* Selected Book */}
      {selectedBook && (
        <div className="mb-8 p-4 border rounded shadow bg-white">
          <h2 className="text-xl font-bold mb-4">{selectedBook.title}</h2>
          {selectedBook.coverImage && (
            <div className="mb-4 flex justify-center">
              <img
                src={selectedBook.coverImage}
                alt="Cover"
                className="w-48 h-auto rounded shadow"
              />
            </div>
          )}
          {/* Removed video from here */}
        </div>
      )}

      {/* Buttons */}
      {selectedBookId && (
        <div className="flex gap-4 mb-8">
          {['listening', 'speaking', 'reading', 'writing'].map((func) => (
            <button
              key={func}
              onClick={() => setActiveTab(func)}
              className={`px-4 py-2 rounded ${
                activeTab === func ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}
            >
              {func.charAt(0).toUpperCase() + func.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Render the active section */}
      <div>
        {activeTab === 'listening' && (
          <ListeningSection
            selectedBook={selectedBook}
          />
        )}
        {activeTab === 'speaking' && (
          <SpeakingSection selectedBook={selectedBook} />
        )}
        {activeTab === 'reading' && (
          <ReadingSection selectedBook={selectedBook} templates={templates} />
        )}
        {activeTab === 'writing' && (
          <WritingSection selectedBook={selectedBook} />
        )}
      </div>
    </div>
  );
};

export default BookEditor;
