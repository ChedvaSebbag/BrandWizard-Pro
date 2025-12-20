// backend/Services/BrandOptions.js
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI(process.env.GOOGLE_API_KEY);

export const generateBrandingFromAI = async ({ essence, audience, style, tone }) => {
  try {
 const prompt = `
# Role: You are "BrandWizard Pro", an elite Creative Director and Brand Strategist.
# Respond strictly in the same language as the input (Hebrew or English).

# User Input:
**Core Essence**: "${essence}"
**Tone**: "${tone}"
**Target Audience**: "${audience}"
**Visual Style**: "${style}"

# Task:
Generate 3 distinct brand concepts. Each concept must feel like a complete visual world.

# Naming & Design Strict Rules:
1. NAMES: 3 original, prestigious brand names (4-7 letters).
   - Each name MUST have a Hebrew version and an English version that are phonetically identical.
2. COLORS: For each concept, select exactly 3 professional colors (Primary, Secondary, Accent) in Hex format.
3. LOGO QUALITY: Masterpiece quality, professional minimalist vector logo, flat design, solid white background, sharp edges.
   - NO gradients, NO 3D shadows, NO realistic textures. Focus on geometric symmetry and Golden Ratio.

# Output: Strictly valid JSON.
{
  "strategy": {
    "overview": "Strategic brand overview in user's language",
    "market_gap": "Analysis of market opportunity",
    "target_audience_insight": "Psychological trigger"
  },
  "design_styles": [
    {
      "style_id": 1,
      "style_name": "...",
      "brand_name_hebrew": "...",
      "brand_name_english": "...",
      "tagline": "...",
      "color_palette": ["#Hex1", "#Hex2", "#Hex3"],
      "design_reasoning": "Explain the artistic choices here",
      "ai_image_prompt_base": "Professional minimalist vector logo, flat design, solid white background, sharp edges, geometric symmetry. A [DESCRIBE_SYMBOL] using strictly the colors [COLORS]. [TEXT_INSTRUCTION]. High quality, vector style, 8k resolution."
    }
    // Repeat for style 2 and 3
  ]
}
`;

    console.log("🚀 Generating 3 Brand Concepts via @google/genai...");

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return response.text;

  } catch (error) {
    console.error("🔥 BRANDING ERROR:", error.message);
    throw new Error("נכשלנו ביצירת המיתוג בשרת ה-AI");
  }
};