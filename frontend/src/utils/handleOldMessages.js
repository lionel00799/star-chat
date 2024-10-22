const formatMessages = (messages) => {
    // Retrieve the current user's ID from localStorage
    const userId = localStorage.getItem("userId");

    // Format each message
    return messages.map((msg) => {
      const isSender = msg.sender._id.toString() === userId;
      return {
        text: msg.message,
        sender: isSender ? "user" : "other",
        name: isSender ? "You" : msg.sender.username,
        time: new Date(msg.timestamp).toLocaleTimeString(),
      };
    });
  };

  export default formatMessages