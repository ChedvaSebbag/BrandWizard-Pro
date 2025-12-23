import { useLocation } from "react-router-dom";

/**
 * עוזר: בוחר פלטת צבעים מהדאטה (תומך בכמה שמות אפשריים)
 */
function getPalette(landingData) {
  // נסי כמה מקומות אפשריים לפלטה
  const palette =
    landingData?.colors ||
    landingData?.color_palette ||
    landingData?.design_styles?.[0]?.color_palette ||
    landingData?.selectedStyle?.color_palette ||
    [];

  // Fallback יפה אם אין
  const [c1, c2, c3] = palette.length >= 3 ? palette : ["#0f172a", "#14b8a6", "#f59e0b"];
  return { c1, c2, c3 };
}

/**
 * עוזר: מזהה לוגו (תומך ב-base64 בלי prefix / base64 עם prefix / url)
 */
function getLogoSrc(landingData) {
  const raw =
    landingData?.logo ||
    landingData?.brandLogo ||
    landingData?.selectedStyle?.logo ||
    "";

  if (!raw) return "";

  // אם זה כבר data url
  if (raw.startsWith("data:image/")) return raw;

  // אם זה נראה כמו base64 "נקי"
  if (raw.startsWith("/9j") || raw.startsWith("iVBOR") || raw.length > 300) {
    // רוב הלוגואים אצלך יצאו jpg base64, אבל אם זה png זה גם בסדר
    // ננסה PNG אם מתחיל iVBOR, אחרת JPEG
    const mime = raw.startsWith("iVBOR") ? "image/png" : "image/jpeg";
    return `data:${mime};base64,${raw}`;
  }

  // אחרת נניח שזה URL
  return raw;
}

/**
 * הורדת דף נחיתה מעוצב לפי פלטת הצבעים + לוגו
 */
