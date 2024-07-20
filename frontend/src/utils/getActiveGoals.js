import axios from "axios";
export default async function getActiveGoals() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/all_active_items`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch goals: " + error.message);
  }
}
