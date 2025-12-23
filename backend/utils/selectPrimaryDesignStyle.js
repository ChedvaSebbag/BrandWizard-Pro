function selectPrimaryDesignStyle(designStyles) {
  if (!Array.isArray(designStyles) || designStyles.length === 0) {
    return null;
  }

  return designStyles[0];
}

module.exports = { selectPrimaryDesignStyle };