function downloadHTML(landingData) {
  const { c1, c2, c3 } = getPalette(landingData);
  const logoSrc = getLogoSrc(landingData);

  const servicesHtml = Array.isArray(landingData.services)
    ? landingData.services.map((s) => `<li>${s}</li>`).join("")
    : "";

  const whyUsHtml = Array.isArray(landingData.whyUs)
    ? landingData.whyUs.map((w) => `<li>${w}</li>`).join("")
    : "";

  const html = `
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>${landingData.hero?.title || "Landing Page"}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <style>
    :root{
      --c1:${c1};
      --c2:${c2};
      --c3:${c3};
      --text:#0b0f19;
      --muted:#5b6472;
      --bg:#ffffff;
      --card:#ffffff;
      --soft: rgba(0,0,0,0.06);
    }

    *{ box-sizing:border-box; }
    body{
      margin:0;
      font-family: Arial, sans-serif;
      background: radial-gradient(1200px 600px at 20% 0%, color-mix(in oklab, var(--c2) 18%, white) 0%, transparent 60%),
                  radial-gradient(900px 500px at 90% 10%, color-mix(in oklab, var(--c3) 18%, white) 0%, transparent 55%),
                  var(--bg);
      color: var(--text);
      line-height:1.6;
    }

    .wrap{
      max-width: 980px;
      margin:0 auto;
      padding: 54px 22px 80px;
    }

    /* Top bar */
    .top{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:16px;
      margin-bottom: 34px;
    }

    .brand{
      display:flex;
      align-items:center;
      gap:14px;
    }

    .logo{
      width:56px;
      height:56px;
      border-radius:16px;
      background: #fff;
      border:1px solid var(--soft);
      display:flex;
      align-items:center;
      justify-content:center;
      overflow:hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.06);
    }

    .logo img{
      width:100%;
      height:100%;
      object-fit:contain;
      padding:8px;
    }

    .brandTitle{
      font-weight:700;
      letter-spacing:0.2px;
      font-size:16px;
      color: var(--muted);
    }

    .pill{
      display:inline-flex;
      align-items:center;
      gap:8px;
      padding:10px 14px;
      border-radius:999px;
      background: color-mix(in oklab, var(--c2) 12%, white);
      border:1px solid color-mix(in oklab, var(--c2) 30%, white);
      color: #0b0f19;
      font-size:14px;
      white-space:nowrap;
    }

    /* Hero */
    .hero{
      text-align:center;
      padding: 52px 26px;
      border-radius: 28px;
      background:
        linear-gradient(135deg,
          color-mix(in oklab, var(--c2) 16%, white) 0%,
          color-mix(in oklab, var(--c3) 12%, white) 55%,
          white 100%);
      border:1px solid var(--soft);
      box-shadow: 0 18px 60px rgba(0,0,0,0.07);
      margin-bottom: 26px;
      position:relative;
      overflow:hidden;
    }

    .hero::after{
      content:"";
      position:absolute;
      inset:-2px;
      background: radial-gradient(500px 260px at 20% 10%, color-mix(in oklab, var(--c2) 22%, transparent), transparent 60%),
                  radial-gradient(560px 280px at 80% 0%, color-mix(in oklab, var(--c3) 22%, transparent), transparent 62%);
      pointer-events:none;
      opacity:0.9;
    }

    .heroInner{ position:relative; z-index:1; }

    h1{
      margin:0 0 14px;
      font-size: 44px;
      line-height:1.12;
      letter-spacing:-0.3px;
    }

    .subtitle{
      margin:0 auto 10px;
      max-width: 720px;
      font-size: 18px;
      color: var(--muted);
    }

    .tagline{
      display:inline-block;
      margin-top: 14px;
      padding: 10px 16px;
      border-radius: 999px;
      background: rgba(255,255,255,0.7);
      border:1px solid var(--soft);
      font-size: 14px;
      color: #1b2533;
    }

    /* Content grid */
    .grid{
      display:grid;
      grid-template-columns: 1fr;
      gap: 18px;
      margin-top: 18px;
    }

    @media (min-width: 900px){
      .grid{
        grid-template-columns: 1.2fr 0.8fr;
        align-items:start;
      }
    }

    .card{
      background: var(--card);
      border: 1px solid var(--soft);
      border-radius: 22px;
      padding: 22px;
      box-shadow: 0 14px 40px rgba(0,0,0,0.06);
    }

    .card h2{
      margin:0 0 10px;
      font-size: 20px;
    }

    .muted{
      color: var(--muted);
    }

    ul{
      margin: 10px 0 0;
      padding-right: 18px;
    }
    li{ margin-bottom: 8px; }

    /* Quote */
    .quote{
      margin-top: 18px;
      padding: 26px;
      border-radius: 22px;
      border: 1px solid color-mix(in oklab, var(--c2) 30%, white);
      background: color-mix(in oklab, var(--c2) 10%, white);
      text-align:center;
      font-style: italic;
      font-size: 18px;
    }

    /* CTA */
    .ctaWrap{
      margin-top: 28px;
      text-align:center;
    }

    .btn{
      display:inline-block;
      padding: 16px 44px;
      border-radius: 999px;
      border: none;
      cursor: pointer;
      font-size: 16px;
      font-weight: 700;
      background: linear-gradient(135deg, var(--c2), var(--c3));
      color: #0b0f19;
      box-shadow: 0 18px 55px color-mix(in oklab, var(--c2) 20%, transparent);
    }

    .btn:active{ transform: translateY(1px); }

    .footer{
      margin-top: 34px;
      text-align:center;
      font-size: 12px;
      color: var(--muted);
    }
  </style>
</head>

<body>
  <div class="wrap">

    <div class="top">
      <div class="brand">
        ${logoSrc ? `
          <div class="logo">
            <img src="${logoSrc}" alt="logo" />
          </div>
        ` : `
          <div class="logo" style="background: color-mix(in oklab, var(--c2) 14%, white);">
            <div style="width:14px;height:14px;border-radius:999px;background:var(--c2)"></div>
          </div>
        `}
        <div class="brandTitle">${landingData.businessName || landingData.hero?.title || ""}</div>
      </div>

      <div class="pill">🎨 צבעים מתוך הפלטה</div>
    </div>

    <section class="hero">
      <div class="heroInner">
        <h1>${landingData.hero?.title || ""}</h1>
        <p class="subtitle">${landingData.hero?.subtitle || ""}</p>
        <div class="tagline">${landingData.hero?.tagline || ""}</div>
      </div>
    </section>

    <div class="grid">
      <div class="card">
        <h2>על העסק</h2>
        <p class="muted">${landingData.about || ""}</p>

        ${servicesHtml ? `
          <div style="margin-top:18px;">
            <h2>מה אנחנו מציעים</h2>
            <ul>${servicesHtml}</ul>
          </div>
        ` : ""}

        ${whyUsHtml ? `
          <div style="margin-top:18px;">
            <h2>למה אנחנו</h2>
            <ul>${whyUsHtml}</ul>
          </div>
        ` : ""}
      </div>

      <div>
        <div class="card">
          <h2>משפט מותג</h2>
          <p class="muted" style="margin:0">${landingData.brandStatement || ""}</p>
        </div>

        <div class="quote">
          “${landingData.brandStatement || ""}”
        </div>

        <div class="ctaWrap">
          <button class="btn">${landingData.cta || "צור קשר"}</button>
        </div>
      </div>
    </div>

    <div class="footer">
      נוצר באמצעות BrandWizard • דף נחיתה עצמאי להורדה
    </div>

  </div>
</body>
</html>
`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "landing-page.html";
  link.click();
}

