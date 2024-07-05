import axios from "axios";
export default async function getOwnedPigs() {
  try {
    const response = await axios.get("http://localhost:8000/get_owned_pigs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch goals: " + error.message);
  }
}
