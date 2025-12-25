
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



      
//   const prompt = `
// ### ROLE: MASTER BRAND ARCHITECT
// Task: Design a professional 3D vector logo for "${businessName}" that reflects its essence and tone.

// ### 1. SYMBOL (SHAPE INTEGRITY)
// - Concept: Create ONE singular, recognizable 3D object that directly represents "${businessDescription}" and embodies the essence "${essence}".
// - Mandatory Constraint: Do NOT use abstract shapes or letters alone. It must be a physical, identifiable icon related to the industry.
// - Form: Use clean, solid 3D geometry with bold edges.
// - Position: Center the object clearly ABOVE the text.
// - Tone: Design should reflect the brand's tone: "${tone}".

// ### 2. STRICT COLOR LOCK (HEX ACCURACY)
// - Palette: Use ONLY ${colorsList}.
// - Zero Deviation: Strictly prohibit any other colors.
// - Lighting: Neutral white studio light only. No colored reflections or environmental lighting that distorts the HEX codes.

// ### 3. TEXT & LAYOUT
// - Requirement: Render "${businessName}" exactly ONCE below the icon.
// - Style: Use a professional, solid font matching the visual style "${visualStyle}".
// - Prohibition: No slogans, no taglines, and no decorative letters.

// ### 4. OUTPUT SPECIFICATIONS
// - Background: Pure white (#FFFFFF) only.
// - Finish: High-quality 3D matte.
// - Isolation: Logo should be clean, isolated on white; no shadows, floors, or extra environment.
// `.trim();

const prompt = `
### ROLE: PRECISION GRAPHIC ENGINE
Task: Design a 3D vector logo based ONLY on the provided variables.

### 1. THE SYMBOL
- **Subject**: Create ONE singular 3D icon representing "${businessDescription}".
- **Instruction**: Do not use abstract shapes. The icon must be a recognizable, literal object from the business field.
- **Style**: Bold, clean geometric 3D shapes. Position clearly ABOVE the text.

### 2. COLOR LOCK (NO DEVIATION)
- **Palette**: Use ONLY these HEX codes: ${colorsList}.
- **Strict Prohibition**: Absolutely NO other colors allowed. No pink, blue, or yellow unless in the list.
- **Lighting**: Neutral white studio light only. Prohibit environmental reflections that alter the original HEX shades.

### 3. TEXT & LAYOUT
- **Text**: Render ONLY "${businessName}" accurately.
- **Count**: Render the text ONCE. No duplication, no shadows that create new colors.
- **Typography**: Clean typeface aligned with "${essence}".

### 4. OUTPUT SPECS
- **Background**: STARK PURE WHITE (#FFFFFF) only.
- **Finish**: High-quality 3D matte. Isolated on white void with no floor or environment.
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