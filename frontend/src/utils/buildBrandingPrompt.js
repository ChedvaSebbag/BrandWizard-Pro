export function buildBrandingPrompt({ essence, audience, style, tone }) {
  return `
# Role:
You are a High-End Brand Naming Expert & Visual Strategist.

# Input Data:
- Business Essence: "${essence}"
- Desired Tone: "${tone}"
- Target Audience: "${audience}"
- Visual Style: "${style}"
`.trim();
}