import React from 'react';
import FriendBar from './FriendBar';
import ChatPane from './ChatPane';
import './MyChatDashboard.css'; // Optional: for custom styles

const ChatDashboard = () => {
    return (
        <div className="my-chat-dashboard">
            <FriendBar />
            <ChatPane />
        </div>
    );
};

export default ChatDashboard;
