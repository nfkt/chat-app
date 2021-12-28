// import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import TextBox from '../Components/textBox';
import ChatArea from '../Components/chatArea';


function ChatPage() {

  return (
    <div className="container">
    <nav>Navbar</nav>
    <main>
      <div className="containerMain">
        <TextBox />
        <ChatArea />
      </div>
    </main>
    <div id="sidebar">Sidebar</div>
    <footer>Footer</footer>
  </div>
  );
}

export default ChatPage;