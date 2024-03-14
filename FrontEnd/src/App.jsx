import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainContent from "./components/MainContent.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import SignIn from "./components/auth/SignIn.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import PrivateRoute from "../PrivateRoute.jsx"; // Adjust the path to import PrivateRoute
import ForgotPass from './components/auth/ForgotPass.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PrivateRoute ><MainContent /></PrivateRoute>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/resetpassword" element={<ForgotPass />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </AuthProvider>       
  );
}

export default App;
