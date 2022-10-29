import express from "express";
import Sofa from "../models/sofas.model.js";

const sofasRouter = express.Router();

sofasRouter.get("/", async (req, res) => {
  const sofas = await Sofa.find();
  res.send(sofas);
});

sofasRouter.get("/slug/:slug", async (req, res) => {
  const sofa = await Sofa.findOne({ slug: req.params.slug });
  if (sofa) {
    res.send(sofa);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

sofasRouter.get("/:id", async (req, res) => {
  const sofa = await Sofa.findById(req.params.id);
  if (sofa) {
    res.send(sofa);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

export default sofasRouter;
