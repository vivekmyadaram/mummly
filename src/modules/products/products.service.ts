import { Request, Response } from "express";
import { log } from "../../utils/logger.js";
import { sendSuccess } from "../../utils/responses.js";

async function getProducts(req: Request, res: Response) {
  try {
    return sendSuccess(res, { data: [{ name: "Apple" }] });
  } catch (err) {
    console.log("error", err);
    log.error("Internal Servce Error");
    res.status(500).send("Internal Servce Error");
  }
}

export { getProducts };
