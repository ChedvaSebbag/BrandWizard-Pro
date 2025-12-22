// import fetch from 'node-fetch';

// export const generateLogoImage = async (brandingData) => {
//   try {
//     const {
//       businessName,
//       businessDescription,
//       targetAudience,
//       visualStyle,
//       tone,
//       essence,
//       tagline,
//       extendedStyle,
//       colors
//     } = brandingData;

//     const prompt = `
//     You are a senior brand designer creating a truly luxurious brand logo. 
// CRITICAL: The visual identity must be a direct conceptual derivation of the Business Name and Essence.

// Business Name: "${businessName}"
// Business Essence: "${businessDescription}"
// Target Audience: "${targetAudience}"
// Visual Style: "${visualStyle}"
// Tone of Speech: "${tone}"
// Brand Essence: "${essence}"
// Brand Tagline: "${tagline}"
// Extended Designer Style: ${extendedStyle}
// Color Palette: ${colors?.join(", ")}

// ### NEW: STRATEGIC ALIGNMENT
// The logo mark must act as a visual bridge between the Business Name "${businessName}" and its core mission. 
// Analyze the "Business Essence" and translate its primary emotional driver into a unique geometric signature.

// Scalability Requirement:
// The logo must be suitable for future brand extensions and sub-brands.

// Design Guidelines:
// The logo must express emotion and identity, not describe the product verbally.
// Avoid clichés, stock symbols, or generic icons.
// Use only abstract or metaphorical symbolism that resonates with "${essence}".
// A luxurious, confident, and timeless look.
// Clean typography that matches the brand personality.

// Typography Direction:
// Favor custom or different typography.
// Avoid default system fonts.
// The typography MUST mirror the visual weight and character of the logo symbol to create a unified brand voice.

// Strict Constraint:
// Do not add decorative elements that do not serve meaning or structure.
// Every shape must have a purpose derived from the brand's story.

// Style Guidelines:
// Minimalist
// Modern Branding
// Vector Style
// Flat or Semi-Flat
// Balanced Proportions
// Strong Negative Space

// Visual Execution Constraints (Critical):
// Anti-Literal Approach: Strictly avoid literal descriptions. Use metaphorical abstraction. 
// CONCEPTUAL FOCUS: If the business essence is about "${essence}", the shapes must embody that specific energy (e.g., fluid for agility, rigid for strength).

// Geometric Precision: Use golden ratio proportions, mathematical balance, and clean Euclidean geometry.
// Visual Weight: Focus on controlling negative space. 

// Technical Output:
// Single logo mark only
// Centered composition
// Pure white background (#FFFFFF)
// Vector-style clarity

// Final Output: Create a single, definitive logo mark that is the ultimate visual manifestation of "${businessName}". The design must feel like it could only belong to this specific business and no other.`.trim();

//     const cleanPrompt = prompt
//       .replace(/[\[\]]/g, '')
//       .replace(/["']/g, '')
//       .trim();

//     const encodedPrompt = encodeURIComponent(cleanPrompt);
//     const seed = Math.floor(Math.random() * 1_000_000);

//     const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${seed}`;

//     console.log("🎨 Fetching Logo Image");

//     const response = await fetch(url, {
//       headers: {
//         'User-Agent': 'Mozilla/5.0'
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`Image API Error: ${response.status}`);
//     }

//     const arrayBuffer = await response.arrayBuffer();
//     return Buffer.from(arrayBuffer).toString('base64');

//   } catch (error) {
//     console.error("🔥 Image Fetch Error:", error.message);
//     throw error;
//   }
// };
import fetch from 'node-fetch';

export const generateLogoImage = async (brandingData) => {
  try {
    const {
      businessName,
      visualStyle,
      essence,
      colors
    } = brandingData;

    // 1. זיהוי חכם: האם המותג אמור להיות שחור-לבן?
    const styleString = (visualStyle || "").toLowerCase();
    const colorsString = (colors || []).join(" ").toLowerCase();

    const isMonochrome = 
      styleString.includes("mono") || 
      styleString.includes("black") || 
      styleString.includes("classic") ||
      (colorsString.includes("black") && colorsString.includes("white") && !colorsString.includes("red") && !colorsString.includes("blue"));

    // 2. בניית הוראות צבע דינמיות
    let colorInstructions = "";
    let negativePrompt = "";

    if (isMonochrome) {
      // מקרה A: המשתמש רוצה שחור לבן
      colorInstructions = `
      COLOR RULES:
      - STRICTLY BLACK AND WHITE (Monochrome).
      - Use strong contrast.
      - Do NOT use colors.
      `;
      negativePrompt = "colored, colorful, rainbow, gradient, multi-color, complex details, realistic photo";
    } else {
      // מקרה B: המשתמש רוצה צבעים (ברירת מחדל)
      const colorsText = colors?.join(", ") || "vibrant brand colors";
      colorInstructions = `
      COLOR RULES:
      - Primary Palette: ${colorsText}.
      - The logo symbol MUST be colored using these specific colors.
      - DO NOT create a black and white logo.
      `;
      negativePrompt = "black and white, monochrome, greyscale, sketch, 3d render, realistic photo, blurry, complex details";
    }

    // 3. הרכבת הפרומפט הסופי
    const prompt = `
    You are a senior brand designer creating a professional vector logo.
    
    PROJECT DETAILS:
    - Business Name: "${businessName}"
    - Essence: "${essence}"
    - Style: ${visualStyle}
    
    ${colorInstructions}
    
    DESIGN DIRECTION:
    - Create a modern, minimalist, and geometric mark.
    - The design should be abstract and conceptual.
    - High contrast and vector-like quality.
    - Background: Pure White (#FFFFFF).
    
    NEGATIVE PROMPT (AVOID):
    ${negativePrompt}
    
    Final Output: A single, centered logo mark on a white background.
    `.trim();

    const cleanPrompt = prompt
      .replace(/[\[\]]/g, '')
      .replace(/["']/g, '')
      .trim();

    const encodedPrompt = encodeURIComponent(cleanPrompt);
    const seed = Math.floor(Math.random() * 1_000_000);

    // שימוש במודל flux ושיפור צבעים
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${seed}&model=flux&enhance=true`;

    console.log(`🎨 Fetching Logo. Monochrome Mode: ${isMonochrome}`);

    const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });

    if (!response.ok) throw new Error(`Image API Error: ${response.status}`);

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer).toString('base64');

  } catch (error) {
    console.error("🔥 Image Fetch Error:", error.message);
    throw error;
  }
};