const { analyzeBusiness } = require("../Services/analyzeService");

function analyzeController(req, res) {
  const result = analyzeBusiness(req.body);
  res.json(result);
}

module.exports = { analyzeController };
