import dotenv from "dotenv";
dotenv.config();
console.log("🔑 GEMINI FROM APP:", process.env.GEMINI_API_KEY);

import express from "express";
import cors from "cors";

import brandingRoute from "./Routes/BrandOptions.js";
import logoRoutes from "./Routes/LogoGenerator.js";

// ... שאר ההגדרות של השרת (express.json וכדומה)


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", logoRoutes);
app.use("/api/branding", brandingRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
