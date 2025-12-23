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

    // הגדרת הצבעים מהמערך
    // הפיכת המערך לרשימה ברורה עם סימן ה-#
    const colorsList = colors && colors.length > 0
      ? colors.map(c => c.startsWith('#') ? c : `#${c}`).join(", ")
      : "vibrant professional colors";

    // const prompt = `
    //   You are a world-class senior brand identity designer. 
    //   Your task is to create a definitive 3D textured logo mark for "${businessName}".

    //   ### 1. INDUSTRY RELEVANCE (Dynamic Concept)
    //   - Industry Context: Analyze the Business Description ("${businessDescription}") and Essence ("${essence}").
    //   - Visual Metaphor: Translate the core functional driver of the business into a unique geometric signature.
    //   - Field-Specific Shapes: Use professional visual language appropriate for the field (e.g., woven/interlocking paths for textiles, organic/fluid for wellness, sharp/precise for tech, solid/structured for construction).

    //   ### 2. VISUAL EXECUTION & 3D VOLUME
    //   - Style: Professional 3D Isometric vector mark.
    //   - Depth: Use clean bevel, emboss, and strategic lighting to create professional volume within the symbol.
    //   - Textures: Apply premium ${visualStyle} textures (e.g., brushed metal, silk-matte, or polished mineral) ONLY within the symbol's surfaces to reflect the brand's quality.

    //   ### 3. STRICT LOGO CONSTRAINTS
    //   - NO PHOTOGRAPHY: Strictly avoid realistic objects, people, or photographic scenes.
    //   - Background: STRICTLY PURE WHITE (#FFFFFF).
    //   - Structure: A clean, unique abstract symbol + custom typography that reflects the "${tone}" brand voice.
    //   - Scalability: The mark must be impactful on a billboard and legible as a favicon.

    //   ### 4. TECHNICAL SPECS
    //   - Palette: Use ONLY ${colorsList}.
    //   - Geometric Precision: Use Golden Ratio proportions and clean Euclidean geometry.
    //   - Anti-Literal: Do not show the product literally. Express its essence through form, rhythm, and 3D visual tension.

    //   Final Output: Create a high-resolution 3D textured logo mark that acts as the ultimate professional manifestation of "${businessName}".`.trim();


    const prompt = `
Role: Senior Brand Identity Architect specialized in Industry Archetypes.
Task: Engineering a high-fidelity, isolated logo mark for "${businessName}".

### 1. INDUSTRY-SPECIFIC ANCHOR (The Relevance Fix)
- **Deep Sector Analysis:** Analyze "${businessDescription}" and "${essence}". Identify the "Visual DNA" of this specific field.
- **Mandatory Industry Motifs:** The logo MUST incorporate a sophisticated visual metaphor based on the industry's physical tools or products.
    * **If Rugs/Textiles:** Use motifs of intertwined fibers, weaving patterns, intricate knots, or the silhouette of a loom.
    * **If Culinary:** Use abstract culinary tools, heat/steam patterns, or artisanal ingredients.
    * **If Professional Services:** Use structural foundations, connectivity nodes, or precise alignments.
- **The "Recognition" Test:** A professional in the industry should immediately recognize the category of the business just by looking at the symbol.

### 2. MATERIAL REALISM & TACTILE TEXTURE
- **Surface Integrity:** Apply a realistic material finish ONLY to the logo mark. 
    * For Rugs/Textiles: Apply a "soft-fiber" or "woven-thread" texture with visible micro-depth.
- **Dimensionality:** Use Rim Lighting and Global Illumination to create professional 3D volume, ensuring the symbol feels like a premium physical object.

### 3. ARCHITECTURAL RIGOR & TYPOGRAPHY
- **Geometric Harmony:** Construct the logo using Golden Ratio proportions for perfect optical balance.
- **Graphic DNA:** The font for "${businessName}" must mirror the physical properties of the symbol (e.g., if the symbol is woven, the font should have interlaced terminals).
- **Spelling:** Ensure 100% orthographic accuracy for "${businessName}".

### 4. PRODUCTION SPECIFICATIONS
- **MANDATORY COLOR PALETTE:** You must use ONLY these specific HEX colors: ${colorsList}.
- **COLOR DOMINANCE:** These colors should be the primary colors of the logo symbol and typography.
- **NO NEUTRALS:** Do not add any extra colors (like brown or grey) unless they are in the list.
- **Background:** STRICTLY PURE WHITE (#FFFFFF).
### FINAL COMMAND:
Execute a production-ready brand mark that is an undeniable visual representative of "${businessDescription}". The design must be iconic, relevant, and demonstrates the meticulous detail of a top-tier design agency.
`.trim();

    const cleanPrompt = prompt
      .replace(/[\[\]]/g, '')
      .replace(/["']/g, '')
      .trim();

    const encodedPrompt = encodeURIComponent(cleanPrompt);
    const seed = Math.floor(Math.random() * 1_000_000);

    // שימוש במודל flux לקבלת איכות גבוהה ודיוק בטקסטורות
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${seed}&model=flux&enhance=true`;
    console.log("Colors received for logo:", colorsList);
    console.log(`🎨 Fetching 3D Vector Logo for: ${businessName}`);

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