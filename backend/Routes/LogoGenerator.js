import express from "express";
import { generateLogo } from "../Controllers/LogoGenerator.js";

const router = express.Router();

// הגדרת נתיב POST לקבלת הפרומפט ויצירת הלוגו
router.post("/generate-logo", generateLogo);

export default router;