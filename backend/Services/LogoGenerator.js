
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
      extendedStyle,
      colors
    } = brandingData;

    // עיבוד הצבעים - מבטיח שכל צבע יתחיל ב-#
    const colorsList = colors && colors.length > 0 
      ? colors.map(c => c.startsWith('#') ? c : `#${c}`).join(", ") 
      : "vibrant professional colors";

    // יצירת הפרומפט - שים לב שהחלפתי את style ב-visualStyle
//    const prompt = `
// ### ROLE: SENIOR BRAND DESIGNER
// Task: Create a professional, high-end 3D logo icon for "${businessName}".

// ### 1. THE LOGO ICON (CENTRAL ELEMENT)
// - **Concept**: A singular, sophisticated minimalist symbol that integrates the essence of "${essence}" with the field of "${businessDescription}".
// - **Visual Style**: ${visualStyle}. The icon must be geometric, balanced, and perfectly centered.
// - **Form**: Use clean lines and smooth surfaces. Focus on "Symbolic Geometry" rather than realistic objects.
// - **Exclusion**: No backgrounds, no complex scenes, no photographic realism.

// ### 2. COLOR & LIGHTING (STRICT COMPLIANCE)
// - **Palette**: Use ONLY the HEX colors: ${colorsList}. 
// - **Application**: Apply these colors using smooth gradients and soft highlights to create a premium 3D "volumetric" effect.
// - **Prohibition**: Do not introduce any secondary colors (no grays, blacks, or reds unless specified in the list).

// ### 3. MATERIAL & DEPTH
// - **Finish**: Matte-satin texture with soft-touch edges (chamfered).
// - **Shadow**: A very subtle, soft contact shadow on the floor to provide a "Nofach" and sense of weight.
// - **Background**: STARK PURE WHITE (#FFFFFF) only. This is essential for a clean brand look.

// ### 4. TYPOGRAPHY
// - **Text**: Render "${businessName}" in a professional, modern sans-serif typeface below the icon.
// - **Tone**: The font should reflect a "${tone}" vibe, suitable for the "${targetAudience}" audience.

// ### FINAL QUALITY CHECK
// Ensure the output is a clean, isolated logo on a white field. It must look like a high-end corporate identity piece, not a toy or a 3D render of a physical object.
// `.trim();

const prompt = `
### ROLE: MASTER BRAND ARCHITECT
Task: Design a high-end 3D vector logo for "${businessName}" using ONLY the specified colors.

### 1. THE VISUAL SYMBOL (ICON)
- **Concept**: Create a singular, minimalist, and visually appealing 3D symbol representing "${businessDescription}" and capturing the essence: "${essence}".
- **Style**: ${visualStyle}. Use clean, geometric 3D shapes.
- **Position**: Place the symbol clearly ABOVE the text. 
- **Instruction**: Ensure the symbol is a recognizable graphic icon, not a blurry effect.

### 2. STRICT COLOR PALETTE (NO MIXING)
- **MANDATORY COLORS**: Use ONLY these HEX codes: ${colorsList}.
- **APPLICATION**: The logo must be composed ONLY of these exact colors. Apply them as SOLID 3D layers.
- **NO EXTRANEOUS COLORS**: Do not add purple, yellow, or any color not in the list ${colorsList}. 
- **NO SOFT GRADIENTS**: Use the colors as distinct, solid tones to define the 3D parts and shadows.

### 3. TYPOGRAPHY & CLEANLINESS
- **TEXT**: Render ONLY "${businessName}" accurately below the icon.
- **TEXT COLOR**: Use one of the HEX codes from ${colorsList}.
- **STRICT PROHIBITION**: No taglines, no slogans, no small text, and no extra decorative letters.

### 4. BACKGROUND & ISOLATION
- **BACKGROUND**: STARK PURE WHITE (#FFFFFF) only. 
- **FINISH**: High-quality 3D matte finish. Isolated on a white void with no environment or floor.
`.trim();
    const cleanPrompt = prompt
      .replace(/[\[\]]/g, '')
      .replace(/["']/g, '')
      .trim();

    const encodedPrompt = encodeURIComponent(cleanPrompt);
    const seed = Math.floor(Math.random() * 1_000_000);

    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${seed}&model=flux&enhance=true`;

    console.log(`🎨 Fetching 3D Vector Logo for: ${businessName} with colors: ${colorsList}`);

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
};;