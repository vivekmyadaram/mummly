import express, { Request, Response } from "express";
import { authMiddleWare } from "../../middlewares/index.js";
import { getProducts } from "./products.service.js";

const router = express.Router();

router.use(authMiddleWare);

router.get("/", getProducts);

export { router as ProductsController };
