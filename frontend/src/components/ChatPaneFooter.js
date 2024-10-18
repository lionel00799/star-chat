const ChatPaneFooter = () => {
  return (
    <div className="message-footer">
      <div className="message-input-container">
        <textarea
          className="message-input"
          placeholder="Type something here..."
          aria-label="message"
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
          <button className="message-send-button">
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