import React from "react";
import BadgeAvatars from "./FriendAvatar";

const FriendBarItem = ({ friend, isSelected, onClick }) => {
  return (
    <div
      className={`friend-bar-item ${isSelected ? 'active' : ''}`}
      onClick={onClick}
    >
      <BadgeAvatars username={friend.name} isOnline={friend.status}/>
      <span className="friend-bar-item-name">{friend.name}</span>
    </div>
  );
};

export default FriendBarItem;
