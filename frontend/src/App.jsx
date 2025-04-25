import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AdminDashboard from "./components/Admin/Dashboard";
import UserDashboard from "./components/User/UserDashboard";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import BookDetails from "./components/User/BookDetails";
import DashboardLayout from "./layout/DashboardLayout";
import LevelPage from "./components/User/LevelPage";
import VolumeLayout from "./layout/VolumeLayout";
import BookDetailsWrapper from "./components/User/BookDetailsWrapper";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/user" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
          <Route path="/user/:level" element={<PrivateRoute><DashboardLayout><LevelPage /></DashboardLayout></PrivateRoute>}/>
          <Route path="/book-details/:level/:volumeId/:bookTitle" element={<PrivateRoute><BookDetailsWrapper/></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
