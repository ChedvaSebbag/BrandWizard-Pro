
import { GoogleGenAI } from '@google/genai';
import dotenv from "dotenv";
dotenv.config();

// Initialize Gemini AI
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export const generateBrandingFromAI = async ({ essence, audience, style, tone }) => {
  console.log("API KEY:", process.env.GOOGLE_API_KEY);
  console.log("Input data to AI:", { essence, audience, style, tone });


// const prompt = `
// # Role: You are "BrandWizard", an elite Creative Director and Brand Strategist with 20 years of experience in high-end branding.
// # You provide professional brand strategy, market analysis, and 3 distinct design concepts.
// # Respond strictly in the same language as the input (Hebrew or English).

// # User Input:
// **Core Essence (Business/Product)**: "${essence}"
// **Brand Personality & Values (Tone)**: "${tone}"
// **Target Audience**: "${audience}"
// **Visual Style Preference**: "${style}"

// # Critical Rules:
// 1. Analyze the market: Identify what 90% of competitors in this niche look/sound like and define the "Gap" that makes this brand distinct.
// 2. Differentiation: Make the brand stand out, avoid clichés and generic ideas.
// 3. Language: Respond strictly in the same language as the input.
// 4. JSON output only: Do not add any text before or after the JSON. Do not omit any fields. Infer intelligently if necessary.

// # Task:
// Create a Strategic Brand Identity Package with:
// 1. **General Brand Strategy**
// 2. **Exactly 3 distinct brand concepts**, each with a unique name, slogan, color palette, visual direction, and reasoning.

// # Output: Strictly valid JSON matching this schema:

// {
//   "strategy": {
//     "overview": "High-level explanation of the brand direction",
//     "market_gap": "What competitors usually do vs what makes this brand different",
//     "target_audience_insight": "Psychographic insight about the audience"
//   },
//   "design_styles": [
//     {
//       "style_id": 1,
//       "style_name": "Unique style name",
//       "brand_name": "Suggested business name",
//       "tagline": "Short slogan",
//       "color_palette": ["#000000", "#FFFFFF", "#FF9900"],
//       "visual_description": "Clear visual direction for the brand",
//       "design_reasoning": "Why this style fits the business and audience",
//       "ai_image_prompt": "Technical prompt for logo generation"
//     },
//     {
//       "style_id": 2,
//       "style_name": "...",
//       "brand_name": "...",
//       "tagline": "...",
//       "color_palette": ["#...", "#...", "#..."],
//       "visual_description": "...",
//       "design_reasoning": "...",
//       "ai_image_prompt": "..."
//     },
//     {
//       "style_id": 3,
//       "style_name": "...",
//       "brand_name": "...",
//       "tagline": "...",
//       "color_palette": ["#...", "#...", "#..."],
//       "visual_description": "...",
//       "design_reasoning": "...",
//       "ai_image_prompt": "..."
//     }
//   ]
// }
// `;

const prompt = `
# Role: You are "BrandWizard", an elite Creative Director and Brand Strategist.
# Respond strictly in the same language as the input (Hebrew or English).

# User Input:
**Core Essence**: "${essence}"
**Tone**: "${tone}"
**Target Audience**: "${audience}"
**Visual Style**: "${style}"

# Task:
Create 3 distinct brand concepts. 
CRITICAL NAME RULES:
- Avoid generic/descriptive names (e.g., if it's a bakery, don't use "Tasty Bakery").
- Aim for: Abstract, Metaphorical, or modern short names.
- Names should evoke the "feeling" of the brand, not describe the product.

# Output: Strictly valid JSON matching the provided schema.
# In "ai_image_prompt": Provide a detailed, professional prompt for an image generation AI (Imagen 3). 
# Focus on: [Logo type], [Symbol description], [Minimalist style], [Specific color palette from the concept], "high quality, vector style, white background".

{
  "strategy": {
    "overview": "...",
    "market_gap": "...",
    "target_audience_insight": "..."
  },
  "design_styles": [
    {
      "style_id": 1,
      "style_name": "...",
      "brand_name": "...",
      "tagline": "...",
      "color_palette": ["#...", "#...", "#..."],
      "visual_description": "...",
      "design_reasoning": "...",
      "ai_image_prompt": "..." 
    }
  ]
}
`;


  console.log("Sending prompt to AI...");
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  console.log("AI response received:", response.text);
  return response.text;
};
