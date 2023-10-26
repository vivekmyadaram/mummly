import express, { Application } from "express";
import chalk from "chalk";
import cors from "cors";
import compression from "compression";
import { logger } from "./middlewares/index.js";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { UsersController } from "./modules/users/users.controller.js";
import { ProductsController } from "./modules/products/products.controller.js";

// Initialization
dotenv.config();
const app: Application = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger);

// Route controllers
app.use("/users", UsersController);
app.use("/products", ProductsController);

app.get("/", (_, res) => {
  res.send("<h1>Server is running successfully 🥳</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(chalk.cyanBright(`Listening on port ${process.env.PORT}....✌️`));
});

export { prisma };
