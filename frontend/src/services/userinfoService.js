import axios from 'axios';

const FETCH_API_URL = 'http://192.168.140.238:3003/api/userinfo/';
const SEARCH_API_URL = 'http://192.168.140.238:3003/api/addfriend/';

const fetchUserData = async () => {
    try {
        const token = localStorage.getItem('token');  // retrieve token from localStorage
        const userId = localStorage.getItem('userId'); // retrieve userId from localStorage
        const response = await axios.get(`${FETCH_API_URL}?userId=${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}` // include token if required
            }
        });
        console.log('User data fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.log('Failed to fetch user data:', error);
        throw error;
    }
};

const searchFriendname = async (friendname, userId) => {
    try {
        const response = await axios.get(`${SEARCH_API_URL}?friendname=${friendname}&userId=${userId}`);
        return response.data.success;
    } catch (error) {
        console.log('Failed to search friendname:', error);
        throw error;
    }
}

export { fetchUserData, searchFriendname };