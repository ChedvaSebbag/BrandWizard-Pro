import dotenv from "dotenv";
dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import express from "express";
import cors from "cors";

import brandingRoute from "./Routes/BrandOptions.js";
import logoRoutes from "./Routes/LogoGenerator.js";
import postersRoutes from "./Routes/postersGenerator.js"; // ✅ חדש

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", logoRoutes);
app.use("/api/branding", brandingRoute);
app.use("/api/posters", postersRoutes); // ✅ חובה

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
