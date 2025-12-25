import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Room related APIs
export const getRoomStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rooms/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching room stats:', error);
    throw error;
  }
};

// Student related APIs
export const registerStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/students/register`, studentData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error registering student:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Failed to register student' };
  }
};

export const getAllStudents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students`);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

// Admin related API
export const getAdminByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admins/${encodeURIComponent(email)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching admin by email:', error.response?.data || error.message);
    throw error;
  }
};

// CREATE ADMIN
export const createAdmin = async (adminData) => {
  const res = await fetch('/admins/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(adminData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create admin');
  return data;
};

