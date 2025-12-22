import express from "express";
import { generatePosters } from "../Controllers/postersGenerator.js";

const router = express.Router();

router.post("/", generatePosters);

export default router;
