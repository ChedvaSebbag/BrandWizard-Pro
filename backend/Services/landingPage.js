
export async function generateLandingPage(data) {
  // 1️⃣ בניית ה-prompt בתוך אותו קובץ
  const prompt = `
You are a branding and UX copywriting expert.

Using the following business data, generate content for a one-page landing page
for a NEW business.

Business data:
- Name: ${data.businessName}
- Description: ${data.businessDescription}
- Brand essence: ${data.essence}
- Target audience: ${data.targetAudience}
- Tone of voice: ${data.tone}
- Main tagline: ${data.tagline}

Rules:
- Keep everything concise and professional
- No buzzwords or marketing clichés
- Write for a first impression landing page
- Do NOT invent personal stories

Return the result strictly as valid JSON with the following structure:
{
  "hero": { "title": "", "subtitle": "", "tagline": "" },
  "about": "",
  "services": [],
  "whyUs": [],
  "brandStatement": "",
  "cta": ""
}
`;

  // 2️⃣ קריאה ל-AI
  const response = await callAI(prompt);

  // 3️⃣ החזרת JSON מוכן ל-Frontend
  return JSON.parse(response);
}
