import axios from "axios";

export default async function updatePig( userId, modelUrl, currentModel ) {
    const len = modelUrl.length;
    const updated = modelUrl.substring(7, len-4);
    const clen = currentModel.length;
    const current = currentModel.substring(7, clen-4);
    try {
      //console.log("trying to update pig...");
        const response = await axios.post(
          "http://localhost:8000/update_display_pig",
          { 
            userId,current,updated 
          }
        );
        //console.log(response.data);
        return response.data;
    } catch(error) {
        console.error("Failed to update display pig...");
    }
}