import fetch from "node-fetch";
import archiver from "archiver";

export async function publishLanding(req, res) {
  const { html } = req.body;
  if (!html) return res.status(400).json({ error: "HTML content is missing" });

  try {
    // 1. Create new site
    const createRes = await fetch("https://api.netlify.com/api/v1/sites", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NET_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: `site-${Date.now()}` }),
    });
    const siteData = await createRes.json();
    if (!createRes.ok) throw new Error(siteData.message || "Failed to create site");

    // 2. Create ZIP in memory with proper folder
    const chunks = [];
    const archive = archiver("zip");

    const zipBuffer = await new Promise((resolve, reject) => {
      archive.on("data", (chunk) => chunks.push(chunk));
      archive.on("end", () => resolve(Buffer.concat(chunks)));
      archive.on("error", reject);

      // Put the file *inside a folder*
      archive.append(html, { name: "site/index.html" });
      archive.finalize();
    });

    // 3. Upload deploy
    const deployRes = await fetch(
      `https://api.netlify.com/api/v1/sites/${siteData.id}/deploys`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NET_TOKEN}`,
          "Content-Type": "application/zip",
        },
        body: zipBuffer,
      }
    );

    const deployData = await deployRes.json();
    res.json({ url: deployData.ssl_url || deployData.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "הפרסום נכשל" });
  }
}
