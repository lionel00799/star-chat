import React from "react";
import BadgeAvatars from "./FriendAvatar";

const FriendBarItem = ({ friend, isSelected, onClick }) => {
  return (
    <div
      className={`friend-bar-item ${isSelected ? 'active' : ''}`}
      onClick={onClick}
    >
      <BadgeAvatars username={friend} isOnline={true}/>
      <span className="friend-bar-item-name">{friend}</span>
    </div>
  );
};

export default FriendBarItem;
