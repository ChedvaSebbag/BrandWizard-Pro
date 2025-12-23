import { buildBrandingPrompt } from "../buildBrandingPrompt";

describe("buildBrandingPrompt", () => {
  test("includes all branding inputs in the prompt", () => {
    const input = {
      essence: "Luxury rugs",
      audience: "High-end clients",
      style: "Minimal",
      tone: "Premium",
    };

    const prompt = buildBrandingPrompt(input);

    expect(prompt).toContain("Luxury rugs");
    expect(prompt).toContain("High-end clients");
    expect(prompt).toContain("Minimal");
    expect(prompt).toContain("Premium");
  });
});