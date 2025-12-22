import potrace from "potrace";
// שומרים על הייבוא הקיים שלך מה-Service
import { generateLogoImage } from "../Services/LogoGenerator.js"; 

// --- הפונקציה הקיימת ליצירת לוגו (לא נגענו בה) ---
export const generateLogo = async (req, res) => {
  try {
    const base64Image = await generateLogoImage(req.body); 
    res.json({ imageUrl: base64Image });
  } catch (error) {
    console.error("Controller Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// --- הפונקציה החדשה להמרת תמונה ל-SVG ---
