import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seed.routes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use("/api/seed", seedRouter);

app.get("/api/sofas", (req, res) => {
  res.send(data.sofas);
});
app.get("/api/sofas/slug/:slug", (req, res) => {
  const sofa = data.sofas.find((x) => x.slug === req.params.slug);
  if (sofa) {
    res.send(sofa);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

app.get("/api/sofas/:id", (req, res) => {
  const sofa = data.sofas.find((x) => x._id === req.params.id);
  if (sofa) {
    res.send(sofa);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

app.get("/api/chairs", (req, res) => {
  res.send(data.chairs);
});

app.get("/api/chairs/:id", (req, res) => {
  const chair = data.chairs.find((x) => x._id === req.params.id);
  if (chair) {
    res.send(chair);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
