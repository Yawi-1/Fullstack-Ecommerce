import React, { useState } from "react";
import "./ChatBot.css";
import { LuMessageSquare } from "react-icons/lu";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleMinimizeChat = () => {
    setIsOpen(false); // Minimize the chatbot when the X button is clicked
  };

  return (
    <div className="chatbot-container">
      {!isOpen ? (
        <div className="chatbot-toggle" onClick={handleToggleChat}>
          <span>Chat with us </span>
          <LuMessageSquare className="chat-icon" />
        </div>
      ) : (
        <>
            <button onClick={handleMinimizeChat} style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 1000,
              padding:'4px',
              background:'none',
              border:'none',
              color:'white',
              fontSize:'2rem',
              cursor:'pointer',
              margin:'10px 4px'
            }}>✖</button>
          {/* Embedded Dialogflow iframe */}
          <div className="chatbot-iframe">
            <iframe
              width="380"
              height="500"
              allow="microphone;"
              src="https://console.dialogflow.com/api-client/demo/embedded/b19ababa-2ed2-4ef6-bb89-d4e5658523fb"
              title="Dialogflow Chatbot"
            ></iframe>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;
