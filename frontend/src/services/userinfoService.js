import axios from 'axios';

const API_URL = 'http://192.168.140.238:5000/api/userinfo/';

const fetchUserData = async () => {
    try {
        const token = localStorage.getItem('token');  // retrieve token from localStorage
        const userId = localStorage.getItem('userId'); // retrieve userId from localStorage
        const response = await axios.get(`${API_URL}?userId=${userId}`, {
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

export { fetchUserData };