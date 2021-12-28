import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import LoginPage from "../Pages/loginForm";
import ChatPage from "../Pages/chatPage";

const RoutePaths = () => {

    return (
      <Router>
       
  
        <Routes>
        
          <Route path="/" element={<LoginPage />} />
          <Route path="/user/:id" element={<ChatPage/>} />

        </Routes>

      </Router>
    );
  }
  
  export default RoutePaths;