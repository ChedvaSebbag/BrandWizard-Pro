import { useLocation } from "react-router-dom";
import { useState } from "react";

// פונקציות עזר לחילוץ נתונים בטוח
function getPalette(d) {
  const palette = d?.colors || d?.color_palette || [];
  const [c1, c2, c3] = palette.length >= 3 ? palette : ["#0f172a", "#14b8a6", "#f59e0b"];
  return { c1, c2, c3 };
}

function getLogoSrc(d) {
  const raw = d?.logo || "";
  if (!raw) return "";
  return raw.startsWith("data:image/") ? raw : `data:image/png;base64,${raw}`;
}

export default function LandingPreview() {
  const { state } = useLocation();
  const d = state?.landingData;
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState("");

  // הגנה: אם אין נתונים, לא לרנדר דף ריק
  if (!d) return <div className="p-20 text-center font-sans text-gray-500">טוען נתונים...</div>;

  const { c1, c2, c3 } = getPalette(d);
  const logoSrc = getLogoSrc(d);
  const phone = d.contactInfo?.phone || d.phone || "";
  const email = d.contactInfo?.email || d.email || "";

  // בניית ה-HTML המלא לפרסום (מבוסס על העיצוב ה"יפה")
  const buildHtml = () => {
    const servicesHtml = Array.isArray(d.services) 
      ? d.services.map(s => `<li style="margin-bottom:10px;">✓ ${s}</li>`).join("") 
      : "";

    return `
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${d.businessName || "דף נחיתה"}</title>
  <style>
    :root { --c1: ${c1}; --c2: ${c2}; --c3: ${c3}; }
    body { font-family: system-ui, sans-serif; margin: 0; background: #fff; color: #1a1a1a; text-align: right; line-height: 1.6; }
    .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
    header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 20px; border-bottom: 1px solid #eee; }
    .hero { background: linear-gradient(135deg, ${c2}10, white); padding: 70px 30px; border-radius: 40px; text-align: center; border: 1px solid #f0f0f0; margin-top: 30px; }
    .btn { display: inline-block; background: ${c2}; color: white; padding: 18px 45px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 1.3rem; margin-top: 20px; box-shadow: 0 10px 20px ${c2}30; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 40px; }
    .card { background: #f9f9f9; padding: 30px; border-radius: 25px; border: 1px solid #eee; }
    .footer { background: #111; color: white; padding: 40px; border-radius: 30px; margin-top: 50px; text-align: center; }
    @media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="container">
    <header>
      ${logoSrc ? `<img src="${logoSrc}" height="50">` : `<strong>${d.businessName}</strong>`}
      <div>${phone}</div>
    </header>
    <section class="hero">
      <h1>${d.hero?.title || ""}</h1>
      <p style="font-size:1.3rem; color:#555">${d.hero?.subtitle || ""}</p>
      <a href="tel:${phone}" class="btn">${d.cta || "צרו קשר"}</a>
    </section>
    <div class="grid">
      <div class="card"><h2>על העסק</h2><p>${d.about || ""}</p></div>
      <div class="card"><h2>השירותים שלנו</h2><ul style="list-style:none; padding:0">${servicesHtml}</ul></div>
    </div>
    <div class="footer">
      <p>${phone} | ${email}</p>
    </div>
  </div>
</body>
</html>`;
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const res = await fetch("http://localhost:5000/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: buildHtml() }),
      });
      const data = await res.json();
      setPublishedUrl(data.url);
    } catch (err) {
      alert("שגיאה בפרסום");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-right font-sans" dir="rtl">
      {/* סרגל מערכת */}
      <nav className="bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
        <span className="font-bold">תצוגה מקדימה: {d.businessName}</span>
        <button 
          onClick={handlePublish}
          disabled={isPublishing}
          className="bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-full text-sm font-bold transition-all"
        >
          {isPublishing ? "מפרסם..." : "קבל קישור לאתר חי 🔗"}
        </button>
      </nav>

      {/* תצוגת האתר בתוך הקומפוננטה */}
      <div className="max-w-5xl mx-auto my-10 bg-white shadow-2xl rounded-[50px] overflow-hidden border p-10 md:p-16">
        {publishedUrl && (
          <div className="mb-10 p-6 bg-emerald-50 border-2 border-emerald-500 rounded-3xl text-center">
            <p className="font-bold text-emerald-800 mb-2">🎉 האתר שלך באוויר!</p>
            <a href={publishedUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline font-mono">{publishedUrl}</a>
          </div>
        )}

        <header className="flex justify-between items-center mb-16 border-b pb-6">
          <div className="h-16">{logoSrc && <img src={logoSrc} className="h-full object-contain" alt="לוגו" />}</div>
          <div className="text-2xl font-bold" style={{ color: c2 }}>{phone}</div>
        </header>

        <section className="text-center mb-20 py-16 px-6 rounded-[40px]" style={{ background: `${c2}10` }}>
          <h1 className="text-5xl md:text-6xl font-black mb-6">{d.hero?.title}</h1>
          <p className="text-2xl text-gray-600 mb-10">{d.hero?.subtitle}</p>
          <button className="px-14 py-5 rounded-full text-2xl font-bold text-white shadow-xl" style={{ background: c2 }}>
            {d.cta}
          </button>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <div className="bg-slate-50 p-10 rounded-[35px] border">
              <h2 className="text-2xl font-bold mb-4" style={{ color: c2 }}>על העסק</h2>
              <p className="text-xl text-gray-700 leading-relaxed">{d.about}</p>
            </div>
            <div className="bg-slate-50 p-10 rounded-[35px] border">
              <h2 className="text-2xl font-bold mb-4" style={{ color: c2 }}>השירותים שלנו</h2>
              <ul className="space-y-3">
                {d.services?.map((s, i) => <li key={i} className="text-lg">✓ {s}</li>)}
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-8 bg-indigo-50 rounded-[35px] italic text-xl border-2 border-indigo-100 text-center">
              "{d.brandStatement}"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}