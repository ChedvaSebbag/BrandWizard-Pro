import { generateLogoImage } from "../Services/LogoGenerator.js";

export const generateLogo = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "פרומפט חובה ליצירת לוגו" });
    }

    const base64Image = await generateLogoImage(prompt);
    
    // שליחת התשובה ללקוח
    res.json({ imageUrl: base64Image });
  } catch (error) {
    console.error("Controller Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};