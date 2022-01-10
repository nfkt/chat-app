// import "bootstrap/dist/css/bootstrap.css";
import { io } from "socket.io-client";
import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import UserList from "../Components/userList";
import TextBox from "../Components/textBox";
import ChatArea from "../Components/chatArea";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import UserListContext from "../contexts/user-list-context";

function ChatPage() {
  const [conn, setConn] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const userListContext = useContext(UserListContext);

  const { id } = useParams();
  const socketRef = useRef();

  const chatHistoryFn = () => {
    var data = JSON.stringify({
      to: "",
      from: `${id}`,
    });
  };
  useEffect(() => {
    socketRef.current = io.connect(`http://${window.location.hostname}:4000/`);
    socketRef.current.on("connected", (connection) => {
      if (connection) {
        console.log(connection);
        setConn(true);
      }
    });
    // console.log(userListContext.userList);
  }, [conn]);

  return (
    <div className="container">
      <nav>Navbar</nav>
      <main>
        <div className="containerMain">
          {conn ? <TextBox /> : <div>You are not connected</div>}
          <ChatArea />
        </div>
      </main>
      <div id="sidebar">
        <div>
          Sidebar <FontAwesomeIcon icon={faPlus} />
        </div>
        <UserList />
      </div>
      <footer>Footer</footer>
    </div>
  );
}

export default ChatPage;
