import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach token dynamically to requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage or sessionStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      // Attach token to the headers if it exists
      config.headers["x-auth-token"] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);




const axiosInstances = axios.create({
  baseURL: "http://localhost:5000/api", // your backend URL
});

// Interceptor to attach token dynamically to requests
axiosInstances.interceptors.request.use(
  (config) => {
    // Get the token from localStorage or sessionStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      // Attach token to the headers if it exists
      config.headers["x-auth-token"] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ===== Auth APIs =====
export const loginUser = (data) => axiosInstance.post("/auth/login", data);
export const registerUser = (data) => axiosInstance.post("/auth/register", data);
export const verifyToken = () => axiosInstance.get("/auth/verify");

// ===== Levels APIs =====
export const createLevel = (data) => axiosInstance.post('/levels', data);
export const getLevels = () => axiosInstance.get('/levels');
export const getLevelById = (id) => axiosInstance.get(`/levels/${id}`);
export const updateLevel = (id, data) => axiosInstance.put(`/levels/${id}`, data);
export const deleteLevel = (id) => axiosInstance.delete(`/levels/${id}`);

// ===== Volumes APIs =====
export const getVolumes = () => axiosInstance.get("/volumes");
export const createVolume = (data) => axiosInstance.post("/volumes", data);
export const updateVolume = (id, data) => axiosInstance.put(`/volumes/${id}`, data);
export const deleteVolume = (id) => axiosInstance.delete(`/volumes/${id}`);

// ===== Books APIs =====
export const getBooks = () => axiosInstance.get("/books");
export const getBookById = (id) => axiosInstance.get(`/books/${id}`);
export const createBook = (data) => axiosInstance.post("/books", data);
export const updateBook = (id, data) => axiosInstance.put(`/books/${id}`, data);
export const deleteBook = (id) => axiosInstance.delete(`/books/${id}`);



// Upload Cover Image
export const uploadCoverImage = (bookId, file) => {
  const formData = new FormData();
  
  formData.append('file', file.coverImage); // Append the file to the FormData
  const filee = formData.get('file'); // Get the file from FormData

  if (filee instanceof File) {
    console.log('File Details:');
    console.log('Name:', filee.name);
    console.log('Size:', filee.size);
    console.log('Type:', filee.type);
  } else {
    console.log('No file found');
  }
  
  
  
  return axiosInstances.put(`/books/${bookId}/cover-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Important to set this for file uploads
    },
  })
  .then(response => {
    // Handle success
    console.log('Cover image uploaded successfully:', response.data);
    return response.data;
  })
  .catch(error => {
    // Handle error
    console.error('Error uploading cover image:', error);
    throw error; // Rethrow to handle it further up if needed
  });
};


// Upload Listening Video
export const uploadListeningVideo = (bookId, file) => {
  const formData = new FormData();
  
  formData.append('file', file); // Append the file to the FormData

  return axiosInstances.put(`/books/${bookId}/listening-video`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Upload Speaking Sentence and Image
export const uploadSpeakingSection = (bookId, sentence, file) => {
  const formData = new FormData();
  formData.append('sentence', sentence);
  formData.append('file', file); // Append the file to the FormData

  return axiosInstances.put(`/books/${bookId}/speaking`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Upload Writing PDF
export const uploadWritingPdf = (bookId, file) => {
  const formData = new FormData();
  formData.append('file', file); // Append the file to the FormData

  return axiosInstances.put(`/books/${bookId}/writing-pdf`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// ===== Users APIs =====
export const getUsers = () => axiosInstance.get("/users");
export const createUser = (data) => axiosInstance.post("/users", data);
export const assignLicense = (userId, data) => axiosInstance.post(`/users/${userId}/license`, data);

// ===== Student APIs =====
export const createStudent = (data) => axiosInstance.post("/students", data);
export const getStudents = () => axiosInstance.get("/students");

// ===== Teacher APIs =====
export const createTeacher = (data) => axiosInstance.post("/teachers", data);
export const getTeachers = () => axiosInstance.get("/teachers");

// ===== Restrictions API =====
export const restrictAccess = (studentId, data) => axiosInstance.post(`/students/${studentId}/restrict`, data);

// ===== Upload/Download APIs =====
export const uploadWriting = (data) => axiosInstance.post("/upload/writing", data);
export const getWriting = (studentId) => axiosInstance.get(`/writing/${studentId}`);


export const getTemplates = () => axiosInstance.get("/templates");
