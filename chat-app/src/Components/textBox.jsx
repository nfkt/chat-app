import { useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import "./textBox.css";
import { useEffect } from "react";
import UserListContext from "../contexts/user-list-context";

function TextBox(props) {
  const [state, setState] = useState({
    message: "",
    to: "NIhal",
    from: "Farhan",
  });
  const socketRef = useRef();
  const { id } = useParams();
  const userListContext = useContext(UserListContext);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = () => {
    const { to, from, message } = state;
    socketRef.current = io.connect(`http://${window.location.hostname}:4000/`); //,  { transports: ['websocket', 'polling', 'flashsocket'] }
    socketRef.current.emit("message", { to, from, message });
    messageHandler(state);
    setState({ message: "", to, from });
    console.log(state);
  };

  useEffect(()=>{
    
  })

  const messageHandler = (to, from, message) => {
    const data = message;
    var config = {
      method: "post",
      url: `http://localhost:3009/users/${id}/messa`,
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
      <input type="submit" value="Send" onClick={onMessageSubmit} />
    </div>
  );
}

export default TextBox;
