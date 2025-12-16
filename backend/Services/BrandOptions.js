
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateBrandingFromAI = async ({
  essence,
  audience,
  style,
  tone,
}) => {

  // ✅ מודל עדכני ונתמך
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  
  const prompt = `
# Role: You are "BrandWizard", an elite Creative Director and Brand Strategist with 20 years of experience in high-end branding.

# User Input:
**Core Essence (Business/Product)**: "${essence}"
**Brand Personality & Values (Tone)**: "${tone}"
**Target Audience**: "${audience}"
**Visual Style Preference**: "${style}"

# Critical Rules:
1. **Language**: Respond strictly in the same language as the input (Hebrew or English).
2. **NO Clichés**: You are allergic to generic ideas. If the business is a bakery, do not suggest a wheat stalk. If it's real estate, no roof outlines. Dig deeper.
3. **Differentiation**: Your goal is to make the brand stand out. Analyze typical competitors and go the opposite direction.

# Task: Execute a Strategic Brand Identity Package.

## STEP 1: Strategic Direction
**The "Anti-Competitor" Insight**: Briefly identify what 90% of competitors in this niche look/sound like, and define our "Gap" - how we will look distinctively different.

## STEP 2: 3 Distinct Brand Concepts
Create 3 complete and distinct brand concepts. Each concept must have its own unique Name, Slogan, and Visual Style based on the user's input.

**Naming Rules**: 
  - Short (2-3 syllables max), trademark-able, modern.
  - Must fit the specific concept vibe.
**Visual Vibe (AI Prompt)**: This MUST be a technical prompt ready for Midjourney/DALL-E.
  - Include: "Vector style", "White background", "Minimalist", "Flat design" (unless style asks for 3D), "No text inside logo".

# Output: Strictly valid JSON. Do not include markdown formatting.
{
  "step1_strategy": {
    "market_insight": "Competitors usually do [X], but we will do [Y] to capture the [Audience] attention.",
    "brand_archetype": "Archetype (e.g., The Rebel, The Magician) fitting the '${tone}'.",
    "target_audience_summary": "Psychographic insight about '${audience}'."
  },
  "step2_options": [
    {
      "concept_name": "Concept Name 1 (e.g., 'The Modernist')",
      "suggested_business_name": "Name 1 (Creative & Unique)",
      "slogan": "Slogan 1",
      "colors": ["#Hex1", "#Hex2", "#Hex3"],
      "reasoning": "Why this specific name and color palette work together.",
      "visual_vibe": "logo of [object/abstract shape], [style] style, vector graphics, white background, high contrast, minimalist, centered, dribbble quality, no realistic photo details"
    },
    {
      "concept_name": "Concept Name 2",
      "suggested_business_name": "Name 2 (Different vibe)",
      "slogan": "Slogan 2",
      "colors": ["#Hex1", "#Hex2", "#Hex3"],
      "reasoning": "Reasoning",
      "visual_vibe": "logo of..."
    },
    {
      "concept_name": "Concept Name 3",
      "suggested_business_name": "Name 3 (Different vibe)",
      "slogan": "Slogan 3",
      "colors": ["#Hex1", "#Hex2", "#Hex3"],
      "reasoning": "Reasoning",
      "visual_vibe": "logo of..."
    }
  ]
}
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};
