import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import UserDashboard from "./components/User/UserDashboard";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardLayout from "./layout/DashboardLayout";
import LevelPage from "./components/User/LevelPage";
import BookDetailsWrapper from "./components/User/BookDetailsWrapper";
import AdminLayout from "./layout/AdminLayout";
import LevelForm from "./components/Admin/LevelForm";
import VolumeForm from "./components/Admin/VolumeForm";
import BookForm from "./components/Admin/BookForm";
import LevelList from "./components/Admin/LevelList";
import VolumeList from "./components/Admin/VolumeList";
import AdminHome from "./components/Admin/Dashboard";
import BookEditor from "./components/Admin/BookEditor";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
          <Route path="/user/:level" element={<PrivateRoute><DashboardLayout><LevelPage /></DashboardLayout></PrivateRoute>}/>
          <Route path="/book-details/:level/:volumeId/:bookTitle" element={<PrivateRoute><BookDetailsWrapper/></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
            <Route index element={<AdminHome />} /> {/* for /admin */}
            <Route path="levels" element={<LevelForm />} />
            <Route path="levels/view" element={<LevelList />} />
            <Route path="volumes" element={<VolumeForm />} />
            <Route path="volumes/view" element={<VolumeList />} />
            <Route path="books" element={<BookForm />} />
            <Route path="books/view" element={<BookEditor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
