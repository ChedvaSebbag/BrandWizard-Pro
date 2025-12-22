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
export const convertToSvg = async (req, res) => {
  try {
    const { imageUrl } = req.body; // מקבלים את ה-base64 מהלקוח
    
    if (!imageUrl) {
      return res.status(400).json({ error: "No image provided" });
    }

    // הופכים את ה-base64 לבאפר (Buffer) שהספרייה יודעת לקרוא
    const buffer = Buffer.from(imageUrl, 'base64');

    // הגדרות המרה לתוצאה נקייה ומקצועית
    const params = {
      threshold: 128,       // רגישות לצבע
      color: '#000000',     // מייצר וקטור שחור (סטנדרט בלוגואים)
      turnPolicy: 'black',  
      turdSize: 100,        // מסנן רעשים קטנים (פיקסלים בודדים)
      optCurve: true,
      alphaMax: 1,
      optTolerance: 0.2
    };

    // ביצוע ההמרה
    potrace.trace(buffer, params, (err, svg) => {
      if (err) {
        console.error("Potrace Error:", err);
        return res.status(500).json({ error: "Conversion failed" });
      }
      
      // מחזירים את ה-SVG המוכן ללקוח
      res.json({ svg });
    });

  } catch (error) {
    console.error("SVG Controller Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};