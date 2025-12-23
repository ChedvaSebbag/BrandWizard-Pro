import { normalizeBrandingResult } from "../normalizeBrandingResult";

describe("normalizeBrandingResult", () => {
  test("returns normalized structure when data exists", () => {
    const input = {
      strategy: { overview: "test" },
      design_styles: [{ style_id: 1 }],
    };

    const result = normalizeBrandingResult(input);

    expect(result).toEqual({
      strategy: { overview: "test" },
      design_styles: [{ style_id: 1 }],
    });
  });

  test("returns safe defaults when input is empty", () => {
    const result = normalizeBrandingResult({});

    expect(result).toEqual({
      strategy: {},
      design_styles: [],
    });
  });

  test("returns safe defaults when input is null", () => {
    const result = normalizeBrandingResult(null);

    expect(result).toEqual({
      strategy: {},
      design_styles: [],
    });
  });
});