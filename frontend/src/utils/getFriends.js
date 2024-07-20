import axios from "axios";
export default async function getFriends() {
  try {
    const response = await axios.get("http://localhost:8000/fetch_friends", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw error;
  }
}