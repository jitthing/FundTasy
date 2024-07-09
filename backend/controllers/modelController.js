const Models = require("../models/modelModel");

const getAllModels = async (req, res) => {
  const cursor = await Models.find({});
  //   const dbModels = await cursor.toArray();
  if (cursor === null) {
    return res.status(400).json({ message: "No Models Found" });
  }
  return res.status(200).json(cursor);
};

const create_model = async (req, res) => {
  const newModel = req.body;

  const foundModel = await Models.findOne({ modelName: newModel.name });

  if (foundModel !== null) {
    return res.status(400).json({ message: "Model already exists" });
  }

  const createdModel = await Models.create({
    modelName: newModel.name,
  });

  return res.status(200).json({ message: "Model created succesfully" });
};

module.exports = { getAllModels, create_model };
