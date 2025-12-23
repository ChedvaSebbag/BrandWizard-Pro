export function buildLandingPageData(brandingResult) {
  return {
    brandName: brandingResult?.design_styles?.[0]?.brand_name_english || "",
    tagline: brandingResult?.design_styles?.[0]?.tagline || "",
    colors: brandingResult?.design_styles?.[0]?.color_palette || [],
  };
}