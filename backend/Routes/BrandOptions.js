import express from "express";
import { generateBranding } from "../Controllers/BrandOptions.js";

const router = express.Router();

router.post("/", generateBranding);

export default router;
