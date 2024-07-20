import axios from "axios";
export default async function getTransactions() {
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