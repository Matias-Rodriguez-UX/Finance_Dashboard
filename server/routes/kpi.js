import express from "express";
import KPI from "../mongodb/modeles/KPI.js";

const router = express.Router();

router.get("/kpis", async (req, res) => {
  try {
    const kpis = await KPI.find();
    res.status(200).send(kpis);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

export default router;
