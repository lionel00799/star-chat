import React from "react";
import io from 'socket.io-client';
import formatMessages from "../utils/handleOldMessages";

const socket = io.connect('http://192.168.140.238:3003');

const ChatPaneFooter = ({ friend, addMessage, setMessages }) => {
  const userId = localStorage.getItem('userId');
  const [inputText, setInputText] = React.useState("");

  React.useEffect(() => {
    const messageData = {
      senderId: userId,
      receiver: friend,
    };

    socket.emit('join_room', messageData);
  }, [userId, friend]);

  React.useEffect(() => {
    socket.on("load_old_messages", (messages) => {
      // Format the messages
      const formattedMessages = formatMessages(messages);
      console.log("Received old messages:", formattedMessages);
      
      setMessages((prevMessages) => ({
        ...prevMessages,
        [friend]: formattedMessages
      }));
    });


    socket.on("system_message", (message) => {
      console.log("Received system message:", message);
    });

    // Listen for private messages
    socket.on('receive_private_message', (data) => {
      addMessage(data.message, "other", data.receiver, new Date().toLocaleTimeString());
    });

    return () => {
    socket.off('receive_private_message');
    }
  }, [addMessage, setMessages, friend]);

  const sendMessage = (message) => {
    const messageData = {
      senderId: localStorage.getItem('userId'),
      receiver: friend,
      message: message,
    };

    socket.emit("send_private_message", messageData);
  }

  // React.useEffect(() => {
  //   // When connected to the server
  //   socket.on('receive_message', (data) => {
  //     console.log('receive_message', data);
  //     addMessage(data.message, "other", data.receiver, new Date().toLocaleTimeString());
  //   });

  //   return () => {
  //     socket.off('receive_message');
  //   }
  // }, [addMessage]);

  // const sendMessage = (message) => {
  //   const messageData = {
  //     senderId: localStorage.getItem('userId'),
  //     receiver: friend,
  //     message: message,
  //   };

  //   socket.emit("send_message", messageData);
  // }

  const handleSend = () => {
    if (inputText.trim() !== "") {
      addMessage(inputText, "user", "You", new Date().toLocaleTimeString());
      sendMessage(inputText);
      setInputText(""); // Clear the input field
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-footer">
      <div className="message-input-container">
        <textarea
          className="message-input"
          placeholder="Type something here..."
          aria-label="message"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          onKeyDown={handleKeyPress}
        />
        <div className="message-input-divider" />
        <div className="message-send-button-container">
          <div className="icon-container">
            <span
              className="material-symbols-outlined"
              style={{ marginLeft: "30px" }}
            >
              format_bold
            </span>
            <span className="material-symbols-outlined">format_italic</span>
          </div>
          <button className="message-send-button" onClick={handleSend}>
            Send
            <span
              className="material-symbols-rounded"
              style={{ marginLeft: "5px" }}
            >
              send
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPaneFooter;