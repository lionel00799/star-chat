// FriendBar.js
import React, { useState } from "react";
import "./FriendBar.css"; // Optional: for custom styles
import "../assets/style.css";
import FriendBarItem from "./FriendBarItem"; // Import the FriendBarItem component
import FormDialog from "./AddFriendDialog";

const FRIENDS_LIST = ['Alice']; // Add more friend names as needed

const FriendBar = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [friends_list, setNavigation] = React.useState(FRIENDS_LIST);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClickClose = (username) => {
    setDialogOpen(false);

    if (username) {
  
        setNavigation((pervList) => [
          ...pervList,
          username,
        ]);
      }
  };

  const handleFriendClick = (friend) => {
    // Only set the selected friend if it's not already selected
    if (selectedFriend !== friend) {
      setSelectedFriend(friend);
    }
  };

  return (
    <div className="friend-bar">
      <div className="friend-bar-header">
        <h2>Friends List</h2>
        <span className="material-symbols-outlined" onClick={handleClickOpen}>person_add</span>
      </div>
      <div className="friend-bar-list">
        {friends_list.map((friend) => (
          <FriendBarItem
            key={friend} // Use a unique key for each item
            friend={friend}
            isSelected={selectedFriend === friend}
            onClick={() => handleFriendClick(friend)}
          />
        ))}
      </div>
      <FormDialog
        open={isDialogOpen}
        onClose={handleClickClose}
      />
    </div>
  );
};

export default FriendBar;