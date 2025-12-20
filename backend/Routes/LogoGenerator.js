// backend/Routes/LogoRoutes.js
import express from "express";
import { generateLogo } from "../Controllers/LogoGenerator.js";

const router = express.Router();

router.post("/generate-logo", generateLogo);

export default router;