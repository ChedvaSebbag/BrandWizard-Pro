import { GoogleGenAI } from '@google/genai';
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateBrandingFromAI = async ({ essence, audience, style, tone }) => {
const prompt = `
# Role: 
You are a World-Class Brand Strategist and Creative Director. Your expertise is "Visual Storytelling" and "High-End Phonetic Branding". You create brands that feel like global luxury boutiques (e.g., Apple, Aesop, Voda).

# Objective:
Create EXACTLY 3 distinct, premium brand concepts. 

# Naming Strategy (CRITICAL):
STRICTLY AVOID clichés and generic Hebrew nouns (e.g., No 'Ohr', 'Bracha', 'Keter', 'Nof', 'Chesed', 'Marom'). These are forbidden.

Instead, use these 3 distinct naming styles:
1. **Abstract & Melodic**: Focus on the SOUND and "Mouthfeel". Use soft consonants and premium vowels (e.g., 'Vellon', 'Lume', 'Nura', 'Aura').
2. **Modern Roots**: Use ancient or natural Hebrew/Latin roots but twist them into a modern, short format (e.g., instead of 'Erez', use 'Arze'; instead of 'Grains', use 'Grano').
3. **Symbolic Metaphor**: A short, powerful word that represents an feeling or a secret, not the product (e.g., 'Sela', 'Voda', 'Crest').

Naming Rules:
- Length: 4-6 letters only.
- Feel: Must look beautiful on a minimalist black/gold label.
- Phonetic Harmony: "brand_name_hebrew" and "brand_name_english" MUST sound identical.

# The "Soul" of Design (Extended Designer Style):
Describe the **Visual Poetry** in ENGLISH (This will be used for AI Image Generation):
- **Visual Metaphor**: Do NOT describe the product (no bread for bakery, no plates for food). Describe a shape that represents the SOUL (e.g., "A single, unbroken golden line forming a Zen-like circle").
- **Visual Tension**: Use terms: Golden Ratio, Negative Space, Fibonacci, Geometric Minimalism, High-contrast Serifs.
- **Atmosphere**: Describe lighting and texture (e.g., "Deep matte textures with soft cinematic shadows").

# User Input:
Core Essence: "${essence}"
Tone: "${tone}"
Target Audience: "${audience}"
Visual Style: "${style}"

# Output:
Return ONLY a strictly valid JSON.

{
  "strategy": {
    "overview": "ניתוח אסטרטגי עמוק של המותג (בעברית).",
    "market_gap": "הפער בשוק שהמותג הזה ממלא (בעברית).",
    "target_audience_insight": "תובנה פסיכולוגית על קהל היעד (בעברית)."
  },
  "design_styles": [
    {
      "style_id": 1,
      "style_name": "Minimalist Prestige",
      "brand_name_hebrew": "שם המותג בעברית",
      "brand_name_english": "The Name in English",
      "tagline": "סלוגן קצר וקולע בעברית",
      "color_palette": ["#HEX1", "#HEX2", "#HEX3"],
      "design_reasoning": "למה השם הזה הוא יצירת אמנות ואיך הוא מתחבר למהות העסק (בעברית).",
      "extended_designer_style": "ENGLISH ONLY: Professional prompt for DALL-E/Midjourney. Describe an abstract, geometric, luxurious logo mark. Mention: vector, white background, golden ratio, minimalist."
    },
    {
      "style_id": 2,
      "style_name": "Organic Heritage",
      "brand_name_hebrew": "...",
      "brand_name_english": "...",
      "tagline": "...",
      "color_palette": ["#...", "#...", "#..."],
      "design_reasoning": "...",
      "extended_designer_style": "..."
    },
    {
      "style_id": 3,
      "style_name": "Modern Iconic",
      "brand_name_hebrew": "...",
      "brand_name_english": "...",
      "tagline": "...",
      "color_palette": ["#...", "#...", "#..."],
      "design_reasoning": "...",
      "extended_designer_style": "..."
    }
  ]
}
`.trim();

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  return response.text;
};