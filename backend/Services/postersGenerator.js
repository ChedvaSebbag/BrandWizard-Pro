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
    const { 
      businessName, businessDescription, visualStyle, 
      tone, essence, colors, tagline 
    } = brandingData;

    const colorsText = colors?.join(", ") || "professional brand colors";

    // --- הנחיות הליבה: שילוב לוגו, רלוונטיות ואיכות CGI ---
    const baseVisualRules = `
      Role: World-Class Commercial Photographer and Brand Strategist.
      Task: Create a high-end advertising poster for "${businessName}" based on "${businessDescription}".
      
      STRICT LOGO INTEGRATION: 
      The name "${businessName}" must be rendered as high-end 3D typography INTEGRATED into the scene. 
      It should look like a laser-etched metal sign, an embossed leather mark, or a sleek transparent glass overlay. 
      STRICTLY NO WHITE BOXES or solid rectangular backgrounds around the text. The text must catch the scene's light and shadows.

      INDUSTRY RELEVANCE: 
      The visual MUST be a direct representation of "${businessDescription}". 
      If the business is Rugs, focus on intricate hand-knotted textures and woven fibers. 
      If the business is Woodwork, focus on joinery and raw timber grain. 
      The imagery must be hyper-relevant to the craft.

      COMPOSITION & QUALITY:
      Cinematic studio lighting, global illumination, and professional depth of field. 
      STRICTLY NO PEOPLE. NO HUMANS. NO FACES.
      Color Palette: Optimized using ${colorsText}.
      Resolution: 8k, photorealistic, ${visualStyle} aesthetic.
    `.trim();

    // --- שלושה קונספטים שיווקיים שונים ---
    const styles = [
      // 1. קונספט המקרו (התמקדות בחומר ובאיכות)
      `${baseVisualRules} 
       Concept: The Texture of Excellence. A macro close-up shot of the raw materials and craftsmanship of "${essence}". 
       Focus on extreme detail (e.g., woven knots, polished surfaces). The tagline "${tagline}" is elegantly placed in the negative space.`,
      
      // 2. קונספט ה"הירו" (המוצר כמרכז העולם)
      `${baseVisualRules} 
       Concept: The Hero Product Shot. A grand, symmetrical presentation of a premium product from "${businessDescription}" as the centerpiece. 
       Dramatic lighting creates a sense of luxury and status. The name "${businessName}" appears as a premium metallic brand mark on the surface.`,
      
      // 3. קונספט האווירה והטון (הרגש של המותג)
      `${baseVisualRules} 
       Concept: Atmospheric Essence. An evocative, artistic scene that captures the spirit of "${essence}". 
       Use dynamic lighting and shadows from the ${colorsText} palette to create a prestigious, clean environment. The composition is minimal and impactful.`
    ];

    console.log(`🖼️ Generating 3 hyper-professional posters for: ${businessName}`);

    const seeds = [Math.floor(Math.random() * 99999), Math.floor(Math.random() * 99999) + 1, Math.floor(Math.random() * 99999) + 2];

    const results = await Promise.allSettled(
      styles.map(async (stylePrompt, index) => {
        const encoded = encodeURIComponent(stylePrompt.trim());
        const url = `https://image.pollinations.ai/prompt/${encoded}?width=768&height=1024&nologo=true&seed=${seeds[index]}&model=flux&enhance=true`;

        const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }, timeout: 60000 });
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        
        const buffer = await response.arrayBuffer();
        return {
          id: index + 1,
          imageBase64: Buffer.from(buffer).toString("base64")
        };
      })
    );

    const images = results.filter(r => r.status === "fulfilled").map(r => r.value);
    return images;

  } catch (error) {
    console.error("🔥 Poster Generation Error:", error.message);
    throw error;
  }
};