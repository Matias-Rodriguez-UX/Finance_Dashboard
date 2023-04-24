import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productsRoutes from "./routes/products.js";
import transactionsRoutes from "./routes/transactions.js";
import KPI from "./mongodb/modeles/KPI.js";
import Products from "./mongodb/modeles/Products.js";
import Transactions from "./mongodb/modeles/Transactions.js";
import { kpis, products, transactions } from "./data/data.js";

/* General config */
dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/kpi", kpiRoutes);
app.use("/products", productsRoutes);
app.use("/transactions", transactionsRoutes);

/* Mongoose config */

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME ONLY OR AS NEEDED */
    // await mongoose.connection.db.dropDatabase();

    // KPI.insertMany(kpis);
    // Products.insertMany(products);
    // Transactions.insertMany(transactions);
    // console.log("db up");
  })
  .catch((error) => console.log(`${error} did not connect`));
