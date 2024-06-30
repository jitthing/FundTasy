import axios from "axios";
// Takes in _id and returns all wishlist items
export default async function getTransactions(username) {
  try {
    const response = await axios.get("http://localhost:8000/all_transactions", {
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