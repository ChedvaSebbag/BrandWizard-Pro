import { generateLandingPage } from "../Services/landingPage.js";

export async function createLandingPage(req, res) {
  try {
    const landingPageData = await generateLandingPage(req.body);
    res.status(200).json(landingPageData);
  } catch (error) {
    console.error("Landing Page Controller Error:", error);
    res.status(500).json({
      error: "Failed to generate landing page"
    });
  }
}
