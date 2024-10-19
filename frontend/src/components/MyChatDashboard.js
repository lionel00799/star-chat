import React from 'react';
import FriendBar from './FriendBar';
import './MyChatDashboard.css'; // Optional: for custom styles

const ChatDashboard = () => {
    return (
        <div className="my-chat-dashboard">
            <FriendBar />
        </div>
    );
};

export default ChatDashboard;
