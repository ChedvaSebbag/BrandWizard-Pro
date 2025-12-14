function analyzeBusiness(formData) {
  // בהמשך כאן נוסיף את ה-AI
  return {
    status: "ok",
    analysis: {
      businessType: formData.businessType,
      targetAudience: formData.targetAudience,
      competitors: formData.competitors,
      brandStyle: formData.brandStyle,
      tone: formData.tone,
    }
  };
}

module.exports = { analyzeBusiness };
