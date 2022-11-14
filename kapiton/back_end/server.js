import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seed.routes.js";
import sofasRouter from "./routes/sofas.routes.js";
import userRouter from "./routes/users.routes.js";
import orderRouter from "./routes/order.routes.js";

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

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/seed", seedRouter);

app.use("/api/sofas", sofasRouter);

app.use("/api/users", userRouter);

app.use("/api/orders", orderRouter);

//ERROR HANDLER FOR EXPRESS
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//api chairs request
app.get("/api/chairs", (req, res) => {
  res.send(data.chairs);
});

app.get("/api/chairs/slug/:slug", (req, res) => {
  const chair = data.chairs.find((x) => x.slug === req.params.slug);
  if (chair) {
    res.send(chair);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

app.get("/api/chairs/:id", (req, res) => {
  const chair = data.chairs.find((x) => x._id === req.params.id);
  if (chair) {
    res.send(chair);
  } else {
    res.status(404).send({ message: "Product was not found" });
  }
});

//api tables request
app.get("/api/tables", (req, res) => {
  res.send(data.tables);
});

app.get("/api/tables/slug/:slug", (req, res) => {
  const table = data.tables.find((x) => x.slug === req.params.slug);
  if (table) {
    res.send(table);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

app.get("/api/tables/:id", (req, res) => {
  const table = data.tables.find((x) => x._id === req.params.id);
  if (table) {
    res.send(table);
  } else {
    res.status(404).send({ message: "Product was not found" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
