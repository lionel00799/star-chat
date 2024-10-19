import React from "react";
import "./ChatPaneBody.css"; // Import CSS for styling
import BadgeAvatars from "./FriendAvatar";

const ChatPaneBody = ({ messages = [] }) => {
  const messageEndRef = React.useRef(null);

  React.useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message-row ${msg.sender === "user" ? "message-right-row" : "message-left-row"}`}
        >
          {msg.sender !== "user" && (
            <div className="avatar-container">
              <BadgeAvatars />
            </div>
          )}
          <div
            className={`message-container ${msg.sender === "user"
              ? "message-right-container"
              : "message-left-container"}`}
          >
            {msg.sender === "user" ? (
              <div className="message-metadata-right">
                <span className="message-name-right">{msg.name}</span>
                <span className="message-time-right">{msg.time}</span>
              </div>
            ) : (
              <div className="message-metadata-left">
                <span className="message-name-left">{msg.name}</span>
                <span className="message-time-left">{msg.time}</span>
              </div>
            )}
            <div className={`message ${msg.sender === "user" ? "message-right" : "message-left"}`}>
              {msg.text}
            </div>
          </div>
        </div>
      ))}
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatPaneBody;