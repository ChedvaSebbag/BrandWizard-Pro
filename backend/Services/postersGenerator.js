// import fetch from "node-fetch";

// export const createPosters = async (brandingData) => {
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
//       colors,
//       logo
//     } = brandingData;

//     const prompt = `

// You are a senior marketing designer and brand strategist.
// Your task is to create advertising posters that are not only visually strong,
// but also strategically persuasive and conversion-oriented.


// Create THREE high-quality, marketing-ready advertising posters for the business below.
// The posters should be visually striking, emotionally engaging, and ready for real-world publication.

// Do not repeat the same layout or visual structure across the three posters.
// Each poster must feel like a different campaign direction.


// Business Name: "${businessName}"
// Business Description: "${businessDescription}"
// Brand Essence: "${essence}"
// Target Audience: "${targetAudience}"
// Tone of Voice: "${tone}"
// Main Tagline: "${tagline}"

// Visual Style: "${visualStyle}"
// Extended Design Style: ${extendedStyle}
// Color Palette: ${colors?.join(", ")}

// Core Design Instructions:
// - The posters must clearly represent the business and its identity.
// - The business name must be visible and readable in each poster.
// - The business name text color must be selected strictly from the provided color palette.
// - Use the color palette intentionally: background, typography, and graphic elements should feel cohesive and branded.
// - The main tagline must be the dominant visual element and immediately grab attention.
// - The design should communicate professionalism, credibility, and emotional appeal.

// Poster Variations:
// Poster 1 – Typography-Focused Concept:
// - The tagline is the main visual element.
// - Strong typographic composition.
// - Minimal or no imagery.
// - Clean, bold, high-contrast layout.

// Poster 2 – Visual-Driven Concept:
// - One powerful central image or illustration related to the business field.
// - Text supports the visual emotionally, not descriptively.
// - Atmospheric, cinematic, or immersive feeling.

// Poster 3 – Conceptual / Graphic Concept:
// - Abstract or symbolic interpretation of the brand essence.
// - Use shapes, lines, or color blocks derived from the palette.
// - More expressive and artistic while remaining clear and professional.

// Additional Requirements:
// - Avoid clutter and unnecessary text.
// - Maintain strong visual hierarchy and readability.
// - Designs must feel intentional, premium, and advertising-focused.
// - Each poster should feel like a distinct creative direction.
// - The result should look like professional brand campaign material, not an illustration or mockup.


// Design Requirements:
// - The poster must communicate ONE clear central message.
// - Strong visual hierarchy: 
//   1. Main tagline (large, bold, immediate attention)
//   2. Supporting visual or subtle secondary text (optional)
//   3. Business name / logo placement (clean, not overpowering)
// - Use strong color contrast for maximum readability and impact.
// - Clean, modern, professional composition.
// - Avoid clutter, excessive text, or unnecessary decorative elements.
// - The design should feel intentional, premium, and emotionally engaging.
// - The poster should instantly appeal to the target audience within 3 seconds.

// Typography:
// - Bold, legible, expressive typography.
// - Typography may act as a visual element itself.
// - No generic fonts.

// Imagery:
// - Use a single strong visual concept OR a typographic-led design.
// - The visual should support the message emotionally, not explain it literally.

// Branding:
// - Integrate the logo subtly and professionally.
// - The logo must not dominate the poster.


// Output:
// - Three distinct advertising poster designs
// - High-resolution
// - Ready for print and digital advertising

// `.trim();

//     const cleanPrompt = prompt
//       .replace(/[\[\]]/g, "")
//       .replace(/["']/g, "")
//       .trim();

//     const encodedPrompt = encodeURIComponent(cleanPrompt);
//     const seed = Math.floor(Math.random() * 1_000_000);

//     console.log("🖼️ Fetching Poster Images");

//     const urls = [1, 2, 3].map(
//       (i) =>
//         `https://image.pollinations.ai/prompt/${encodedPrompt}?width=768&height=1024&nologo=true&seed=${seed + i}`
//     );

//     const results = await Promise.allSettled(
//   urls.map(async (url, index) => {
//     const response = await fetch(url, {
//       headers: { "User-Agent": "Mozilla/5.0" }
//     });

//     if (!response.ok) {
//       throw new Error(`Poster API Error (${index + 1}): ${response.status}`);
//     }

//     const buffer = await response.arrayBuffer();

//     return {
//       id: index + 1,
//       imageBase64: Buffer.from(buffer).toString("base64")
//     };
//   })
// );

