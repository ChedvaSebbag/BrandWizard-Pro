import { GoogleGenAI } from '@google/genai';
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateBrandingFromAI = async ({ essence, audience, style, tone }) => {
const prompt = `
# Role: 
You are a Modern Brand Naming Expert. You create names that sound like successful Tech Startups or High-End Boutiques.

# Input Data:
- Business Essence: "${essence}"
- Desired Tone: "${tone}"
- Target Audience: "${audience}"
- Visual Style: "${style}"

# PART 1: NAMING STRATEGY (STRICT RULES)

RULE 1: NO SENTENCES & NO "THE"
- **NEVER** start a name with "The", "A", or "An".
- **NEVER** use gerunds (-ing words) like "Learning", "Teaching", "Thinking". They sound passive.
- BAD: "The Math Path", "Learning Hub".
- GOOD: "MathPath", "HubCore".

RULE 2: THE "FUSION" FORMULA
- The best names are 2 short nouns merged together (CamelCase).
- **Formula:** [Anchor Noun] + [Elevator Noun]
- If Tone is "Calm/Realistic" -> Use: Base, Core, Axis, True, Logic, Mind, Flow.
- If Tone is "Luxury" -> Use: Gold, Prime, Noble, Elite.
- **Example:** "Logic" + "Base" = "LogicBase".

RULE 3: HEBREW TRANSLITERATION (CRITICAL)
- The field 'brand_name_hebrew' must be a **Phonetic Transliteration**.
- Write exactly how the English name sounds in Hebrew letters.
- **DO NOT TRANSLATE THE MEANING.**
- Example: If name is "LogicBase":
  - CORRECT Hebrew: "לוג'יק-בייס"
  - WRONG Hebrew: "בסיס הלוגיקה" (Do not do this!)

# PART 2: VISUAL STRATEGY
For 'extended_designer_style', write a **Rich Visual Brief (3-4 sentences)**.
- Describe the geometry, material, lighting, and mood.
- Start with: "A premium vector logo featuring..."
- Ensure it fits the requested style ("${style}").

# Output Format (JSON):
Return ONLY a strictly valid JSON. 
NOTE: 'strategy', 'reasoning', 'tagline' -> MUST BE IN HEBREW.

{
  "strategy": {
    "overview": "ניתוח אסטרטגי: למה בחרנו בגישה הזו (בעברית).",
    "market_gap": "הזדמנות: הבידול של המותג (בעברית).",
    "target_audience_insight": "תובנה על הקהל (בעברית)."
  },
  "design_styles": [
    {
      "style_id": 1,
      "style_name": "Name of the Vibe (e.g., Structured Clarity)",
      "brand_name_english": "EnglishName (Short & Punchy)",
      "brand_name_hebrew": "תעתיק פונטי (למשל: לוג'יק-בייס)",
      "tagline": "סלוגן קצר וקולע (בעברית)",
      "color_palette": ["#HEX1", "#HEX2", "#HEX3"],
      "design_reasoning": "הסבר: למה השם הזה קליט ומשדר את הטון הנכון (בעברית).",
      "extended_designer_style": "ENGLISH ONLY: A detailed 3-4 sentence prompt for the logo..."
    },
    {
      "style_id": 2,
      "style_name": "Name of the Vibe",
      "brand_name_english": "...",
      "brand_name_hebrew": "...",
      "tagline": "...",
      "color_palette": ["#...", "#...", "#..."],
      "design_reasoning": "...",
      "extended_designer_style": "ENGLISH ONLY: ..."
    },
    {
      "style_id": 3,
      "style_name": "Name of the Vibe",
      "brand_name_english": "...",
      "brand_name_hebrew": "...",
      "tagline": "...",
      "color_palette": ["#...", "#...", "#..."],
      "design_reasoning": "...",
      "extended_designer_style": "ENGLISH ONLY: ..."
    }
  ]
}
`.trim();
  const response = await ai.models.generateContent({
    model: 'gemini-flash-latest',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  return response.text;
};