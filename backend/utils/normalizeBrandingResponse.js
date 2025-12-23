function normalizeBrandingResponse(aiResponse) {
  return {
    strategy: aiResponse?.strategy || {},
    design_styles: Array.isArray(aiResponse?.design_styles)
      ? aiResponse.design_styles
      : [],
  };
}

module.exports = { normalizeBrandingResponse };