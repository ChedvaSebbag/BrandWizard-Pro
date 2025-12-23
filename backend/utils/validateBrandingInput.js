function validateBrandingInput({ essence, audience, style, tone }) {
  if (!essence || !audience || !style || !tone) {
    return false;
  }
  return true;
}

module.exports = { validateBrandingInput };