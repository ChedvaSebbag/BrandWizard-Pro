import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI(process.env.GOOGLE_API_KEY);

export const generateBrandingFromAI = async ({ essence, audience, style, tone }) => {
  try {
    // התיקון המרכזי: הסרנו את סימני ה-$ מהפרומפט כדי שלא יחשבו כמשתני JS
const prompt = `
# Role: You are "The Brand Architect", an elite Brand Strategist and Senior Visual Designer. 
# Your expertise is creating high-end, category-defining brand identities.
# Respond strictly in the same language as the input (Hebrew or English).

# User Input:
**Core Essence**: "${essence}"
**Tone**: "${tone}"
**Target Audience**: "${audience}"
**Visual Style**: "${style}"

# Task:
Develop 3 sophisticated and distinct brand concepts based on the input.

# CRITICAL BRAND NAME RULES:
- ABSOLUTELY NO descriptive or generic names (e.g., no "The Coffee House", no "QuickFix").
- AIM FOR: Evocative, metaphorical, short, or abstract names that feel like global premium brands.
- Each name must be unique and resonate with the brand's core essence.

# Output: Strictly valid JSON matching the provided schema.

# AI Image Prompt Rules (For ai_image_prompt field):
- Start: "Professional minimalist vector logo, flat design, solid white background".
- Icon: Describe a specific, simple geometric icon (e.g., "A stylized abstract lotus", "An interlocking hexagonal knot").
- Typography: Specify the font style (e.g., "Minimalist bold sans-serif", "Elegant high-contrast serif").
- Execution: "Clean sharp lines, high contrast, balanced composition, negative space, vector aesthetic, 8k resolution, no gradients, no shadows".

{
  "strategy": {
    "overview": "A high-level strategic overview of the branding direction.",
    "market_gap": "What this brand will offer visually and conceptually that competitors lack.",
    "target_audience_insight": "The psychological reason why this audience will connect with the brand."
  },
  "design_styles": [
    {
      "style_id": 1,
      "style_name": "e.g., Organic Minimalism",
      "brand_name": "Unique evocative name",
      "tagline": "Short and punchy tagline",
      "color_palette": ["#HEX1", "#HEX2", "#HEX3"],
      "visual_description": "Detailed description of the visual language (shapes, lines, layout).",
      "design_reasoning": "How this specific design solves the business's goals.",
      "ai_image_prompt": "Professional minimalist vector logo, flat design, solid white background. [Specific Icon Description] using [color_palette]. Featuring the text '[brand_name]' in [font style] typography. Clean sharp lines, negative space."
    }
  ]
}
`;
    console.log("🚀 Generating 3 Brand Concepts via @google/genai...");

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return typeof response.text === 'function' ? response.text() : response.text;

  } catch (error) {
    console.error("🔥 BRANDING ERROR:", error.message);
    throw new Error("נכשלנו ביצירת המיתוג בשרת ה-AI");
  }
};