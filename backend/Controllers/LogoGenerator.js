import { generateLogoImage } from "../Services/LogoGenerator.js";

export const generateLogo = async (req, res) => {
  try {
    // התיקון: מעבירים את כל req.body (שהוא אובייקט המיתוג) לפונקציה
    const base64Image = await generateLogoImage(req.body); 
    
    res.json({ imageUrl: base64Image });
  } catch (error) {
    console.error("Controller Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};