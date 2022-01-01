// import "bootstrap/dist/css/bootstrap.css";
import { io } from 'socket.io-client';
import React from "react";
import TextBox from '../Components/textBox';
import ChatArea from '../Components/chatArea';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';


function ChatPage() {

  const [conn, setConn] = useState(false);
  const socketRef = useRef()
  useEffect(()=>{
    socketRef.current = io.connect(`http://${window.location.hostname}:4000/`);
    socketRef.current.on('connected', connection =>{
      
      if(connection){
        console.log(connection);
      setConn(true);

      }

    })
    

  }, [])

  return (  
    <div className="container">
    <nav>Navbar</nav>
    <main>
      <div className="containerMain">
       {conn ? <TextBox />: <div>You are not connected</div>}
       <ChatArea />
      </div>
    </main>
    <div id="sidebar">Sidebar</div>
    <footer>Footer</footer>
  </div>
  );
}

export default ChatPage;