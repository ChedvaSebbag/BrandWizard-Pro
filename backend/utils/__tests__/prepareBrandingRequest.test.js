const { prepareBrandingRequest } = require("../prepareBrandingRequest");

describe("prepareBrandingRequest", () => {
  test("returns payload when input is valid", () => {
    const input = {
      essence: "Luxury rugs",
      audience: "High-end clients",
      style: "Minimal",
      tone: "Premium",
    };

    const result = prepareBrandingRequest(input);

    expect(result).toEqual({
      isValid: true,
      payload: {
        essence: "Luxury rugs",
        audience: "High-end clients",
        style: "Minimal",
        tone: "Premium",
      },
    });
  });

  test("returns null when input is invalid", () => {
    const input = {
      essence: "Luxury rugs",
      audience: "",
      style: "Minimal",
      tone: "Premium",
    };

    const result = prepareBrandingRequest(input);

    expect(result).toBeNull();
  });
});