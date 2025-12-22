import express from "express";
// מייבאים את שתי הפונקציות מהקונטרולר
import { generateLogo, convertToSvg } from "../Controllers/LogoGenerator.js";

const router = express.Router();

// הנתיב הקיים
router.post("/generate-logo", generateLogo);

// הנתיב החדש להמרה
router.post("/convert-to-svg", convertToSvg);

export default router;