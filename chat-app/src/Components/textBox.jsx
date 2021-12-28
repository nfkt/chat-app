import { useRef, useState } from "react";
import { io } from "socket.io-client";
import "./textBox.css";

function TextBox(props) {

  const [ state, setState ] = useState({ message: "", name: "NIhal" })
  const socketRef = useRef();


  const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = () => {
		const { name, message } = state;
    socketRef.current = io.connect(`http://${window.location.hostname}:4000/`);  //,  { transports: ['websocket', 'polling', 'flashsocket'] }
	  socketRef.current.emit("message", { name, message })
		setState({ message: "", name })
    console.log(state)
	}

  return (
    <div id="textBox">
     
      <input type="text" placeholder="Send a text" onChange={(e)=>onTextChange(e)}  label="Name" name="message" value={state.message} />
      <input type="submit" value="Send" onClick={onMessageSubmit}/>
     
        
    </div>
  );
}

export default TextBox;
