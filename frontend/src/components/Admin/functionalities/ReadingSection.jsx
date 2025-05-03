import React, { useState, useRef, useEffect  } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { Dialog } from "@headlessui/react";
import { FaVolumeUp, FaRegCommentDots, FaUpload } from 'react-icons/fa';
import { updateReading } from '../../../api/api';

const ReadingSection = ({ selectedBook }) => {
  const [pages, setPages] = useState([
    { template: '', image: null, sentence: '', audio: null, wordButtons: [] },
    { template: '', image: null, sentence: '', audio: null, wordButtons: [] },
  ]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(""); // "sentence" or "audio"
  const [activePageIndex, setActivePageIndex] = useState(null);
  const [tempSentence, setTempSentence] = useState("");
  const [tempAudio, setTempAudio] = useState(null);
  const [originalPages, setOriginalPages] = useState([]);

  const [dragMode, setDragMode] = useState(false);
  const [flipAudioButton, setFlipAudioButton] = useState(false);

  useEffect(() => {
    if (selectedBook && selectedBook.reading) {
      const mappedPages = selectedBook.reading.pages.map((page, index) => ({
        template: page.template || '',
        image: page.image?.url || null,
        sentence: page.sentence || '',
        sentenceX: page.sentenceX || 0,
        sentenceY: page.sentenceY || 0,
        audio: page.audio?.url || null,
        wordButtons: page.wordButtons.map((button) => ({
          id: button.id,
          x: button.x,
          y: button.y,
          audio: button.audio?.url ? new Audio(button.audio?.url) : null,
        })),
      }));
  
      setOriginalPages(mappedPages);  // Store original
      setPages(mappedPages);          // UI state
    }
  }, [selectedBook]);
  
  const handleSavePages = async () => {
    const formData = new FormData();
    formData.append("bookId", selectedBook._id);
  
    // Check if originalPages is empty or doesn't exist
    if (originalPages.length === 0) {
      // No original pages, directly use pages to create new data
      const newPages = pages.map((updatedPage, i) => {
        console.log(`Saving new page ${i}:`, updatedPage);
        return {
          template: updatedPage.template || "default-template",  // Add default if missing
          sentence: updatedPage.sentence || "",                   // Default sentence if missing
          sentenceX: updatedPage.sentenceX || 0,                  // Default X position
          sentenceY: updatedPage.sentenceY || 0,                  // Default Y position
          image: typeof updatedPage.image === 'string'
            ? updatedPage.image
            : null,  // If image is a string, use it, otherwise set to null
          imageKey: updatedPage.image && typeof updatedPage.image !== 'string'
            ? `page-${i}-image`
            : null,
          audio: typeof updatedPage.audio === 'string'
            ? updatedPage.audio
            : null,  // If audio is a string, use it, otherwise set to null
          audioKey: updatedPage.audio && typeof updatedPage.audio !== 'string'
            ? `page-${i}-audio`
            : null,
          wordButtons: (updatedPage.wordButtons || []).map((btn, j) => ({
            id: btn.id,
            x: btn.x || 0,  // Default X if missing
            y: btn.y || 0,  // Default Y if missing
            audio: typeof btn.audio === 'string'
              ? btn.audio
              : null,  // If button audio is a string, use it, otherwise set to null
            audioKey: btn.audio && typeof btn.audio !== 'string'
              ? `page-${i}-button-${j}`
              : null,
          })),
        };
      });
  
      console.log("New Pages (to be added):", newPages);
      formData.append("pages", JSON.stringify(newPages));
  
      // Now append the actual files (from `pages` array)
      pages.forEach((p, i) => {
        if (p.image && !(typeof p.image === 'string')) {
          formData.append(`page-${i}-image`, p.image);
        }
        if (p.audio && !(typeof p.audio === 'string')) {
          formData.append(`page-${i}-audio`, p.audio);
        }
        p.wordButtons.forEach((btn, j) => {
          if (btn.audio && !(typeof btn.audio === 'string')) {
            formData.append(`page-${i}-button-${j}`, btn.audio);
          }
        });
      });
  
      // Log FormData entries for inspection
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
  
      console.log("Pages after FormData:", pages);
  
      // Proceed with sending the formData to the backend
      await updateReading(formData);
      alert("New pages saved successfully!");
    } else {
      // Optionally, handle case where originalPages exist and need merging
      alert("There is original page data. Merging is not implemented.");
    }
  };
  
  const handleSaveSinglePage = async (index) => {
    const page = pages[index];
    const formData = new FormData();
    formData.append("bookId", selectedBook._id);
  
    const singlePage = {
      template: page.template || "default-template",
      sentence: page.sentence || "",
      sentenceX: page.sentenceX || 0,
      sentenceY: page.sentenceY || 0,
      image: typeof page.image === 'string' ? page.image : null,
      imageKey: page.image && typeof page.image !== 'string' ? `page-${index}-image` : null,
      audio: typeof page.audio === 'string' ? page.audio : null,
      audioKey: page.audio && typeof page.audio !== 'string' ? `page-${index}-audio` : null,
      wordButtons: (page.wordButtons || []).map((btn, j) => ({
        id: btn.id,
        x: btn.x || 0,
        y: btn.y || 0,
        audio: typeof btn.audio === 'string' ? btn.audio : null,
        audioKey: btn.audio && typeof btn.audio !== 'string' ? `page-${index}-button-${j}` : null,
      })),
    };
  
    formData.append("pageIndex", index); // indicate which page to update
    formData.append("page", JSON.stringify(singlePage));
  
    // Append files
    if (page.image && typeof page.image !== 'string') {
      formData.append(`page-${index}-image`, page.image);
    }
    if (page.audio && typeof page.audio !== 'string') {
      formData.append(`page-${index}-audio`, page.audio);
    }
    page.wordButtons.forEach((btn, j) => {
      if (btn.audio && typeof btn.audio !== 'string') {
        formData.append(`page-${index}-button-${j}`, btn.audio);
      }
    });
  
    try {
        // Log FormData before sending
  // for (let pair of formData.entries()) {
  //   console.log(`${pair[0]}:`, pair[1]);
  // }
      await updateReading(formData); // You may need to adjust the backend to accept single-page updates
      alert(`Page ${index + 1} saved successfully!`);
    } catch (error) {
      console.error("Error saving page:", error);
      alert("Error saving this page.");
    }
  };
  


  const getAudioSrc = (audio) => {
    if (!audio) return null;
  
    if (typeof audio === 'string') return audio;
  
    if (audio instanceof File || audio instanceof Blob) {
      return URL.createObjectURL(audio);
    }
  
    // Check if audio is an actual HTMLAudioElement
    if (audio instanceof HTMLAudioElement) {
      return audio.src;
    }
  
    // If React element or similar object
    if (audio?.props?.src) {
      return audio.props.src;
    }
  
    console.warn("Invalid audio object passed:", audio);
    return null;
  };
  

  // const getAudioSrc = (audio) => {
  //   if (!audio) return null;
  //   console.log(audio);
    
  //   if (typeof audio === 'string') return audio;
  
  //   if (audio instanceof File || audio instanceof Blob) {
  //     return URL.createObjectURL(audio);
  //   }
  
  //   console.warn("Invalid audio object passed:", audio);
  //   return null;
  // };
  

  const getImageSrc = (image) => {
    if (!image) return null;
    if (typeof image === 'string') {
      return image;
    }
    if (image instanceof Blob) {
      return URL.createObjectURL(image);
    }
    return null;
  };
    

const openDialog = (type, index) => {
  setDialogType(type);
  setActivePageIndex(index);
  if (type === "sentence") {
    setTempSentence(pages[index]?.sentence || "");
  } else if (type === "audio") {
    setTempAudio(pages[index]?.audio || null);
  }
  setIsDialogOpen(true);
};

const handleDialogSave = () => {
  const updatedPages = [...pages];
  if (dialogType === "sentence") {
    updatedPages[activePageIndex].sentence = tempSentence;
  } else if (dialogType === "audio") {
    updatedPages[activePageIndex].audio = tempAudio;
  }
  setPages(updatedPages);
  setIsDialogOpen(false);
};


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

  const handleWordAudioChange = (index, buttonId, file) => {
    const updatedPages = [...pages];
    const updatedButtons = updatedPages[index].wordButtons.map(button =>
      button.id === buttonId ? { ...button, audio: file } : button
    );
    updatedPages[index].wordButtons = updatedButtons;
    setPages(updatedPages);
  };
  const handleDeletePage = (indexToDelete) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      const updatedPages = pages.filter((_, i) => i !== indexToDelete);
      setPages(updatedPages);
  
      // Adjust currentPageIndex if needed
      if (currentPageIndex >= updatedPages.length) {
        setCurrentPageIndex(Math.max(0, updatedPages.length - 2));
      }
    }
  };
  
  const handleAddWordButton = (index) => {
    const updatedPages = [...pages];
    const newButton = { id: Date.now(), x: 50, y: 50, audio: null };
    updatedPages[index].wordButtons.push(newButton);
    setPages(updatedPages);
  };

  const handleDeleteWordButton = (pageIndex, buttonId) => {
    const updatedPages = [...pages];
    updatedPages[pageIndex].wordButtons = updatedPages[pageIndex].wordButtons.filter(btn => btn.id !== buttonId);
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
    if (currentPageIndex + 2 < pages.length) setCurrentPageIndex(currentPageIndex + 2);
  };

  const handlePrevious = () => {
    if (currentPageIndex >= 2) setCurrentPageIndex(currentPageIndex - 2);
  };

  const DraggableSentence = ({ page, dragMode }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: 'sentence' });
  
    const style = {
      transform: `translate(${transform?.x || 0}px, ${transform?.y || 0}px)`,
      position: 'absolute',
      left: page.sentenceX || 0,
      top: page.sentenceY || 0,
      zIndex: 20,
    };
  
    return (
      <div
        ref={setNodeRef}
        {...(dragMode ? listeners : {})}
        {...attributes}
        style={style}
        className="bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow-md max-w-[90%]"
      >
        <p className="text-black text-lg font-medium">{page.sentence}</p>
      </div>
    );
  };
  

  const handleSentenceDrag = (pageIndex, newPos) => {
    setPages(prev => {
      const updated = [...prev];
      updated[pageIndex] = {
        ...updated[pageIndex],
        sentenceX: newPos.x,
        sentenceY: newPos.y,
      };
      return updated;
    });
  };
  
  const renderPage = (page, index) => {
    return (
      <div key={index} className="relative flex flex-col items-center border rounded-xl bg-white shadow-lg overflow-hidden p-4 w-full">
        <h3 className="font-bold text-lg mb-4 text-indigo-600 text-center">Page {index + 1}</h3>

        {(page.template === 'sentence' || page.template === 'words') && (
          <div className="absolute top-4 left-4 flex flex-col space-y-2 bg-white p-2 rounded-lg shadow z-20">
            {page.template === 'sentence' && (
              <>
                <button onClick={() => openDialog('sentence', index)} className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg">
                  <FaRegCommentDots />
                </button>
                <button
                  onClick={() => setDragMode(prev => !prev)}
                  className={`p-2 rounded-lg ${dragMode ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`}
                >
                  {dragMode ? '🔓' : '🔒'}
                </button>
                <button
                  onClick={() => {
                    if (page.audio) {
                      // const audio = new Audio(URL.createObjectURL(page.audio));
                      const audio = new Audio(getAudioSrc(page.audio));
                      audio.play();
                    } else {
                      openDialog("audio", index);
                    }
                  }}
                  onDoubleClick={() => openDialog("audio", index)}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg"
                >
                  <FaUpload />
                </button>

              </>
            )}
            {page.template === 'words' && (
              <>
                <button onClick={() => handleAddWordButton(index)} className="bg-yellow-400 hover:bg-yellow-500 text-black p-2 rounded-lg">
                  <FaRegCommentDots />
                </button>
                <button
                  onClick={() => setDragMode(prev => !prev)}
                  className={`p-2 rounded-lg ${dragMode ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`}
                >
                  {dragMode ? '🔓' : '🔒'}
                </button>
                <button
                  onClick={() => setFlipAudioButton(prev => !prev)}
                  className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg"
                >
                  🔄
                </button>
              </>
            )}
          </div>
        )}

        <div className="w-full">
          <div className="mb-4 px-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Template</label>
            <select
              value={page.template}
              onChange={(e) => handleTemplateChange(index, e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-2 focus:ring focus:ring-indigo-300"
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
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>

          <div className="relative mx-auto" style={{ width: 'fit-content' }}>
            {page.image ? (
              <img
                // src={URL.createObjectURL(page.image)}
                src={getImageSrc(page.image)}
                alt="Background"
                className="block max-w-full max-h-[400px] rounded-lg shadow-md"
              />
            ) : (
              <div className="w-[300px] h-[400px] bg-gray-100 flex items-center justify-center text-gray-400 text-sm italic rounded-lg shadow-inner">
                No image selected
              </div>
            )}
            {page.template === 'sentence' && page.sentence && (
              <DndContext
                onDragEnd={({ active, delta }) => {
                  if (active.id === 'sentence') {
                    handleSentenceDrag(index, {
                      x: delta.x + (page.sentenceX || 0),
                      y: delta.y + (page.sentenceY || 0),
                    });
                  }
                }}
              >
                <DraggableSentence page={page} dragMode={dragMode} />
              </DndContext>

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
                    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: btn.id.toString() });
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
                        <input
                          ref={inputRef}
                          type="file"
                          accept="audio/*"
                          onChange={(e) => handleWordAudioChange(index, btn.id, e.target.files[0])}
                          className="hidden"
                        />

                        <div
                          onMouseDown={(e) => e.stopPropagation()}
                          className="group relative inline-block"
                        >
                          <button
                            onClick={() => {
                              if (!dragMode && btn.audio) {
                                // const audio = new Audio(URL.createObjectURL(btn.audio));
                                const audio = new Audio(getAudioSrc(btn.audio));
                                audio.play();
                              }
                            }}
                            onDoubleClick={() => inputRef.current?.click()}
                            className={`${
                              btn.audio ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-800 hover:bg-gray-900'
                            } text-white p-2 rounded-full shadow-md`}
                          >
                            <FaVolumeUp
                              className={`transition-transform duration-300 ${
                                flipAudioButton ? 'rotate-180' : ''
                              } ${btn.x < window.innerWidth / 2 ? 'scale-x-[-1]' : 'scale-x-100'}`}
                            />
                          </button>
                          <button
                            onClick={() => handleDeleteWordButton(index, btn.id)}
                            className="absolute -top-2 -right-2 hidden group-hover:flex items-center justify-center bg-red-600 hover:bg-red-700 text-white text-xs p-1 rounded-full shadow"
                            title="Delete"
                          >
                            ❌
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
    );
  };

  const leftPage = pages[currentPageIndex];
  const rightPage = pages[currentPageIndex + 1];

  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow-lg max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {leftPage && (
          <div className="space-y-4">
            {renderPage(leftPage, currentPageIndex)}
            <button
              onClick={() => handleSaveSinglePage(currentPageIndex)}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow"
            >
              Save This Page
            </button>
          </div>
        )}
        {rightPage && (
          <div className="space-y-4">
            {renderPage(rightPage, currentPageIndex + 1)}
            <button
              onClick={() => handleSaveSinglePage(currentPageIndex + 1)}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow"
            >
              Save This Page
            </button>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-50">
  <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
  <div className="fixed inset-0 flex items-center justify-center p-4">
    <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg space-y-4">
      <Dialog.Title className="text-lg font-semibold">
        {dialogType === "sentence" ? "Edit Sentence" : "Upload Audio"}
      </Dialog.Title>

      {dialogType === "sentence" && (
        <textarea
          className="w-full border rounded-lg p-2"
          rows={4}
          value={tempSentence}
          onChange={(e) => setTempSentence(e.target.value)}
          placeholder="Type your sentence..."
        />
      )}

      {dialogType === "audio" && (
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setTempAudio(e.target.files[0])}
        />
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <button
          onClick={() => setIsDialogOpen(false)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleDialogSave}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
        >
          Save
        </button>
      </div>
    </Dialog.Panel>
  </div>
</Dialog>

      <div className="flex justify-between items-center mt-6">
  <button onClick={handlePrevious} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow">
    Previous
  </button>
  <div className="flex space-x-2 items-center ml-4 flex-wrap">
  {pages.map((_, index) => (
    <div key={index} className="relative group">
      <button
        onClick={() => setCurrentPageIndex(index % 2 === 0 ? index : index - 1)}
        className={`px-3 py-1 rounded-full text-sm ${
          index === currentPageIndex || index === currentPageIndex + 1
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        {index + 1}
      </button>

      <button
        onClick={() => handleDeletePage(index)}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center hover:bg-red-600"
        title="Delete Page"
      >
        ×
      </button>
    </div>
  ))}
</div>

  <button onClick={handleAddPage} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow">
    + Add Page
  </button>
  <button onClick={handleNext} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow">
    Next
  </button>
  <button
    onClick={handleSavePages}
    className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
  >
    Save
  </button>
</div>
    </div>
  );
};

export default ReadingSection;
