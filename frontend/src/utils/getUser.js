import axios from 'axios';

export default async function getUser() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user_info`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    // Return an object with both the user data and the success message
    return {
      user: response.data.user,
      message: "User data fetched successfully"
    }; 
  } catch (error) {
    throw new Error("Failed to fetch user data: " + error.message);
  }
}