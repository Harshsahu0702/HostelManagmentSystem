import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getRoomStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rooms/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching room stats:', error);
    throw error;
  }
};