export default function LandingPreview() {
  const { state } = useLocation();
  const landingData = state?.landingData;

  if (!landingData) {
    return <p className="p-10">אין נתונים להצגה</p>;
  }

  const { c1, c2, c3 } = getPalette(landingData);
  const logoSrc = getLogoSrc(landingData);

  return (
    <div className="min-h-screen" style={{
      background: `radial-gradient(900px 450px at 15% 0%, ${c2}22 0%, transparent 60%),
                   radial-gradient(780px 420px at 90% 0%, ${c3}22 0%, transparent 55%),
                   #ffffff`
    }}>
      <div className="max-w-5xl mx-auto px-6 py-16 font-sans">
        
        {/* Header + Logo */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl border bg-white shadow-sm flex items-center justify-center overflow-hidden">
              {logoSrc ? (
                <img src={logoSrc} alt="logo" className="w-full h-full object-contain p-2" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full" style={{ background: c2 }} />
              )}
            </div>
            <div className="text-sm text-gray-600 font-semibold">
              {landingData.businessName || "Landing Preview"}
            </div>
          </div>

          <button
            onClick={() => downloadHTML(landingData)}
            className="rounded-full border px-8 py-3 text-sm hover:bg-gray-50 transition"
          >
            הורד HTML מעוצב
          </button>
        </div>

        {/* Hero */}
        <section
          className="text-center space-y-3 mb-14 rounded-3xl border shadow-sm px-8 py-14"
          style={{
            background: `linear-gradient(135deg, ${c2}18 0%, ${c3}14 55%, #fff 100%)`,
          }}
        >
          <h1 className="text-4xl md:text-5xl font-bold">{landingData.hero.title}</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">{landingData.hero.subtitle}</p>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border px-4 py-2 text-sm text-gray-600">
            {landingData.hero.tagline}
          </div>
        </section>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            <section className="rounded-2xl border bg-white shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-2">על העסק</h2>
              <p className="text-gray-700 leading-relaxed">{landingData.about}</p>
            </section>

            <section className="rounded-2xl border bg-white shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-2">מה אנחנו מציעים</h2>
              <ul className="list-disc list-inside space-y-2">
                {landingData.services.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </section>

            {Array.isArray(landingData.whyUs) && landingData.whyUs.length > 0 && (
              <section className="rounded-2xl border bg-white shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-2">למה אנחנו</h2>
                <ul className="list-disc list-inside space-y-2">
                  {landingData.whyUs.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div className="space-y-6">
            <section
              className="rounded-2xl border shadow-sm p-6 text-center"
              style={{ background: `${c2}10` }}
            >
              <blockquote className="italic text-lg leading-relaxed">
                “{landingData.brandStatement}”
              </blockquote>
            </section>

            <section className="rounded-2xl border bg-white shadow-sm p-6 text-center">
              <button
                className="w-full rounded-full px-10 py-4 text-lg font-semibold transition"
                style={{
                  background: `linear-gradient(135deg, ${c2}, ${c3})`,
                  color: "#0b0f19",
                }}
              >
                {landingData.cta}
              </button>
              <p className="text-xs text-gray-500 mt-3">
                הכפתור כאן דמו בלבד (ה-HTML המורד נשאר סטטי)
              </p>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
}
