import { validateBrandingForm } from "../validateBrandingForm";

describe("validateBrandingForm", () => {
  test("returns true when all fields are filled", () => {
    const input = {
      essence: "Luxury rugs",
      audience: "High-end clients",
      style: "Minimal",
      tone: "Premium",
    };

    expect(validateBrandingForm(input)).toBe(true);
  });

  test("returns false when one field is missing", () => {
    const input = {
      essence: "Luxury rugs",
      audience: "",
      style: "Minimal",
      tone: "Premium",
    };

    expect(validateBrandingForm(input)).toBe(false);
  });
});