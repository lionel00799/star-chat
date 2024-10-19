import React from "react";

const ChatPaneFooter = ({ friend, addMessage }) => {
  const [inputText, setInputText] = React.useState("");

  const handleSend = () => {
    if (inputText.trim() !== "") {
      addMessage(inputText, "user", "You", new Date().toLocaleTimeString());
      setInputText(""); // Clear the input field

      // Simulate a response after a short delay
      setTimeout(() => {
        addMessage("This is an automated response.", "other", friend, "10:03:42 AM");
      }, 1000);
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