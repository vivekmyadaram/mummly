import express from "express";
import { authMiddleWare } from "../../middlewares/index.js";
const router = express.Router();
router.use(authMiddleWare);
router.get("/");
export { router as ProductsController };
//# sourceMappingURL=products.controller.js.map