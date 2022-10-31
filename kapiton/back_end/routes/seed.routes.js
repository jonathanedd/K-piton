import express from "express";
import data from "../data.js";
import Sofa from "../models/sofas.model.js";
import User from "../models/users.model.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Sofa.remove({});
  const createdSofas = await Sofa.insertMany(data.sofas);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdSofas, createdUsers });
});

export default seedRouter;
