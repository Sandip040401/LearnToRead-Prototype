import React, { useState } from 'react';

const ReadingSection = ({ templates }) => {
  const [pages, setPages] = useState([{ leftTemplate: '', rightTemplate: '' }]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const handleTemplateChange = (side, value) => {
    const updatedPages = [...pages];
    updatedPages[currentPageIndex] = {
      ...updatedPages[currentPageIndex],
      [side]: value,
    };
    setPages(updatedPages);
  };

  const handleAddPage = () => {
    setPages([...pages, { leftTemplate: '', rightTemplate: '' }]);
    setCurrentPageIndex(pages.length);
  };

  const handleNext = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const renderTemplatePreview = (templateName) => {
    switch (templateName) {
      case 'Short Vowel Words':
        return (
          <div className="text-center">
            <h4 className="font-semibold text-lg mb-2 text-indigo-600">Short Vowel Words (/e/ sound)</h4>
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              {['pen', 'hen', 'bed', 'net'].map(word => (
                <div key={word} className="bg-white border border-gray-300 shadow-sm px-3 py-2 rounded-lg">{word}</div>
              ))}
            </div>
            <img
              src="https://via.placeholder.com/100x100?text=Hen"
              alt="Hen"
              className="mx-auto rounded-md shadow"
            />
          </div>
        );
      case 'Sight Words':
        return (
          <div className="text-center">
            <h4 className="font-semibold text-lg mb-2 text-green-600">Sight Words</h4>
            <ul className="space-y-1">
              {['the', 'and', 'you', 'said'].map(word => (
                <li key={word} className="text-gray-700">{word}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return <p className="text-gray-400 italic">No Template Selected</p>;
    }
  };

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
          disabled={currentPageIndex === pages.length - 1}
          className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Two Page Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Page */}
        <div className="border rounded-lg p-5 bg-gray-50 shadow-sm">
          <h3 className="font-bold text-lg mb-3 text-indigo-700">Left Page</h3>
          <select
            value={pages[currentPageIndex]?.leftTemplate}
            onChange={(e) => handleTemplateChange('leftTemplate', e.target.value)}
            className="border border-gray-300 rounded w-full p-2 mb-4 focus:ring focus:ring-indigo-200"
          >
            <option value="">Select Template</option>
            {templates.map((template) => (
              <option key={template._id} value={template.name}>
                {template.name}
              </option>
            ))}
          </select>
          <div className="border rounded-lg h-64 bg-white flex items-center justify-center overflow-y-auto p-3">
            {renderTemplatePreview(pages[currentPageIndex]?.leftTemplate)}
          </div>
        </div>

        {/* Right Page */}
        <div className="border rounded-lg p-5 bg-gray-50 shadow-sm">
          <h3 className="font-bold text-lg mb-3 text-indigo-700">Right Page</h3>
          <select
            value={pages[currentPageIndex]?.rightTemplate}
            onChange={(e) => handleTemplateChange('rightTemplate', e.target.value)}
            className="border border-gray-300 rounded w-full p-2 mb-4 focus:ring focus:ring-indigo-200"
          >
            <option value="">Select Template</option>
            {templates.map((template) => (
              <option key={template._id} value={template.name}>
                {template.name}
              </option>
            ))}
          </select>
          <div className="border rounded-lg h-64 bg-white flex items-center justify-center overflow-y-auto p-3">
            {renderTemplatePreview(pages[currentPageIndex]?.rightTemplate)}
          </div>
        </div>
      </div>

      {/* Page Info */}
      <div className="text-center mt-6 text-sm text-gray-600">
        Page <span className="font-semibold">{currentPageIndex + 1}</span> of <span className="font-semibold">{pages.length}</span>
      </div>
    </div>
  );
};

export default ReadingSection;
