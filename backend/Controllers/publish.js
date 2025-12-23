import fetch from "node-fetch";
import archiver from "archiver";
import { PassThrough } from "stream";

export async function publishLanding(req, res) {
    const { html } = req.body;

    if (!html) {
        return res.status(400).json({ error: "HTML content is missing" });
    }

    try {
        // 1. יצירת אתר חדש בנטליפיי
        const createRes = await fetch("https://api.netlify.com/api/v1/sites", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.NET_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                name: `brandwizard-${Date.now()}`,
            }),
        });

        const siteData = await createRes.json();
        if (!createRes.ok) throw new Error(siteData.message || "Failed to create site");
        
        const SITE_ID = siteData.id;

        // 2. הכנת ה-ZIP והזרם (Stream)
        const stream = new PassThrough();
        const archive = archiver('zip', { zlib: { level: 9 } });

        archive.on('error', err => { throw err; });

        // 3. ביצוע ה-Deploy (שליחת הזרם)
        // חשוב: נטליפיי דורשת Content-Type של application/zip ב-Deploy
        const deployPromise = fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/deploys`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.NET_TOKEN}`,
                "Content-Type": "application/zip",
            },
            body: stream,
        }).then(res => res.json());

        // הזרקת התוכן לארכיון
        archive.pipe(stream);
        // התיקון הקריטי: שם הקובץ חייב להיות index.html כדי שהשרת יציג אותו כדף הבית
        archive.append(html, { name: 'index.html' });
        archive.finalize();

        const deployData = await deployPromise;

        if (deployData.error) throw new Error(deployData.error);

        // החזרת הקישור הישיר לאתר
        res.json({ 
            url: deployData.ssl_url || deployData.url,
            siteId: SITE_ID 
        });

    } catch (error) {
        console.error("Publish Error:", error);
        res.status(500).json({ error: "הפרסום נכשל" });
    }
}