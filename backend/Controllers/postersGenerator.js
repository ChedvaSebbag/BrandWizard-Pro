import { createPosters } from "../Services/postersGenerator.js";

export const generatePosters = async (req, res) => {
  try {
    console.log("📥 POSTERS BODY:", req.body);

    // ✅ בדיקת הגנה – חובה
    if (!req.body || !req.body.businessName) {
      return res.status(400).json({
        message: "Missing or invalid branding data",
      });
    }

    const posters = await createPosters(req.body);

    res.status(200).json({ posters });
  } catch (error) {
    console.error("🔥 Poster generation error:", error.message);

    // ✅ מחזירים ל־frontend את השגיאה האמיתית
    res.status(500).json({
      message: error.message || "Failed to generate posters",
    });
  }
};
