import "./App.css";
import MainContent from "./components/MainContent.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import SignIn from "./components/auth/SignIn.jsx";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route  path="/" Component={MainContent} />
        <Route  path="/signup" Component={SignUp} />
        </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;
