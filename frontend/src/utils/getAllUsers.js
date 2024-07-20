import axios from "axios";
export default async function getAllUsers() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/get_usernames`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch usernames: " + error.message);
  }
}
