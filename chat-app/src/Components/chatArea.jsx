import { useEffect, useRef, useState, useContext } from "react";
import { io } from "socket.io-client";
import "./chatArea.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserListContext from "../contexts/user-list-context";

function ChatArea() {
  const userListContext = useContext(UserListContext);
  const [chat, setChat] = useState([]);
  const socketRef = useRef();
  const { id } = useParams();

  useEffect(async () => {
    scrollToBottom();
    if (userListContext.toId.id) {
      const chatHistory = await chatHistoryHandler(
        userListContext.toId,
        userListContext.fromId
      );
      setChat(await chatHistory);
      socketRef.current = io.connect(
        `http://${window.location.hostname}:4000/`
      ); //,  { transports: ['websocket', 'polling', 'flashsocket'] }
      socketRef.current.on("message", ({ to, from, message }) => {
        setChat([...chatHistory, { to, from, message }]);
      });

      // .then((response) => {
      //   console.log(response.data);
      // })
      // .catch((err) => {
      //   console.log(err);
      // })
    }

    return () => socketRef.current.disconnect();
  }, [userListContext.toId.id]);

  const chatHistoryHandler = async (to, from) => {
    const chat_a = await fetchChatHistory(to.id, from.id);
    const chat_b = await fetchChatHistory(from.id, to.id);
    console.log(chat_a);
    console.log(chat_b);

    const sorted_chat_a = chat_a
      ? chat_a.message.map((item, i) => ({
          // to: chat_a.to,
          to: to.name,
          // from: chat_a.from,
          from: from.name,
          sent_at: item.sent_at,
          message: item.message,
        }))
      : [];

    if (chat_b) {
      const sorted_chat_b = chat_b.message.map((item, i) => ({
        // to: chat_b.to,
        to: from.name,
        // from: chat_b.from,
        from: to.name,
        sent_at: item.sent_at,
        message: item.message,
      }));
      const final_chat = [...sorted_chat_a, ...sorted_chat_b];
      console.log(final_chat);
      return await sortChatHistory(final_chat);
    } else {
      const final_chat = [...sorted_chat_a];
      console.log(final_chat);
      return await sortChatHistory(final_chat);
    }

    // console.log(sorted_chat_a);
    // if (chat_a && chat_b) return { chat_a, chat_b };
    // else return chat_a;
  };

  const fetchChatHistory = async (to, from) => {
    const data = { to: to, from: from };
    var config = {
      method: "post",
      url: `http://localhost:3009/users/${id}/get-message`,
      headers: {
        "Content-Type": "application/json",
      },
      json: true,
      data: data,
    };
    try {
      const x = await axios(config);
      // console.log(x.data)
      return await x.data;
    } catch (err) {
      console.log(err);
    }
  };

  const sortChatHistory = async (chatHistory) => {
    return chatHistory.slice().sort((a, b) => b.sent_at - a.sent_at);
  };
  const renderChat = () => {
    return chat.map(({ to, from, message }, index) => (
      <div key={index}>
        <h3>
          {from} to {to}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

const scrollToBottom = ()=>{
  let scrollToBottomInChatArea = document.getElementById("chatArea");
  scrollToBottomInChatArea.scrollTop =scrollToBottomInChatArea.scrollHeight;
}
  return (
    <div id="chatArea">
      Chat area
      {renderChat()}
    </div>
  );
}

export default ChatArea;
