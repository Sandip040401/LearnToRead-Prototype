import Book from "../models/book.js";
import Volume from "../models/volume.js";


// Create a new Book
export const createBook = async (req, res) => {
  try {
    const { title, volume, listening, speaking, reading, writing } = req.body;
    
    const foundVolume = await Volume.findById(volume);
    if (!foundVolume) return res.status(404).json({ message: 'Volume not found' });

    const book = new Book({
      title,
      volume: volume,
      listening,
      speaking,
      reading,
      writing,
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create book', error: error.message });
  }
};

// Get all Books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('volume');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books', error: error.message });
  }
};

// Get single Book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('volume');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch book', error: error.message });
  }
};

// Update Book
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update book', error: error.message });
  }
};

// Move Book to another Volume
export const moveBookToAnotherVolume = async (req, res) => {
  try {
    const { newVolumeId } = req.body;
    
    const volume = await Volume.findById(newVolumeId);
    if (!volume) return res.status(404).json({ message: 'New Volume not found' });

    const book = await Book.findByIdAndUpdate(req.params.id, { volume: newVolumeId }, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ message: 'Book moved successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Failed to move book', error: error.message });
  }
};

// Delete Book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete book', error: error.message });
  }
};


// Update Cover Image
export const updateCoverImage = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, { coverImage: req.fileUrl }, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Cover image updated successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update cover image', error: error.message });
  }
};

// Update Listening Video
export const updateListeningVideo = async (req, res) => {
  try {
    // const { videoUrl } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { 'listening.videoUrl': req.fileUrl },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Listening video updated successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update listening video', error: error.message });
  }
};

// Update Speaking Section
export const updateSpeakingSection = async (req, res) => {
  try {
    const { sentence } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { 
        'speaking.sentence': sentence,
        'speaking.imageUrl': req.fileUrl
      },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Speaking section updated successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update speaking section', error: error.message });
  }
};

// Update Writing PDF
export const updateWritingPdf = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { 'writing.pdfDownloadUrl': req.fileUrl },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Writing PDF updated successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update writing PDF', error: error.message });
  }
};



// export const addReadingPages = async (req, res) => {
//   try {
//     const { bookId, pages } = req.body;
    
//     if (!bookId || !pages) {
//       return res.status(400).json({ message: 'bookId and pages are required.' });
//     }

//     const parsedPages = JSON.parse(pages); // parse incoming JSON string
//     const uploadedFilesMap = {};
    
//     // Map uploaded files to their fieldname
//     for (const file of req.uploadedFiles) {
//       uploadedFilesMap[file.fieldname] = file.url;
//     }

//     // Construct reading.pages using parsed data + uploaded file URLs
//     const readingPages = parsedPages.map((page) => {
//       const imageUrl = uploadedFilesMap[page.imageKey] || null;
//       const audioUrl = page.audioKey ? uploadedFilesMap[page.audioKey] : null;

//       const wordButtons = page.wordButtons.map((btn) => {
//         return uploadedFilesMap[btn.audioKey] || null;
//       });

//       return {
//         template: page.template,
//         sentence: page.sentence || '',
//         audio: {
//           url: audioUrl
//         },
//         image: {
//           url: imageUrl,
//           alt: ''
//         },
//         wordButtons
//       };
//     });

//     const book = await Book.findById(bookId);
//     if (!book) return res.status(404).json({ message: 'Book not found.' });
    
//     book.reading.pages = readingPages;
//     await book.save();

//     return res.status(200).json({ message: 'Reading pages updated successfully.' });
//   } catch (error) {
//     console.error('Error adding reading pages:', error);
//     return res.status(500).json({ message: 'Server error.', error: error.message });
//   }
// };

// export const addReadingPages = async (req, res) => {
//   try {
//     const { bookId, page, pageIndex } = req.body;

//     if (!bookId || pageIndex === undefined || !page) {
//       return res.status(400).json({ message: 'bookId, pageIndex, and page are required.' });
//     }

//     const parsedPage = typeof page === 'string' ? JSON.parse(page) : page;

//     const uploadedFilesMap = {};
//     for (const file of req.uploadedFiles || []) {
//       uploadedFilesMap[file.fieldname] = file.url;
//     }

//     const imageUrl = uploadedFilesMap[parsedPage.imageKey] || null;
//     const audioUrl = parsedPage.audioKey ? uploadedFilesMap[parsedPage.audioKey] : null;

//     const wordButtons = (parsedPage.wordButtons || []).map((btn, index) => ({
//       id: btn.id ?? index + 1,
//       x: btn.x,
//       y: btn.y,
//       audio: {
//         url: uploadedFilesMap[btn.audioKey] || null
//       }
//     }));

//     const newPage = {
//       template: parsedPage.template,
//       sentence: parsedPage.sentence || '',
//       sentenceX: parsedPage.sentenceX || 0,
//       sentenceY: parsedPage.sentenceY || 0,
//       audio: { url: audioUrl },
//       image: {
//         url: imageUrl,
//         alt: parsedPage.imageAlt || ''
//       },
//       wordButtons
//     };

//     const book = await Book.findById(bookId);
//     if (!book) return res.status(404).json({ message: 'Book not found.' });

//     if (!book.reading.pages) {
//       book.reading.pages = [];
//     }

//     book.reading.pages[pageIndex] = newPage;

//     await book.save();

//     return res.status(200).json({ message: `Page ${pageIndex + 1} saved successfully.` });
//   } catch (error) {
//     console.error('Error updating single reading page:', error);
//     return res.status(500).json({ message: 'Server error.', error: error.message });
//   }
// };



export const addReadingPages = async (req, res) => {
  try {
    const { bookId, page, pageIndex } = req.body;

    if (!bookId || pageIndex === undefined || !page) {
      return res.status(400).json({ message: 'bookId, pageIndex, and page are required.' });
    }

    const parsedPage = typeof page === 'string' ? JSON.parse(page) : page;

    const uploadedFilesMap = {};
    for (const file of req.uploadedFiles || []) {
      uploadedFilesMap[file.fieldname] = file.url;
    }

    const imageUrl = uploadedFilesMap[parsedPage.imageKey];
    const audioUrl = parsedPage.audioKey ? uploadedFilesMap[parsedPage.audioKey] : undefined;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found.' });

    if (!book.reading.pages) {
      book.reading.pages = [];
    }

    const existingPage = book.reading.pages[pageIndex] || {};
    const existingButtons = existingPage.wordButtons || [];

    const wordButtons = (parsedPage.wordButtons || []).map((btn, index) => {
      const existingBtn = existingButtons.find((b) => b.id === btn.id);
      const uploadedUrl = uploadedFilesMap[btn.audioKey];

      return {
        id: btn.id ?? index + 1,
        x: btn.x,
        y: btn.y,
        audio: {
          url: uploadedUrl || existingBtn?.audio?.url || undefined
        }
      };
    });

    const newPage = {
      template: parsedPage.template,
      sentence: parsedPage.sentence || '',
      sentenceX: parsedPage.sentenceX || 0,
      sentenceY: parsedPage.sentenceY || 0,
      audio: audioUrl !== undefined
        ? { url: audioUrl }
        : existingPage.audio || { url: undefined },
      image: imageUrl
        ? { url: imageUrl, alt: parsedPage.imageAlt || '' }
        : existingPage.image || { url: undefined, alt: '' },
      wordButtons
    };

    book.reading.pages[pageIndex] = newPage;
    await book.save();

    return res.status(200).json({ message: `Page  saved successfully.` });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Server error.', error: error.message });
    }
    console.error('Error updating single reading page:', error);
  }
}


