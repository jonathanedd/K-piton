import express from "express";
import data from "./data.js";

const app = express();

app.get("/api/sofas", (req, res) => {
  res.send(data.sofas);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
