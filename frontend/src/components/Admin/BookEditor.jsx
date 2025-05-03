import React, { useEffect, useState } from 'react';
import { getBooks } from '../../api/api';
import ListeningSection from './functionalities/ListeningSection';
import SpeakingSection from './functionalities/SpeakingSection';
import ReadingSection from './functionalities/ReadingSection';
import WritingSection from './functionalities/WritingSection';
import { Headphones, Mic, BookOpen, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BookEditor = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const booksRes = await getBooks();
      setBooks(booksRes.data);
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
    <div className="p-6 bg-gradient-to-tr from-purple-100 to-blue-100 min-h-screen">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-800">📚 Book Editor</h1>
        <p className="text-gray-600 mt-1">Manage and customize book sections interactively</p>
      </div>

      {/* Book Selector */}
      <div className="max-w-xl mx-auto mb-6">
        <select
          value={selectedBookId}
          onChange={handleSelectBook}
          className="w-full px-4 py-3 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
        >
          <option value="">Select a Book</option>
          {books.map((book) => (
            <option key={book._id} value={book._id}>
              {book.title}
            </option>
          ))}
        </select>
      </div>

      {/* Book Card */}
      {selectedBook && (
        <div className="max-w-4xl mx-auto mb-8 bg-white shadow-lg rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <img
              src={selectedBook.coverImage}
              alt="Cover"
              className="w-48 h-auto mx-auto rounded-lg shadow"
            />
            <div>
              <h2 className="text-2xl font-bold text-purple-700">{selectedBook.title}</h2>
              <p className="text-sm text-gray-600 mt-2">Book ID: {selectedBook._id}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Buttons */}
      {selectedBookId && (
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {[
            { key: 'listening', label: 'Listening', icon: <Headphones className="w-5 h-5" />, color: 'bg-indigo-500' },
            { key: 'speaking', label: 'Speaking', icon: <Mic className="w-5 h-5" />, color: 'bg-pink-500' },
            { key: 'reading', label: 'Reading', icon: <BookOpen className="w-5 h-5" />, color: 'bg-emerald-500' },
            { key: 'writing', label: 'Writing', icon: <PenTool className="w-5 h-5" />, color: 'bg-yellow-500' }
          ].map(({ key, label, icon, color }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full shadow-md text-white transition-transform duration-200 transform hover:scale-105 ${
                activeTab === key ? `${color}` : 'bg-gray-400'
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Render Active Tab Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'listening' && <ListeningSection selectedBook={selectedBook} />}
          {activeTab === 'speaking' && <SpeakingSection selectedBook={selectedBook} />}
          {activeTab === 'reading' && (
            <ReadingSection selectedBook={selectedBook} />
          )}
          {activeTab === 'writing' && <WritingSection selectedBook={selectedBook} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BookEditor;
