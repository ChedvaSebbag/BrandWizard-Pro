import express from "express";
import { publishLanding } from "../Controllers/publish.js";

const router = express.Router();

// הגדרת הנתיב לפרסום
router.post("/publish", publishLanding);

export default router;