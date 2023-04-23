import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ThreadPage from "./components/threads-page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/threads" />} />
        <Route path="/threads" element={<ThreadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
