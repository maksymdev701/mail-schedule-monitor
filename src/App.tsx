import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ThreadDashboard from "./components/threads/threads-dashboard";
import MainLayout from "./components/main-layout";
import PromptAddForm from "./components/prompts/prompt-add-form";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Navigate to="/threads" />} />
          <Route path="threads" element={<ThreadDashboard />} />
          <Route path="prompts">
            <Route path="add" element={<PromptAddForm />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
