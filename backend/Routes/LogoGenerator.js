import express from "express";
// מייבאים את שתי הפונקציות מהקונטרולר
import { generateLogo } from "../Controllers/LogoGenerator.js";

const router = express.Router();

// הנתיב הקיים
router.post("/generate-logo", generateLogo);



export default router;