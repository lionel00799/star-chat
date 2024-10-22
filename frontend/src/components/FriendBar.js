import React, { useState } from "react";
import "./FriendBar.css"; // Optional: for custom styles
import "../assets/style.css";
import FriendBarItem from "./FriendBarItem"; // Import the FriendBarItem component
import FormDialog from "./AddFriendDialog";
import ChatPane from "./ChatPane"; // Import ChatPane component
import { getFriendList, getFriendStatus} from "../services/statusService"; // Fetches friends list
import io from "socket.io-client";

const socket = io.connect('http://192.168.140.238:3003');

// Initial friends list with name and status
const FRIENDS_LIST = [];

const FriendBar = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [friendsList, setFriendsList] = useState(FRIENDS_LIST); // State to store friends list
  const [messages, setMessages] = useState([]);

  React.useEffect(() => {
    // Fetch friends' status on initial login
    const fetchFriendsStatus = async () => {
      try {
        const friendList = await getFriendList(localStorage.getItem('userId')); // Fetch list of friends from server

        console.log('Friends list:', friendList);
        
        // Update friendsList with fetched friendList
        setFriendsList(friendList);
        
      } catch (error) {
        console.error('Error fetching friends status:', error);
      }
    };

    fetchFriendsStatus(); // Fetch friends when component mounts

    // Register user with socket for status updates
    socket.emit('register_user', localStorage.getItem('userId'));

    // Listen for updates to friends' status
    socket.on('update_user_status', ({ username, status }) => {
      setFriendsList(prevFriendsList => 
        prevFriendsList.map(friend => 
          friend.name === username ? { ...friend, status } : friend
        )
      );
    });

    // Cleanup event listener on unmount
    return () => {
      socket.off('update_user_status');
    };
  }, []);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClickClose = async(username) => {
    setDialogOpen(false);

    if (username && !friendsList.some(friend => friend.name === username)) {
      try {
        // Add the new friend to the friends list
        const friendStatus = await getFriendStatus(username);
        const newFriend = { name: username, status: friendStatus }; // Default status
        setFriendsList(prevList => [...prevList, newFriend]);

        // Initialize empty message history for the new friend
        setMessages(prevMessages => ({
          ...prevMessages,
          [username]: [],
        }));

        // Set the new friend as the selected friend
        setSelectedFriend(username);
      } catch (error) {
        console.error('Error adding friend:', error);
      }
    }
  };

  const handleFriendClick = (friend) => {
    if (selectedFriend !== friend.name) {
      setSelectedFriend(friend.name); // Select the friend to open the corresponding chat
    }
  };

  const addMessage = React.useCallback((text, sender, name, time) => {
    setMessages(prevMessages => ({
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
          {friendsList.map(friend => (
            <FriendBarItem
              key={friend.name} // Use a unique key for each item
              friend={friend}
              isSelected={selectedFriend === friend.name}
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
            setMessages={setMessages}
            isOnline={friendsList.find(friend => friend.name === selectedFriend)?.status}
          />
        ) : (
          <div>Select a friend to start chatting.</div>
        )}
      </div>
    </div>
  );
};

export default FriendBar;