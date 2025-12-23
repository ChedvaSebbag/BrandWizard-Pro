import express from "express";
import { createLandingPage } from "../Controllers/landingPage.js";

const router = express.Router();

router.post("/", createLandingPage);

export default router;
