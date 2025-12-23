import dotenv from "dotenv";
dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import express from "express";
import cors from "cors";

import brandingRoute from "./Routes/BrandOptions.js";
import logoRoutes from "./Routes/LogoGenerator.js";
import postersRoutes from "./Routes/postersGenerator.js"; // ✅ חדש
import landingPageRoutes from "./Routes/landingPage.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", logoRoutes);
app.use("/api/branding", brandingRoute);
app.use("/api/posters", postersRoutes); // ✅ חובה
app.use("/api/landing-page", landingPageRoutes); // ✅ חובה

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
