import axios from "axios";

export default async function updatePig(userId, modelUrl, currentModel) {
  const len = modelUrl.length;
  const updated = modelUrl.substring(7, len - 4);
  const clen = currentModel.length;
  const current = currentModel.substring(7, clen - 4);
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/update_display_pig`,
      {
        userId,
        current,
        updated,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update display pig...");
  }
}