import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * יצירת דף נחיתה באמצעות Gemini (יציב)
 */
export async function generateLandingPage(data) {
  const safeData = {
    businessName: data.businessName || "",
    businessDescription: data.businessDescription || "",
    targetAudience: data.targetAudience || "",
    essence: data.essence || "גישה מקצועית ואמינה",
    tone: data.tone || "נעים וברור",
    tagline: data.tagline || "",
  };

  const prompt = `
You are a branding and UX copywriting expert.

Using the following business data, generate content for a one-page landing page
for a NEW business.

Business data:
- Name: ${safeData.businessName}
- Description: ${safeData.businessDescription}
- Brand essence: ${safeData.essence}
- Target audience: ${safeData.targetAudience}
- Tone of voice: ${safeData.tone}
- Main tagline: ${safeData.tagline}

Rules:
- Keep everything concise and professional
- No buzzwords or marketing clichés
- Write for a first impression landing page
- Do NOT invent personal stories

Return ONLY valid JSON in this exact structure:
{
  "hero": { "title": "", "subtitle": "", "tagline": "" },
  "about": "",
  "services": [],
  "whyUs": [],
  "brandStatement": "",
  "cta": ""
}
`.trim();

  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const rawText = response.text;

    if (!rawText) {
      throw new Error("Empty AI response");
    }

    const cleaned = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Landing Page AI Error:", error);
    throw new Error("Failed to generate landing page content");
  }
}
