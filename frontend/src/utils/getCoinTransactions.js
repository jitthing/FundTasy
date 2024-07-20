import axios from "axios";
export default async function getCoinTransactions() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/all_coin_transactions`, {
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