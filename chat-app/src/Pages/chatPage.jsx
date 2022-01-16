// import "bootstrap/dist/css/bootstrap.css";
import { io } from "socket.io-client";
import React, { useRef, useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


import UserList from "../Components/userList";
import TextBox from "../Components/textBox";
import ChatArea from "../Components/chatArea";
import { useParams, useNavigate } from "react-router-dom";
import UserListContext from "../contexts/user-list-context";


function ChatPage() {
  const [conn, setConn] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const userListContext = useContext(UserListContext);

  const { id } = useParams();
  const socketRef = useRef();

  const chatHistoryFn = (toId) => {
    var data = JSON.stringify({
      to: toId,
      from: id,
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
  }, []);

  return (
    <div className="container">
      <nav>Navbar</nav>
      <main>
        <div className="containerMain">
          <TextBox />
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
