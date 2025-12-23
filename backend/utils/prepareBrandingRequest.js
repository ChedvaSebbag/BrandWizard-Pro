const { validateBrandingInput } = require("./validateBrandingInput");
const { buildBrandingPayload } = require("./buildBrandingPayload");

function prepareBrandingRequest(input) {
  if (!validateBrandingInput(input)) {
    return null;
  }

  const payload = buildBrandingPayload(input);

  return {
    isValid: true,
    payload,
  };
}

module.exports = { prepareBrandingRequest };