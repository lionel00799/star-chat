import BadgeAvatars from "./FriendAvatar";

const ChatPaneHeader = ({ friend, isOnline }) => {
  return (
    <div className="chat-pane-header">
      <div className="avatar-container">
        <BadgeAvatars username={friend} isOnline={true} />
        <span className="avatar-container-name">
          {friend}
        </span>
        <button className="chat-online-button">
          <div 
            className={`online-dot ${true ? 'online' : 'offline'}`} 
          />
          {isOnline ? 'Online' : 'Offline'}
        </button>
      </div>
      <div className="chat-button-container">
        <button className="chat-call-button">
          <span
            className="material-symbols-rounded"
            style={{ marginLeft: "3px", marginRight: "8px" }}
          >
            phone_in_talk
          </span>
          Call
        </button>
        <button className="chat-profile-button">View profile</button>
        <button
          className="material-symbols-rounded"
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            borderRadius: "8px",
            marginLeft: "10px",
            marginRight: "20px",
          }}
        >
          more_vert
        </button>
      </div>
    </div>
  );
};

export default ChatPaneHeader;
