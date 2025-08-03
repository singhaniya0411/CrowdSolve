import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostProblem from "./pages/PostProblem";
import ProblemDetails from "./pages/ProblemDetails";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";
import Welcome from "./pages/Welcome";
import Footer from "./components/Footer";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      {/* App content */}
      <div className="relative z-10 h-full">
        <Navbar />

        <Routes>
          <Route path="/" element={user ? <Home /> : <Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post" element={<PostProblem />} />
          <Route path="/problem/:id" element={<ProblemDetails />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
