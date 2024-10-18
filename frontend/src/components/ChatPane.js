// src/components/ChatWindow.jsx

import React from "react";
import "./ChatPane.css"; // Optional: for custom styles
import ChatPaneFooter from "./ChatPaneFooter";
import ChatPaneHeader from "./ChatPaneHeader";

const ChatPane = () => {
  return (
    <div className="chat-pane">
      <ChatPaneHeader />
      <div className="messages">
        {/* Sample messages */}
        <div className="message">Hello!</div>
        <div className="message">How are you?</div>
      </div>
      <ChatPaneFooter />
    </div>
  );
};

export default ChatPane;
