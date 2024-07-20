import axios from "axios";
export default async function getAllUsers() {
  try {
    const response = await axios.get("http://localhost:8000/get_usernames", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch usernames: " + error.message);
  }
}
