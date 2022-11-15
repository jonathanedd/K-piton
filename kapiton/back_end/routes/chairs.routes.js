import express from "express";
import Chair from "../models/chairs.model.js";

const chairRouter = express.Router();

chairRouter.get("/", async (req, res) => {
  const chairs = await Chair.find();
  res.send(chairs);
});

chairRouter.get("/slug/:slug", async (req, res) => {
  const chair = await Chair.findOne({ slug: req.params.slug });
  if (chair) {
    res.send(chair);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

chairRouter.get("/:id", async (req, res) => {
  const chair = await Chair.findById(req.params.id);
  if (chair) {
    res.send(chair);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

export default chairRouter;
