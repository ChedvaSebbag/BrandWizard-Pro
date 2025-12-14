const express = require("express");
const cors = require("cors");

const analyzeRoutes = require("./Routes/analyzeRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/analyze", analyzeRoutes);

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
