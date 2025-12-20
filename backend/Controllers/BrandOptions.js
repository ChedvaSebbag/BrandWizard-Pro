import { generateBrandingFromAI } from "../Services/BrandOptions.js";

export const generateBranding = async (req, res) => {
  try {
    let resultText = await generateBrandingFromAI(req.body);

    const firstBracket = resultText.indexOf('{');
    const lastBracket = resultText.lastIndexOf('}');
    
    if (firstBracket === -1 || lastBracket === -1) {
      throw new Error("Invalid JSON format from AI");
    }

    const cleanJson = resultText.substring(firstBracket, lastBracket + 1);
    const parsedResult = JSON.parse(cleanJson);

    return res.json({ result: parsedResult });
  } catch (err) {
    console.error("🔥 Controller Error:", err);
    return res.status(500).json({ error: "Failed to parse branding data" });
  }
};