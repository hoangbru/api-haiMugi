import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongoAtlas } from "./src/config/connect.js";
import { categoriesRouter, productsRouter, orderRouter, authRouter, colorRouter, sizeRouter } from "./src/routes/index.js";

const app = express();
const port = 8080;
const routers = [productsRouter, categoriesRouter, orderRouter, authRouter, colorRouter, sizeRouter];
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/api", ...routers);

connectMongoAtlas();

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
