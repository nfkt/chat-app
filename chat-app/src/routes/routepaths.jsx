import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import LoginPage from "../Pages/loginForm";
import ChatPage from "../Pages/chatPage";
import UserListContext from "../contexts/user-list-context";
import UserAuthContext from "../contexts/user-auth";

const RoutePaths = () => {
  const userAuthContext = useContext(UserAuthContext);
  const userListContext = useContext(UserListContext);
  const [list, setList] = useState(userListContext.userList);
  

  useEffect(()=>{
    setList(userListContext.userList)

  }, [userListContext.userList])

    return (
      <Router>
       
  
        <Routes>
        
          <Route path="/" element={<LoginPage />} />
          <Route path="/user/:id" element={userAuthContext.isLoggedIn ? <ChatPage/> : <Navigate replace to="/" />} />

        </Routes>

      </Router>
    );
  }
  
  export default RoutePaths;