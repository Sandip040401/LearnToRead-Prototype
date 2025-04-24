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

// ===== Auth APIs =====
export const loginUser = (data) => axiosInstance.post("/auth/login", data);
export const registerUser = (data) => axiosInstance.post("/auth/register", data);
export const verifyToken = () => axiosInstance.get("/auth/verify");

// ===== Levels APIs =====
export const getLevels = () => axiosInstance.get("/levels");
export const createLevel = (data) => axiosInstance.post("/levels", data);
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
