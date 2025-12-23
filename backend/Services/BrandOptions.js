import { GoogleGenAI } from '@google/genai';
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateBrandingFromAI = async ({ essence, audience, style, tone }) => {

// const prompt = `
// # Role: 
// You are a Universal Brand Architect. You create names that are simple, premium, and have "Instant Context" – anyone hearing the name should immediately know the field of expertise, whether it is a physical product (like rugs) or an abstract service (like math).

// # Input Data:
// - Business Essence: "${essence}"
// - Desired Tone: "${tone}"
// - Target Audience: "${audience}"
// - Visual Style: "${style}"

// # PART 1: DYNAMIC CONTEXT RULES

// RULE 1: THE "CORE ELEMENT" IDENTIFICATION
// Analyze "${essence}" and identify the single most recognizable element of that field:
// - **IF PHYSICAL:** Identify the material or object (e.g., Rugs -> Silk, Knot, Wool; Bakery -> Crust, Flour, Bake).
// - **IF SERVICE/ABSTRACT:** Identify the symbol, tool, or action (e.g., Math -> Plus, Point, Solve, Math; Optics -> View, Glass, Look).
// - **MANDATORY:** One part of the name MUST use this "Core Element" or a very close synonym in simple English.

// RULE 2: NO "GHOST" NAMES (STRICT FORBIDDEN LIST)
// - **NEVER** use words that provide zero industry context: Core, Base, Link, Maven, Prime, Elite, Logic, True, Form, Line, Apex, Global, System, Next, Plus (unless it's math).
// - **WHY:** These words create "Ghost Brands" that look like generic software or consulting firms.

// RULE 3: INTERNATIONAL & SIMPLE (12-YEAR-OLD TEST)
// - Use only common words that are easy for non-native speakers to pronounce and understand.
// - Format: [Core Element] + [Simple Value/Vibe Word] (e.g., "MathStar", "SilkArt", "CakePro").

// # PART 2: VISUAL CLARITY (NO GENERIC ICONS)
// - In 'extended_designer_style', you MUST focus EXCLUSIVELY on the physical attributes or symbols of "${essence}".
// - **STRICTLY FORBIDDEN:** Do not include icons of houses, buildings, or generic corporate globes.
// - **FOCUS:** Describe specific textures (for products) or specific symbols (for services).

// # Output Format (JSON):
// Return ONLY a strictly valid JSON. 
// NOTE: 'strategy', 'reasoning', 'tagline' -> MUST BE IN HEBREW.

// {
//   "strategy": {
//     "overview": "ניתוח אסטרטגי: איך השם מחבר את הלקוח לליבת העסק (בעברית).",
//     "market_gap": "הזדמנות: למה שם ממוקד תחום עדיף על שם כללי (בעברית).",
//     "target_audience_insight": "תובנה על הקהל (בעברית)."
//   },
//   "design_styles": [
//     {
//       "style_id": 1,
//       "style_name": "Industry Precision",
//       "brand_name_english": "EnglishName (Simple & Relevant)",
//       "brand_name_hebrew": "תעתיק פונטי",
//       "tagline": "סלוגן קצר וקולע (בעברית)",
//       "color_palette": ["#HEX1", "#HEX2", "#HEX3"],
//       "design_reasoning": "הסבר למה השם הזה משייך את העסק מיד לתחום ה[industry] ולא נשמע כללי (בעברית).",
//       "extended_designer_style": "ENGLISH ONLY: A detailed 3-4 sentence prompt for the logo. Focus on specific symbols/textures of the industry. NO GENERIC ICONS like houses or office buildings."
//     },
//     {
//       "style_id": 2,
//       "style_name": "Clean Modernity",
//       "brand_name_english": "...",
//       "brand_name_hebrew": "...",
//       "tagline": "...",
//       "color_palette": ["#...", "#...", "#..."],
//       "design_reasoning": "...",
//       "extended_designer_style": "..."
//     },
//     {
//       "style_id": 3,
//       "style_name": "Premium Touch",
//       "brand_name_english": "...",
//       "brand_name_hebrew": "...",
//       "tagline": "...",
//       "color_palette": ["#...", "#...", "#..."],
//       "design_reasoning": "...",
//       "extended_designer_style": "..."
//     }
//   ]
// }
// `.trim();
const prompt = `
# Role: 
You are a High-End Brand Naming Expert & Visual Strategist. Your goal is to create names that are punchy, premium, and provide "Instant Recognition" – the moment someone hears the name or sees the logo, they must know EXACTLY what is being sold.

# Input Data:
- Business Essence: "${essence}"
- Desired Tone: "${tone}"
- Target Audience: "${audience}"
- Visual Style: "${style}"

# PART 1: THE "INSTANT RECOGNITION" NAMING RULES

RULE 1: THE PRODUCT DNA (MANDATORY ANCHOR)
Identify the single most iconic physical object or material of "${essence}". 
- **MANDATORY:** One part of the name MUST use this "Anchor" word. 
- **If Rugs:** Silk, Knot, Weave, Rug, Thread. (NEVER use "Home" or "House").
- **If Food:** Chef, Taste, Bake, Crust, Feast, Grill. (NEVER use "Saturday" or "Table").
- **If Optics:** Lens, Glass, View, Look, Sight.
- **If Math:** Math, Solve, Point, Plus.

RULE 2: NO "GHOST" OR "REAL ESTATE" WORDS
- **STRICTLY FORBIDDEN:** Core, Base, Link, Maven, Prime, Elite, Logic, True, Form, Line, Apex, Global, System, Next, Home, House, Place, Studio.
- **WHY:** These words hide the product. We want to SHOW the product.

RULE 3: TWO-SYLLABLE PUNCH
- Keep names short and powerful. 
- Use "International English" that is phonetically natural in Hebrew.
- Format: [Product DNA Word] + [Simple Quality Word] (e.g., "SilkArt", "BakePro", "LensGold").

# PART 2: THE PRODUCT-DRIVEN VISUAL BRIEF
In 'extended_designer_style', you must provide a **6-8 sentence prompt** that anchors the logo in the product's physical reality.
- **Focus:** Describe the microscopic textures and specific shapes of the product (e.g., "the interlocking pattern of rug fibers", "the golden crystalline structure of sea salt on grilled meat").
- **Lighting:** Use professional studio lighting (Soft-box, Rembrandt lighting) to highlight materials.
- **Camera:** Use Macro or Close-up angles to show craftsmanship.
- **STRICTLY FORBIDDEN:** Absolutely no icons of houses, general buildings, or generic human silhouettes. Focus 100% on the product itself.

# Output Format (JSON):
Return ONLY a strictly valid JSON. 
NOTE: 'strategy', 'reasoning', 'tagline' -> MUST BE IN HEBREW.

{
  "strategy": {
    "overview": "ניתוח אסטרטגי: איך השם והלוגו מחברים את הלקוח ישירות למוצר ה[essence] (בעברית).",
    "market_gap": "הזדמנות: למה זיהוי מיידי של המוצר בשם ובצורה ינצח את המתחרים הגנריים (בעברית).",
    "target_audience_insight": "תובנה על הקהל (בעברית)."
  },
  "design_styles": [
    {
      "style_id": 1,
      "style_name": "Pure Product Identity",
      "brand_name_english": "EnglishName",
      "brand_name_hebrew": "תעתיק פונטי",
      "tagline": "סלוגן קצר שמסביר בדיוק מה זה (בעברית)",
      "color_palette": ["#HEX1", "#HEX2", "#HEX3"],
      "design_reasoning": "הסבר למה השם הזה והאלמנטים הוויזואליים שנבחרו הופכים את העסק למזוהה מיידית (בעברית).",
      "extended_designer_style": "ENGLISH ONLY: A hyper-detailed 6-8 sentence prompt. Focus exclusively on the material textures, microscopic details, and physical attributes of the product. NO GENERIC ICONS, HOUSES, OR BUILDINGS."
    },
    { "style_id": 2, "style_name": "...", "brand_name_english": "...", "extended_designer_style": "..." },
    { "style_id": 3, "style_name": "...", "brand_name_english": "...", "extended_designer_style": "..." }
  ]
}
`.trim();
  const response = await ai.models.generateContent({
    model: 'gemini-flash-latest',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  return response.text;
};