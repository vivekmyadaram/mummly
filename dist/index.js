import express from "express";
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
const app = express();
const prisma = new PrismaClient();
// Middlewares
app.use(cors({ origin: "*" }));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger);
// Route controllers
app.use("/users", UsersController);
app.use("/products", ProductsController);
app.listen(process.env.PORT, () => {
    console.log(chalk.cyanBright(`Listening on port http://localhost:${process.env.PORT}`));
});
export { prisma };
//# sourceMappingURL=index.js.map