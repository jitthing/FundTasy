import axios from "axios";
export default async function getTransactions() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/all_transactions`, {
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