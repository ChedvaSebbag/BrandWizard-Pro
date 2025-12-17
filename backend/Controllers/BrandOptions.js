import { generateBrandingFromAI } from "../Services/BrandOptions.js";

export const generateBranding = async (req, res) => {
  try {
    console.log("📥 /api/branding body:", req.body);

    // קבלת התוצאה מה-AI (string)
    let resultText = await generateBrandingFromAI(req.body);

    // 1️⃣ הסרת סימוני Markdown אם קיימים (```json ... ``` או ``` ... ```)
    resultText = resultText.replace(/```json|```/g, "").trim();

    // 2️⃣ המרה ל-JSON
    const parsedResult = JSON.parse(resultText);

    return res.json({ result: parsedResult });
  } catch (err) {
    console.error("🔥 BRANDING ERROR:", err);

    return res.status(500).json({
      error: "Brand generation failed",
      message: err.message || "Unknown error",
    });
  }
};
