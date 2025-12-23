function buildBrandingPayload(input) {
  return {
    essence: input?.essence || "",
    audience: input?.audience || "",
    style: input?.style || "",
    tone: input?.tone || "",
  };
}

module.exports = { buildBrandingPayload };