import axios from "axios";

const mypigs = {
  basic: "Basic",
  copper: "Copper",
  steel: "Steel",
  "24k": "24K",
  conjoined: "Conjoined",
  green: "Green",
  panda: "Panda",
  coke: "Coke",
  fanta: "Fanta",
  ninja: "Ninja",
  santa: "Santa",
  chef: "Chef",
  evil: "Evil",
  angel: "Angel",
  cowboy: "Cowboy",
};

export default mypigs;

const getModels = async () => {
  const response = await axios.post("http://localhost:8000/all_models");
  return response.body;
};

// const mypigstry = getModels();
/* 
eventually this code will be replaced by retrieving all available models from the database
*/
