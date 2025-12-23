const { buildBrandingPayload } = require("../buildBrandingPayload");

describe("buildBrandingPayload", () => {
  test("builds payload from valid input", () => {
    const input = {
      essence: "Luxury rugs",
      audience: "High-end clients",
      style: "Minimal",
      tone: "Premium",
    };

    const result = buildBrandingPayload(input);

    expect(result).toEqual({
      essence: "Luxury rugs",
      audience: "High-end clients",
      style: "Minimal",
      tone: "Premium",
    });
  });

  test("returns empty strings when input is missing fields", () => {
    const result = buildBrandingPayload({});

    expect(result).toEqual({
      essence: "",
      audience: "",
      style: "",
      tone: "",
    });
  });
});