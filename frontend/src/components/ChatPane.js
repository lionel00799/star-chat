import React from "react";
import "./ChatPane.css"; // Optional: for custom styles
import ChatPaneFooter from "./ChatPaneFooter";
import ChatPaneHeader from "./ChatPaneHeader";
import ChatPaneBody from "./ChatPaneBody";

const ChatPane = ({ friend, messages, addMessage, setMessages, isOnline }) => {
  return (
    <div className="chat-pane">
      <ChatPaneHeader friend={friend} isOnline={isOnline}/>
      <ChatPaneBody messages={messages} />
      <ChatPaneFooter friend={friend} addMessage={addMessage} setMessages={setMessages}/>
    </div>
  );
};

export default ChatPane;