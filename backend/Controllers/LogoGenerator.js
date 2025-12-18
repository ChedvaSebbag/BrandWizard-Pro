// backend/Controllers/LogoGenerator.js
import { generateLogoImage } from "../Services/LogoGenerator.js";

export const generateLogo = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "פרומפט חובה" });

    const base64Image = await generateLogoImage(prompt);
    
    // מחזירים את המחרוזת כ-imageUrl
    res.json({ imageUrl: base64Image });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};