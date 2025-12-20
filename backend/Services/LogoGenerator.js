import fetch from 'node-fetch';

export const generateLogoImage = async (imagePrompt) => {
  try {
    const cleanPrompt = imagePrompt.replace(/[\[\]]/g, '').replace(/["']/g, '').trim();
    const encodedPrompt = encodeURIComponent(cleanPrompt);
    const seed = Math.floor(Math.random() * 1000000);
    
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${seed}`;

    console.log("🎨 Fetching Logo Image:", url);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    if (!response.ok) throw new Error(`Status: ${response.status}`);

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer).toString('base64');
    
  } catch (error) {
    console.error("🔥 Image Fetch Error:", error.message);
    throw error;
  }
};