// // 🟢 לוקחים רק את אלו שהצליחו
// const images = results
//   .filter(result => result.status === "fulfilled")
//   .map(result => result.value);

// // ❗ אם אף תמונה לא הצליחה – נכשיל
// if (images.length === 0) {
//   throw new Error("All poster generations failed");
// }

// return images;


//     return images;

//   } catch (error) {
//     console.error("🔥 Poster Generation Error:", error.message);
//     throw error;
//   }
// };

import fetch from "node-fetch";

export const createPosters = async (brandingData) => {
  try {
    const { businessName, businessDescription, visualStyle,targetAudience, extendedStyle,colors, essence, tagline } = brandingData;
    const colorsText = colors?.join(", ") || "coordinated colors";

    // פרומפט דינמי שמתאים את עצמו לכל סוג עסק
   // פרומפט דינמי שמתאים את עצמו לכל סוג עסק
// const baseVisualRules = `
// Create THREE high-end, professional advertising images for the following business:

// Business Name: ${businessName}
// Business Essence / Description: ${businessDescription}
// Target Audience: ${targetAudience}
// Visual Style: ${visualStyle}, ${extendedStyle}
// Color Palette: ${colorsText}
// Main Tagline: ${tagline}

// Instructions:
// - Translate the business description into realistic objects, products, tools, or environments
//   that naturally represent this specific business, without providing explicit examples.
// - The images should immediately communicate the business identity within 1–2 seconds.
// - Premium, clean, professional, advertising-ready composition.
// - Leave clear space for the logo and tagline.
// - Avoid people, text, clutter, or unrelated objects.

// Generate THREE distinct variations:
// 1. Hero Product / Main Object Focus: Showcase the primary objects in a visually strong composition.
// 2. Close-Up / Texture & Detail Focus: Highlight materials, textures, or details relevant to the business.
// 3. Wide / Environment Focus: Show the environment or setting where the business operates, focusing on objects and atmosphere.

// Additional Notes:
// - Strong visual hierarchy: tagline dominant, business name/logo readable.
// - Use the color palette intentionally: backgrounds, typography, and graphic elements should feel cohesive.
// - Clean, professional composition that appeals to the target audience.
// - The final output must be high-resolution and advertising-ready.
// `.trim();
const baseVisualRules = `High-end commercial advertisement photography for a business named "${businessName}". 
Style: ${visualStyle}, ${extendedStyle}. 
Color Palette: ${colorsText}. 
Mood: Professional, premium, and clean. 
Technical: 8k resolution, photorealistic, cinematic lighting, sharp focus. 
Strictly NO text, NO logos, NO letters, and NO people.`.trim();

const styles = [
  // אפשרות 1: ה"גיבור" - מיקוד באובייקטים המוחשיים של העסק
  `${baseVisualRules} 
  Concept: A hero-shot of professional premium tools and objects representing the daily work of ${businessDescription}. 
  Composition: Central focus on high-quality items, minimalist background with ${colorsText} accents, plenty of negative space for future text overlays.`,

  // אפשרות 2: האווירה - החלל והסביבה העסקית
  `${baseVisualRules} 
  Concept: A wide-angle interior shot of a sophisticated, modern environment related to ${businessDescription}. 
  Composition: Architectural photography style, natural soft lighting, ${colorsText} highlights, clean and organized atmosphere that implies excellence.`,

  // אפשרות 3: האיכות - תקריב אומנותי על פרטים וטקסטורות
  `${baseVisualRules} 
  Concept: Extreme close-up (macro) photography of textures, materials, or intricate details associated with ${businessDescription}. 
  Composition: Artistic depth of field with beautiful bokeh, focuses on the high-quality essence using ${colorsText} color grading.`
];

    const results = await Promise.allSettled(
      styles.map(async (prompt, index) => {
        const encoded = encodeURIComponent(prompt);
        const url = `https://image.pollinations.ai/prompt/${encoded}?width=768&height=1024&nologo=true&seed=${Math.floor(Math.random() * 1000000)}&model=flux-realism`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        
        const buffer = await response.arrayBuffer();
        
        return {
          id: index + 1,
          imageBase64: Buffer.from(buffer).toString("base64")
        };
      })
    );

    return results.filter(r => r.status === "fulfilled").map(r => r.value);
  } catch (error) {
    console.error("🔥 Global Creative Director Error:", error.message);
    throw error;
  }
};