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

const searchUsername = async (username) => {
    try {
        const response = await axios.get(`${SEARCH_API_URL}?username=${username}`);
        return response.data.success;
    } catch (error) {
        console.log('Failed to search username:', error);
        throw error;
    }
}

export { fetchUserData, searchUsername };