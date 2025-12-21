import fetch from 'node-fetch';

export const generateLogoImage = async (brandingData) => {
  try {
    const {
      businessName,
      businessDescription,
      targetAudience,
      visualStyle,
      tone,
      essence,
      tagline,
      extendedStyle,
      colors
    } = brandingData;

    const prompt = `
    You are a senior brand designer creating a truly luxurious brand logo.



Business Name: "${businessName}"
Business Essence: "${businessDescription}"
Target Audience: "${targetAudience}"
Visual Style: "${visualStyle}"
Tone of Speech: "${tone}"
Brand Essence: "${essence}"
Brand Tagline: "${tagline}"
Extended Designer Style: ${extendedStyle}
Color Palette: ${colors?.join(", ")}

Scalability Requirement:
The logo must be suitable for future brand extensions and sub-brands.

Design Guidelines:
The logo must express emotion and identity, not describe the product verbally
Avoid clichés, stock symbols, or generic icons
Use only abstract or metaphorical symbolism
A luxurious, confident, and timeless look
Clean typography that matches the brand personality
Typography Direction:
Favor custom or different typography
Avoid default system fonts
Typography must reflect the tone of voice (e.g. sharp, soft, confident, refined)


Strict Constraint:
Do not add decorative elements that do not serve meaning or structure.

Every shape must have a purpose.

Style Guidelines:
Minimalist
Modern Branding
Vector Style
Flat or Semi-Flat
Balanced Proportions
Strong Negative Space


Create a single professional logo image.

Visual Execution Constraints (Critical):

Anti-Literal Approach: Strictly avoid literal descriptions of the product or service. Use metaphorical abstraction. If it’s a coffee shop, don’t show a bean or a cup; show energy, warmth, or community through shape.

Geometric Precision: Use golden ratio proportions, mathematical balance, and clean Euclidean geometry.

Visual Weight: Focus on controlling negative space. The logo should be legible at 16px and impactful at 10 meters.

Technical Output:
Single logo mark only
Centered composition
Pure white background (#FFFFFF)
Vector-style clarity
High resolution suitable for web, print, and branding

Brand Presence Level:
Confident and bold

Logo structure:
Abstract symbol + custom typography

Concept translation:
Translate the essence of the brand into form, rhythm and visual tension.
Don’t explain the concept – express it visually.

Final Output: Create a single, definitive logo mark that embodies "{ESSENCE}" through sophisticated and timeless design.
`.trim();

    const cleanPrompt = prompt
      .replace(/[\[\]]/g, '')
      .replace(/["']/g, '')
      .trim();

    const encodedPrompt = encodeURIComponent(cleanPrompt);
    const seed = Math.floor(Math.random() * 1_000_000);

    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${seed}`;

    console.log("🎨 Fetching Logo Image");

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Image API Error: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer).toString('base64');

  } catch (error) {
    console.error("🔥 Image Fetch Error:", error.message);
    throw error;
  }
};