import React from "react";
import "./ChatPane.css"; // Optional: for custom styles
import ChatPaneFooter from "./ChatPaneFooter";
import ChatPaneHeader from "./ChatPaneHeader";
import ChatPaneBody from "./ChatPaneBody";

const ChatPane = ({ friend, messages, addMessage }) => {
  return (
    <div className="chat-pane">
      <ChatPaneHeader friend={friend} isOnline={true}/>
      <ChatPaneBody messages={messages} />
      <ChatPaneFooter friend={friend} addMessage={addMessage} />
    </div>
  );
};

export default ChatPane;