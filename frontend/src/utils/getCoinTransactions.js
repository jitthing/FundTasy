import axios from "axios";
export default async function getCoinTransactions() {
  try {
    const response = await axios.get("http://localhost:8000/all_coin_transactions", {
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