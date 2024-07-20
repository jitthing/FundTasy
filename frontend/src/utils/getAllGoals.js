import axios from "axios";
export default async function getAllGoals() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/all_goals`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch goals: " + error.message);
  }
}
