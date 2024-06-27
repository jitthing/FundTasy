import axios from 'axios';

export default async function getUser() {
  try {
    const getToken = () => {
      return localStorage.getItem("authToken");
    };
    const token = getToken();
    const response = await axios.get("http://localhost:8000/user_info", {
      headers: {
        Authorization: `Bearer ${token}`,
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