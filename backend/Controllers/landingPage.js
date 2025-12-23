import { generateLandingPage } from "../Services/landingPage.js";

// בתוך ה-Controller שלך (landingPage.js)
export async function createLandingPage(req, res) {
  try {
    const result = await generateLandingPage(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error("Landing Page Controller Error:", error);
    res.status(500).json({ 
      error: "נכשלה יצירת תוכן לדף הנחיתה", 
      details: error.message 
    });
  }
}