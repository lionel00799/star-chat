import axios from 'axios';

const API_URL = 'http://192.168.140.238:3003/api/status/';
const FRIEND_API_URL = 'http://192.168.140.238:3003/api/friendStatus/';

const getFriendList = async (userId) => {
  const response = await axios.get(`${API_URL}?userId=${userId}`);
  return response.data.friends;
};

const getFriendStatus = async (friendname) => {
  const response = await axios.get(`${FRIEND_API_URL}?friendname=${friendname}`);
  return response.data.status;
}

export { getFriendList, getFriendStatus };
