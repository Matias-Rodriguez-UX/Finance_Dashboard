import express from "express";
import Products from "../mongodb/modeles/Products.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

export default router;
