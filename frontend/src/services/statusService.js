import axios from 'axios';

const API_URL = 'http://192.168.140.238:3003/api/status/';

const getFriendList = async (userId) => {
  const response = await axios.get(`${API_URL}?userId=${userId}`);
  return response.data.friends;
};

export default getFriendList;
