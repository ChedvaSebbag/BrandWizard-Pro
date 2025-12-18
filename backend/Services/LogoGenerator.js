// backend/Services/LogoGenerator.js
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenAI(process.env.GOOGLE_API_KEY);

export const generateLogoImage = async (imagePrompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "imagen-3" }); 

    const result = await model.generateContent(imagePrompt);
    const response = await result.response;
    
    // Imagen מחזיר inlineData המכיל את ה-Base64 של התמונה
    const base64Data = response.candidates[0].content.parts[0].inlineData.data; 
    return base64Data; 
  } catch (error) {
    console.error("LogoGenerator Service Error:", error);
    throw new Error("נכשלנו ביצירת הלוגו הטכני");
  }
};