import express from "express";
import data from "../data.js";
import Sofa from "../models/sofas.model.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Sofa.remove({});
  const createdSofas = await Sofa.insertMany(data.sofas);
  res.send({ createdSofas });
});

export default seedRouter;
