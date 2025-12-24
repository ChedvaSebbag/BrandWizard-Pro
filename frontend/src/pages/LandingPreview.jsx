import { useLocation } from "react-router-dom";
import { useState } from "react";

/* ===== פונקציות עזר ===== */
function getPalette(d) {
  const palette = d?.colors || d?.color_palette || [];
  const [c1, c2, c3] =
    palette.length >= 3 ? palette : ["#0f172a", "#14b8a6", "#f59e0b"];
  return { c1, c2, c3 };
}

function getLogoSrc(d) {
  const raw = d?.logo || d?.brandLogo || "";
  if (!raw) return "";
  return raw.startsWith("data:image/")
    ? raw
    : `data:image/png;base64,${raw}`;
}

/* ===== קומפוננטה ===== */
export default function LandingPreview() {
  const { state } = useLocation();
  const d = state?.landingData;

  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState("");

  if (!d) {
    return (
      <div className="p-20 text-center text-gray-500">
        טוען נתונים...
      </div>
    );
  }

  const { c1, c2, c3 } = getPalette(d);
  const logoSrc = getLogoSrc(d);
  const phone = d.contactInfo?.phone || d.phone || "";
  const email = d.contactInfo?.email || d.email || "";

  const buildHtml = () => {
    const servicesHtml = Array.isArray(d.services)
      ? d.services
          .map((s) => `<li style="margin-bottom:10px;">✓ ${s}</li>`)
          .join("")
      : "";

    return `
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${d.businessName || "דף נחיתה"}</title>
</head>
<body>
<h1>${d.hero?.title || ""}</h1>
<p>${d.hero?.subtitle || ""}</p>
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
    } catch {
      alert("שגיאה בפרסום");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDownload = () => {
    const htmlContent = buildHtml();
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "index.html";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* ===== NAV ===== */}
      <nav className="bg-slate-900 text-white p-4 flex justify-between items-center">
        <span className="font-bold">
          תצוגה מקדימה: {d.businessName}
        </span>

        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-full font-bold"
          >
            הורד HTML 📥
          </button>

          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-full font-bold"
          >
            {isPublishing ? "מפרסם..." : "קבל קישור לאתר חי 🔗"}
          </button>
        </div>
      </nav>

      {/* ===== CONTENT ===== */}
      <div className="max-w-5xl mx-auto my-10 bg-white rounded-[40px] p-10 shadow-xl">
        
        {/* ===== תוצאה אחרי פרסום ===== */}
        {publishedUrl && (
          <div className="mb-10 p-6 bg-emerald-50 border-2 border-emerald-500 rounded-3xl text-center space-y-4">
            <p className="font-bold text-emerald-800">
              🎉 האתר שלך באוויר!
            </p>

            <a
              href={publishedUrl}
              target="_blank"
              rel="noreferrer"
              className="block text-blue-600 underline font-mono"
            >
              {publishedUrl}
            </a>

            {/* 👇 הכפתור החדש */}
            <a
              href="https://domains.squarespace.com/google-domains/?channel=bd&subchannel=google-kb-9-10-2024&source=google_domain_referral&utm_source=google_domain_referral&utm_medium=bd&utm_content=google-kb-9-10-2024"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full font-bold transition"
            >
              🌐 רוצה דומיין משלך? קנה עכשיו
            </a>

            <p className="text-sm text-gray-500">
              חבר דומיין אישי והפוך את האתר למקצועי באמת
            </p>
          </div>
        )}

        {/* ===== תצוגת האתר ===== */}
        <header className="flex justify-between items-center mb-10">
          {logoSrc && (
            <img src={logoSrc} alt="לוגו" className="h-16" />
          )}
          <div className="text-2xl font-bold" style={{ color: c2 }}>
            {phone}
          </div>
        </header>

        <section className="text-center py-16 rounded-[30px]" style={{ background: `${c2}10` }}>
          <h1 className="text-5xl font-black mb-4">{d.hero?.title}</h1>
          <p className="text-2xl text-gray-600 mb-8">
            {d.hero?.subtitle}
          </p>
          <button
            className="px-12 py-4 rounded-full text-white text-xl font-bold"
            style={{ background: c2 }}
          >
            {d.cta}
          </button>
        </section>
      </div>
    </div>
  );
}
