import "./styles.css";
import "./bootstrap-social.css";
import React from "react";
// import ReactDOM from 'react-dom/client';
import Register from "../src/components/Register";
import Home from "../src/components/Home";
import Login from "./components/Login";
import Secrets from "./components/secrets";
import Submit from './components/submit';

import { BrowserRouter as Router,
  Routes, 
  Route} from "react-router-dom";

function App() {
  return (
   <Router>
    <div>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/secrets" element={<Secrets/>}></Route>
        <Route path="/submit" element={<Submit/>}></Route>
      </Routes>
    </div>
   </Router>
  );
}

export default App;
