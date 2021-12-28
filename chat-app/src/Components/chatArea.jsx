import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import './chatArea.css';


function ChatArea(){

    const [ chat, setChat ] = useState([])
    const socketRef = useRef();

     useEffect(
		() => {
			socketRef.current = io.connect(`http://${window.location.hostname}:4000/`); //,  { transports: ['websocket', 'polling', 'flashsocket'] }
			socketRef.current.on("message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
        console.log(chat);
			})
			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)
	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>
					{name}: <span>{message}</span>
				</h3>
			</div>
		))
	}


    return(
        <div id="chatArea">
            Chat area
           {
              renderChat()
           }
       

        </div>
    )
}

export default ChatArea;
