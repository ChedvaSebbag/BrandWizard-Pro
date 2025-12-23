import { buildLandingPageData } from "../buildLandingPageData";

describe("buildLandingPageData", () => {
  test("maps branding result into landing page data", () => {
    const brandingResult = {
      design_styles: [
        {
          brand_name_english: "SilkArt",
          tagline: "Luxury woven rugs",
          color_palette: ["#111", "#222", "#333"],
        },
      ],
    };

    const result = buildLandingPageData(brandingResult);

    expect(result).toEqual({
      brandName: "SilkArt",
      tagline: "Luxury woven rugs",
      colors: ["#111", "#222", "#333"],
    });
  });

  test("returns empty values when branding data is missing", () => {
    const result = buildLandingPageData({});

    expect(result).toEqual({
      brandName: "",
      tagline: "",
      colors: [],
    });
  });
});