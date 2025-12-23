const { normalizeBrandingResponse } = require("../normalizeBrandingResponse");

describe("normalizeBrandingResponse", () => {
  test("returns normalized response when data exists", () => {
    const input = {
      strategy: { overview: "test" },
      design_styles: [{ style_id: 1 }],
    };

    const result = normalizeBrandingResponse(input);

    expect(result).toEqual({
      strategy: { overview: "test" },
      design_styles: [{ style_id: 1 }],
    });
  });

  test("returns safe defaults when response is empty", () => {
    const result = normalizeBrandingResponse({});

    expect(result).toEqual({
      strategy: {},
      design_styles: [],
    });
  });

  test("returns safe defaults when response is null", () => {
    const result = normalizeBrandingResponse(null);

    expect(result).toEqual({
      strategy: {},
      design_styles: [],
    });
  });
});