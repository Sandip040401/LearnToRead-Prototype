import React, { useState } from 'react';

const ReadingSection = ({ templates }) => {
  const [pages, setPages] = useState([
    { template: '', image: null },
    { template: '', image: null },
  ]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const handleTemplateChange = (index, value) => {
    const updatedPages = [...pages];
    updatedPages[index] = {
      ...updatedPages[index],
      template: value,
      sentence: '',
      audio: null,
      wordButtons: [],
    };
    setPages(updatedPages);
  };

  const handleImageChange = (index, file) => {
    const updatedPages = [...pages];
    updatedPages[index].image = file;
    setPages(updatedPages);
  };

  const handleSentenceChange = (index, sentence) => {
    const updatedPages = [...pages];
    updatedPages[index].sentence = sentence;
    setPages(updatedPages);
  };

  const handleAudioChange = (index, file) => {
    const updatedPages = [...pages];
    updatedPages[index].audio = file;
    setPages(updatedPages);
  };

  const handleAddWordButton = (index) => {
    const updatedPages = [...pages];
    const newButton = { id: Date.now(), x: 50, y: 50 };
    if (!updatedPages[index].wordButtons) updatedPages[index].wordButtons = [];
    updatedPages[index].wordButtons.push(newButton);
    setPages(updatedPages);
  };

  const handleDragEnd = (index, buttonId, e) => {
    const updatedPages = [...pages];
    const container = e.target.offsetParent;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    updatedPages[index].wordButtons = updatedPages[index].wordButtons.map(button =>
      button.id === buttonId ? { ...button, x, y } : button
    );
    setPages(updatedPages);
  };

  const handleAddPage = () => {
    setPages([...pages, { template: '', image: null }]);
  };

  const handleNext = () => {
    if (currentPageIndex + 1 < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const renderPage = (page, index) => {
    const isLeftPage = index % 2 === 0;
  
    return (
      <div key={index} className="relative flex flex-col items-stretch border rounded-lg bg-white shadow-sm overflow-hidden">
        <h3 className="font-bold text-lg mb-3 text-indigo-700 text-center">Page {index + 1}</h3>
  
        <div className="mb-4 px-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Template</label>
          <select
            value={page.template}
            onChange={(e) => handleTemplateChange(index, e.target.value)}
            className="border border-gray-300 rounded w-full p-2 focus:ring focus:ring-indigo-200"
          >
            <option value="">Select Template</option>
            <option value="background">Background Only</option>
            <option value="sentence">Sentence</option>
            <option value="words">Words</option>
          </select>
        </div>
  
        <div className="mb-4 px-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Background Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(index, e.target.files[0])}
            className="w-full"
          />
        </div>
  
        <div className="relative mx-auto" style={{ width: 'fit-content' }}>
          {page.image ? (
            <img
              src={URL.createObjectURL(page.image)}
              alt="Background"
              className="block max-w-full max-h-[400px] rounded"
            />
          ) : (
            <div className="w-[300px] h-[400px] bg-gray-100 flex items-center justify-center text-gray-400 text-sm italic">
              No image selected
            </div>
          )}
  
          <div className="absolute inset-0 p-4">
            {page.template === 'sentence' && (
              <div className={`flex flex-col gap-2 items-${isLeftPage ? 'start' : 'end'}`}>
                <input
                  type="text"
                  value={page.sentence || ''}
                  onChange={(e) => handleSentenceChange(index, e.target.value)}
                  placeholder="Enter sentence"
                  className="border rounded p-2 w-full max-w-xs"
                />
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleAudioChange(index, e.target.files[0])}
                  className="w-full max-w-xs"
                />
              </div>
            )}
  
            {page.template === 'words' && (
              <div className="relative w-full h-full">
                {page.wordButtons?.map((btn) => (
                  <button
                    key={btn.id}
                    style={{ position: 'absolute', top: btn.y, left: btn.x }}
                    className="px-2 py-1 bg-yellow-400 rounded shadow cursor-move"
                    draggable
                    onDragEnd={(e) => handleDragEnd(index, btn.id, e)}
                  >
                    🔊
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
  
        {/* Generate Button Outside the White Area */}
        {page.template === 'words' && (
          <div
            className={`absolute top-2 ${isLeftPage ? '-left-40' : '-right-40'} z-10`}
          >
            <button
              onClick={() => handleAddWordButton(index)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Generate Word Button
            </button>
          </div>
        )}
      </div>
    );
  };
  
  


  const leftPage = pages[currentPageIndex];
  const rightPage = pages[currentPageIndex + 1];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrevious}
          disabled={currentPageIndex === 0}
          className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleAddPage}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Add Page
        </button>
        <button
          onClick={handleNext}
          disabled={currentPageIndex + 1 >= pages.length}
          className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Display two pages (like a book spread) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {leftPage && renderPage(leftPage, currentPageIndex)}
        {rightPage && renderPage(rightPage, currentPageIndex + 1)}
      </div>

      {/* Page Info */}
      <div className="text-center mt-6 text-sm text-gray-600">
        Showing pages <span className="font-semibold">{currentPageIndex + 1}</span> & <span className="font-semibold">{currentPageIndex + 2}</span> of <span className="font-semibold">{pages.length}</span>
      </div>
    </div>
  );
};

export default ReadingSection;
