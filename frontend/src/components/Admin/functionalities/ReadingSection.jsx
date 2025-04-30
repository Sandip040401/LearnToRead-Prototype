import React, { useState,useRef  } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { Dialog } from "@headlessui/react"; // Import Headless UI dialog for modals
import { FaVolumeUp, FaRegCommentDots, FaUpload } from 'react-icons/fa';

const ReadingSection = ({ templates }) => {
  const [pages, setPages] = useState([
    { template: '', image: null, sentence: '', audio: null, wordButtons: [] },
    { template: '', image: null, sentence: '', audio: null, wordButtons: [] },
  ]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [dragMode, setDragMode] = useState(false);

  const openDialog = (content) => {
    setDialogContent(content);
    setDialogOpen(true);
  };

  const closeDialog = () => setDialogOpen(false);
  const handleTemplateChange = (index, value) => {
    const updatedPages = [...pages];
    updatedPages[index] = {
      template: value,
      image: updatedPages[index].image,
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

  const handleWordAudioChange = (index, buttonId, file) => {
    const updatedPages = [...pages];
    const updatedButtons = updatedPages[index].wordButtons.map(button =>
      button.id === buttonId ? { ...button, audio: file } : button
    );
    updatedPages[index].wordButtons = updatedButtons;
    setPages(updatedPages);
  };

  const handleAddWordButton = (index) => {
    const updatedPages = [...pages];
    const newButton = { id: Date.now(), x: 50, y: 50, audio: null };
    updatedPages[index].wordButtons.push(newButton);
    setPages(updatedPages);
  };

  const handleDragEnd = (index, buttonId, data) => {
    const updatedPages = [...pages];
    updatedPages[index].wordButtons = updatedPages[index].wordButtons.map(button =>
      button.id === buttonId ? { ...button, x: data.x, y: data.y } : button
    );
    setPages(updatedPages);
  };

  const handleAddPage = () => {
    setPages([...pages, { template: '', image: null, sentence: '', audio: null, wordButtons: [] }]);
  };

  const handleNext = () => {
    if (currentPageIndex + 2 < pages.length) {
      setCurrentPageIndex(currentPageIndex + 2);
    }
  };

  const handlePrevious = () => {
    if (currentPageIndex >= 2) {
      setCurrentPageIndex(currentPageIndex - 2);
    }
  };

  const renderPage = (page, index) => {
    const isLeftPage = index % 2 === 0;

    return (
      <div key={index} className="relative flex flex-col items-center border rounded-lg bg-white shadow-sm overflow-hidden p-4">
        <h3 className="font-bold text-lg mb-3 text-indigo-700 text-center">Page {index + 1}</h3>

        <div className="flex relative w-full justify-center">
        {(page.template === 'sentence' || page.template === 'words') && (
        <>
          {/* Icon for sentence input */}
          {page.template === 'sentence' && (
            <>
              <button onClick={() => openDialog('sentence')} className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded shadow">
                <FaRegCommentDots />
              </button>

              <button onClick={() => openDialog('audio')} className="bg-green-500 hover:bg-green-600 text-white p-2 rounded shadow">
                <FaUpload />
              </button>

              {/* Dialog for inputting sentence */}
              <Dialog open={isDialogOpen && dialogContent === 'sentence'} onClose={closeDialog}>
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-75" />
                <Dialog.Content className="fixed p-6 bg-white rounded shadow-xl top-2 right-2">
                  <label className="cursor-pointer">
                    Input Sentence
                    <input
                      type="text"
                      value={page.sentence || ''}
                      onChange={(e) => handleSentenceChange(index, e.target.value)}
                      placeholder="Type here..."
                      className="ml-2 p-1 rounded text-black border border-gray-300"
                    />
                  </label>
                  <button onClick={closeDialog} className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow">Close</button>
                </Dialog.Content>
              </Dialog>

              {/* Dialog for uploading audio */}
              <Dialog open={isDialogOpen && dialogContent === 'audio'} onClose={closeDialog}>
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-75" />
                <Dialog.Content className="fixed p-6 bg-white rounded shadow-xl top-2 right-2">
                  <label className="cursor-pointer">
                    Upload Audio
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => handleAudioChange(index, e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                  <button onClick={closeDialog} className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow">Close</button>
                </Dialog.Content>
              </Dialog>

              {page.audio && (
                <audio controls className="mt-1 w-full">
                  <source src={URL.createObjectURL(page.audio)} type="audio/mpeg" />
                </audio>
              )}
            </>
          )}

          {/* Icon for words generation */}
          {page.template === 'words' && (
            <button onClick={() => handleAddWordButton(index)} className="bg-yellow-500 hover:bg-yellow-600 text-black p-2 rounded shadow">
              <FaRegCommentDots />
            </button>
          )}
          {page.template === 'words' && (
            <button
            onClick={() => setDragMode(prev => !prev)}
            className={`ml-2 px-4 py-2 rounded ${dragMode ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
          >
            {dragMode ? 'Disable Drag' : 'Enable Drag'}
          </button>
          
          )}
        </>
      )}


          <div className="relative">
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


              {page.template === 'words' && (
                <DndContext
                  onDragEnd={({ active, delta }) => {
                    handleDragEnd(index, parseInt(active.id), {
                      x: delta.x + (page.wordButtons.find(b => b.id === parseInt(active.id))?.x || 0),
                      y: delta.y + (page.wordButtons.find(b => b.id === parseInt(active.id))?.y || 0),
                    });
                  }}
                >
                  {page.wordButtons?.map((btn) => {
                    const DraggableBtn = () => {
                      const { attributes, listeners, setNodeRef, transform } = useDraggable({
                        id: btn.id.toString(),
                      });

                      const inputRef = useRef(null);

                      const style = {
                        transform: `translate(${transform?.x || 0}px, ${transform?.y || 0}px)`,
                        position: 'absolute',
                        left: btn.x,
                        top: btn.y,
                        zIndex: 10,
                      };

                      return (
                        <div ref={setNodeRef} {...(dragMode ? listeners : {})} {...attributes} style={style}>


                          {/* Hidden File Input */}
                          <div onMouseDown={(e) => e.stopPropagation()}>
                            <input
                              ref={inputRef}
                              type="file"
                              accept="audio/*"
                              onChange={(e) => handleWordAudioChange(index, btn.id, e.target.files[0])}
                              className="mb-1 w-20 text-[10px] hidden"
                            />
                          </div>

                          {/* Audio Play + Double-click to Upload */}
                          <div onMouseDown={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => {
                                if (!dragMode && btn.audio) {
                                  const audio = new Audio(URL.createObjectURL(btn.audio));
                                  audio.play();
                                }
                              }}
                              onDoubleClick={() => {
                                if (inputRef.current) inputRef.current.click();
                              }}
                              className={`${
                                btn.audio ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-800 hover:bg-gray-900'
                              } text-white p-2 rounded-full shadow mt-1`}
                              
                            >
                              <FaVolumeUp
                                className={`transform ${
                                  btn.x < window.innerWidth / 2 ? 'scale-x-[-1]' : 'scale-x-100'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      );
                    };
                    return <DraggableBtn key={btn.id} />;
                  })}
                </DndContext>
              )}


            </div>
          </div>
        </div>
      </div>
    );
  };

  const leftPage = pages[currentPageIndex];
  const rightPage = pages[currentPageIndex + 1];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto">
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
          disabled={currentPageIndex + 2 >= pages.length}
          className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {leftPage && renderPage(leftPage, currentPageIndex)}
        {rightPage && renderPage(rightPage, currentPageIndex + 1)}
      </div>

      <div className="text-center mt-6 text-sm text-gray-600">
        Showing pages <span className="font-semibold">{currentPageIndex + 1}</span> &{' '}
        <span className="font-semibold">{currentPageIndex + 2}</span> of{' '}
        <span className="font-semibold">{pages.length}</span>
      </div>
    </div>
  );
};

export default ReadingSection;
