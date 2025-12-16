import { generateBrandingFromAI } from "../Services/BrandOptions.js";

export const generateBranding = async (req, res) => {
  try {
    console.log("📥 /api/branding body:", req.body);

    const result = await generateBrandingFromAI(req.body);

    return res.json({ result });
  } catch (err) {
    console.error("🔥 BRANDING ERROR:", err);
    return res.status(500).json({
      error: "Brand generation failed",
      details: err?.message || String(err),
    });
  }
};
