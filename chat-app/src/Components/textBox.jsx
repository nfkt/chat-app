import { useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import "./textBox.css";
import { useEffect } from "react";
import UserListContext from "../contexts/user-list-context";

function TextBox(props) {
  const userListContext = useContext(UserListContext);
  const [state, setState] = useState({
    message: "",
    to: userListContext.toId.name,
    from: userListContext.fromId.name,
  });
  const socketRef = useRef();
  const { id } = useParams();

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (to, from) => {
 
    
    socketRef.current = io.connect(`http://${window.location.hostname}:4000/`); //,  { transports: ['websocket', 'polling', 'flashsocket'] }
    setState(previousState =>({ ...previousState,message: state.message}));
    setState(previousState =>({ ...previousState,to: to.id, from: from.id }));
    // setState({ message: state.message, to: to.id, from: from.id });
    // socketRef.current.emit("message", { to, from, message });
    // messageHandler(state);
    setState({ message: "", to, from });
    console.log(state);
    console.log(userListContext.toId);
  };

  const messageHandler = (to, from, message) => {
    const data = message;
    var config = {
      method: "post",
      url: `http://localhost:3009/users/${id}/chats`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log("Response successful", response.data);
      })
      .catch((err) => {
        console.log("Caught error:", err);
      });
  };
useEffect(()=>{
  setState(previousState =>({ ...previousState,to: userListContext.toId.name, from: userListContext.fromId.name }));

}, [userListContext.toId, userListContext.fromId])

  return (
    <div id="textBox">
      <input
        type="text"
        placeholder="Send a text"
        onChange={(e) => onTextChange(e)}
        label="Name"
        name="message"
        value={state.message}
      />
      <input type="submit" value="Send" onClick={()=>onMessageSubmit(userListContext.toId, userListContext.fromId)} />
    </div>
  );
}

export default TextBox;
