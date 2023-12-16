import React from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signup from "./components/Signup";
import Login from "./components/Login";
import Shorten from "./components/Shorten";
//import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/shorten" element={<Shorten/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
