import React, { useState } from "react";
import "./FriendBar.css"; // Optional: for custom styles
import "../assets/style.css";
import FriendBarItem from "./FriendBarItem"; // Import the FriendBarItem component
import FormDialog from "./AddFriendDialog";
import ChatPane from "./ChatPane"; // Import ChatPane component

const FRIENDS_LIST = []; // Add more friend names as needed

const FriendBar = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [friendsList, setFriendsList] = useState(FRIENDS_LIST);

  const [messages, setMessages] = useState([]);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClickClose = (username) => {
    setDialogOpen(false);

    if (username && !friendsList.includes(username)) {
      // Add the new friend to the friends list
      setFriendsList((prevList) => [...prevList, username]);

      // Initialize empty message history for the new friend
      setMessages((prevMessages) => ({
        ...prevMessages,
        [username]: [],
      }));

      // Set the new friend as the selected friend
      setSelectedFriend(username);
    }
  };

  const handleFriendClick = (friend) => {
    if (selectedFriend !== friend) {
      setSelectedFriend(friend); // Select the friend to open the corresponding chat
    }
  };

  const addMessage = React.useCallback((text, sender, name, time) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedFriend]: [...prevMessages[selectedFriend], { text, sender, name, time }],
    }));
  }, [selectedFriend]);

  return (
    <div className="app-container">
      {/* FriendBar */}
      <div className="friend-bar">
        <div className="friend-bar-header">
          <h2 style={{ fontSize: "24px", fontWeight: "500" }}>Friends List</h2>
          <span className="material-symbols-outlined" onClick={handleClickOpen}>
            person_add
          </span>
        </div>
        <div className="friend-bar-list">
          {friendsList.map((friend) => (
            <FriendBarItem
              key={friend} // Use a unique key for each item
              friend={friend}
              isSelected={selectedFriend === friend}
              onClick={() => handleFriendClick(friend)}
            />
          ))}
        </div>
        <FormDialog open={isDialogOpen} onClose={handleClickClose} />
      </div>

      {/* ChatPane: Only render if a friend is selected */}
      <div className="chat-pane-container">
        {selectedFriend ? (
          <ChatPane
            friend={selectedFriend}
            messages={messages[selectedFriend]}
            addMessage={addMessage}
          />
        ) : (
          <div>Select a friend to start chatting.</div>
        )}
      </div>
    </div>
  );
};

export default FriendBar;