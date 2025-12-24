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
    const { businessName, businessDescription, visualStyle, colors, essence, tagline } = brandingData;
    const colorsText = colors?.join(", ") || "coordinated colors";

    // פרומפט דינמי שמתאים את עצמו לכל סוג עסק
    const baseVisualRules = `
Task: Create a high-end professional advertising background image.

MAIN VISUAL SUBJECT (VERY IMPORTANT):
Show realistic, high-quality physical objects, products, tools, or materials
that are clearly and immediately associated with the following business field.
The subject must be recognizable within 1–2 seconds.

Business Description:
${businessDescription}

WHAT TO SHOW:
- Only objects, materials, or environments related to the business field.
- Studio-quality commercial photography style.
- Realistic, premium, clean presentation.

BRAND FEEL (HOW IT SHOULD FEEL, NOT WHAT IS SHOWN):
${essence}

VISUAL STYLE:
${visualStyle}
Ultra high resolution, professional advertising photography, premium quality.

COLOR DIRECTION:
Use a dominant and cohesive palette based on:
${colorsText}

COMPOSITION:
- Minimal, clean, and professional.
- Clear negative space in the center or upper third.
- The image must allow space for logo placement and the tagline:
"${tagline}"

STRICT RULES – MUST FOLLOW:
- NO text, letters, numbers, signs, or logos inside the image.
- NO people, faces, hands, or body parts.
- NO abstract visuals unless they clearly support the business field.
- NO unrelated objects.
- Background must not be cluttered.
- The image must visually represent the business itself, not just an emotion.

FINAL GOAL:
A realistic, advertising-ready background image that clearly matches the business
and emotionally reflects the brand essence.
`.trim();


   const styles = [
  `${baseVisualRules}
Concept 1:
A clean hero-style composition featuring the main business-related products or tools,
presented in a premium, commercial advertising setup.`,

  `${baseVisualRules}
Concept 2:
A close-up professional shot highlighting textures, materials, or details
commonly found in this type of business.`,

  `${baseVisualRules}
Concept 3:
A wider scene showing an elegant, minimal environment where this business operates,
without people, focusing only on objects and atmosphere.`
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