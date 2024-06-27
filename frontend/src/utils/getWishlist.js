import axios from "axios";
// Takes in _id and returns all wishlist items
export default async function getWishlist(userId) {
  try {
    const response = await axios.post("http://localhost:8000/all_wishlist_items", {
      username: userId,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw error;
  }
}