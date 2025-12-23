export function normalizeBrandingResult(result) {
  return {
    strategy: result?.strategy || {},
    design_styles: Array.isArray(result?.design_styles)
      ? result.design_styles
      : [],
  };
}