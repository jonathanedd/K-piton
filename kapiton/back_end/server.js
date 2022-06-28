import express from "express";
import data from "./data.js";

const app = express();

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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
