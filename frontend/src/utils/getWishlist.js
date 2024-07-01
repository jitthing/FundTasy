import axios from "axios";
export default async function getWishlist() {
  try {
    const response = await axios.get("http://localhost:8000/all_wishlist_items", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to wishlist: " + error.message);
  }
}
