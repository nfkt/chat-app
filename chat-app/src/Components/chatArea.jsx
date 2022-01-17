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

  useEffect(async() => {
    socketRef.current = io.connect(`http://${window.location.hostname}:4000/`); //,  { transports: ['websocket', 'polling', 'flashsocket'] }
    socketRef.current.on("message", ({ to, from, message }) => {
      setChat([...chat, { to, from, message }]);
    });

    console.log(
      await  chatHistoryHandler(userListContext.toId.id, userListContext.fromId.id)
        // .then((response) => {
        //   console.log(response.data);
        // })
        // .catch((err) => {
        //   console.log(err);
        // })
    );
    return () => socketRef.current.disconnect();
  }, [chat, userListContext.toId.id]);

  const chatHistoryHandler = async(to, from) => {
	  const chat_a = await fetchChatHistory(to, from);
	  const chat_b = await fetchChatHistory(from, to);
	  console.log(chat_a);
	  console.log(chat_b);
	 const sorted_chat_a = chat_a.message.map((item, i)=>({
		to: chat_a.to,
		from: chat_a.from,
		sent_at : item.sent_at,
		message: item.message
	  }));
	  console.log(sorted_chat_a);
	  if(chat_a && chat_b) return {chat_a, chat_b}
	  else return chat_a

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
	try{
		const x = await axios(config);
		// console.log(x.data)
		return await x.data ;
	}catch(err){
		console.log(err)
	}
    
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

  return (
    <div id="chatArea">
      Chat area
      {renderChat()}
    </div>
  );
}

export default ChatArea;
