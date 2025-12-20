// backend/Services/LogoGenerator.js
import fetch from 'node-fetch'; // וודאי שהחבילה מותקנת: npm install node-fetch

export const generateLogoImage = async (imagePrompt) => {
  try {
    // 1. ניקוי הפרומפט מתווים שעלולים לשבור את ה-URL או להחשיד כבוט
    const cleanPrompt = imagePrompt
      .replace(/[\[\]]/g, '') // מסיר סוגריים מרובעים
      .replace(/["']/g, '')   // מסיר גרשיים
      .trim();
    
    const encodedPrompt = encodeURIComponent(cleanPrompt);
    const seed = Math.floor(Math.random() * 1000000);
    
    // 2. שימוש בכתובת ה-CDN הישירה שהיא לרוב יציבה יותר
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&model=flux&seed=${seed}`;

    console.log("🎨 Attempting to fetch logo from:", url);

    // 3. הוספת User-Agent כדי למנוע חסימת 403/Fetch Failed
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`שרת התמונות החזיר שגיאה: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer).toString('base64');
    
  } catch (error) {
    console.error("🔥 Image Fetch Error:", error.message);
    throw error;
  }
};