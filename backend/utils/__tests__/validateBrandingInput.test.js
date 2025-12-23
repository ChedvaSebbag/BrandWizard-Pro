const { validateBrandingInput } = require("../validateBrandingInput");

describe("validateBrandingInput", () => {
  test("returns true when all fields exist", () => {
    const input = {
      essence: "Luxury rugs",
      audience: "High-end clients",
      style: "Minimal",
      tone: "Premium",
    };

    expect(validateBrandingInput(input)).toBe(true);
  });

  test("returns false when a field is missing", () => {
    const input = {
      essence: "Luxury rugs",
      audience: "High-end clients",
      style: "Minimal",
      tone: "",
    };

    expect(validateBrandingInput(input)).toBe(false);
  });
});