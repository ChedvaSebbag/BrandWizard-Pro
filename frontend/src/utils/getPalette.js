export function getPalette(landingData) {
  const palette =
    landingData?.colors ||
    landingData?.color_palette ||
    landingData?.design_styles?.[0]?.color_palette ||
    [];

  const [c1, c2, c3] =
    palette.length >= 3
      ? palette
      : ["#0f172a", "#14b8a6", "#f59e0b"];

  return { c1, c2, c3 };
}