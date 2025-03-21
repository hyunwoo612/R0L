import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Main from './components/Main';
import Sign from "./pages/Sign";
import Login from "./pages/Login";
import './App.css';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <Header loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<Main />} />
          <Route path="/Sign" element={<Sign />} />
          <Route path="/Login" element={<Login setLoggedInUser={setLoggedInUser} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;