// backend/Controllers/BrandOptions.js
import { generateBrandingFromAI } from "../Services/BrandOptions.js";

export const generateBranding = async (req, res) => {
  try {
    console.log("📥 Receiving branding request...");
    let resultText = await generateBrandingFromAI(req.body);

    // חילוץ ה-JSON בצורה בטוחה
    const firstBracket = resultText.indexOf('{');
    const lastBracket = resultText.lastIndexOf('}');
    
    if (firstBracket === -1 || lastBracket === -1) {
      console.error("❌ AI Response was not JSON:", resultText);
      throw new Error("ה-AI לא החזיר פורמט נתונים תקין");
    }

    const cleanJson = resultText.substring(firstBracket, lastBracket + 1);
    const parsedResult = JSON.parse(cleanJson);

    console.log("✅ Branding generated and parsed successfully");
    return res.json({ result: parsedResult });

  } catch (err) {
    console.error("🔥 Controller Error:", err.message);
    return res.status(500).json({ 
      error: "נכשלנו ביצירת המיתוג",
      details: err.message 
    });
  }
};