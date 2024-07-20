import axios from "axios";
export default async function getWishlist() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/all_in_progress_items`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to wishlist: " + error.message);
  }
}
