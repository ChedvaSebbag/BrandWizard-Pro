
// import { useLocation } from "react-router-dom";

// /**
//  * פונקציית עזר: חילוץ פלטת הצבעים מתוך המידע שהגיע
//  */
// function getPalette(landingData) {
//   const palette =
//     landingData?.colors ||
//     landingData?.color_palette ||
//     landingData?.design_styles?.[0]?.color_palette ||
//     [];

//   // Fallback למקרה שאין פלטה
//   const [c1, c2, c3] = palette.length >= 3 ? palette : ["#0f172a", "#14b8a6", "#f59e0b"];
//   return { c1, c2, c3 };
// }

// /**
//  * פונקציית עזר: זיהוי לוגו והפיכתו ל-src תקין
//  */
// function getLogoSrc(landingData) {
//   const raw = landingData?.logo || landingData?.brandLogo || "";
//   if (!raw) return "";
//   if (raw.startsWith("data:image/")) return raw;
//   return `data:image/png;base64,${raw}`;
// }

// /**
//  * הורדת דף נחיתה מעוצב כקובץ HTML סטטי
//  */
// function downloadHTML(landingData) {
//   const { c1, c2, c3 } = getPalette(landingData);
//   const logoSrc = getLogoSrc(landingData);
//   const phone = landingData?.contactInfo?.phone || "";
//   const email = landingData?.contactInfo?.email || "";

//   const servicesHtml = Array.isArray(landingData.services)
//     ? landingData.services.map((s) => `<li>${s}</li>`).join("")
//     : "";

//   const html = `
// <!DOCTYPE html>
// <html lang="he" dir="rtl">
// <head>
//   <meta charset="UTF-8" />
//   <title>${landingData.hero?.title || "דף נחיתה"}</title>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <style>
//     :root{ --c1:${c1}; --c2:${c2}; --c3:${c3}; --text:#0b0f19; --muted:#5b6472; --bg:#ffffff; --soft:rgba(0,0,0,0.06); }
//     body{ margin:0; font-family: system-ui, sans-serif; background:radial-gradient(1200px 600px at 20% 0%, color-mix(in oklab, var(--c2) 18%, white) 0%, transparent 60%), var(--bg); color: var(--text); line-height:1.6; }
//     .wrap{ max-width: 980px; margin:0 auto; padding: 54px 22px; }
//     .top{ display:flex; align-items:center; justify-content:space-between; margin-bottom:34px; }
//     .logo{ width:56px; height:56px; border-radius:16px; background:#fff; border:1px solid var(--soft); display:flex; align-items:center; justify-content:center; overflow:hidden; }
//     .logo img{ width:100%; height:100%; object-fit:contain; padding:8px; }
//     .hero{ text-align:center; padding: 52px 26px; border-radius: 28px; background:linear-gradient(135deg, color-mix(in oklab, var(--c2) 16%, white), white); border:1px solid var(--soft); margin-bottom: 26px; position:relative; overflow:hidden; }
//     h1{ font-size: 44px; margin-bottom:14px; }
//     .btn{ display:inline-block; padding: 16px 44px; border-radius: 999px; background:linear-gradient(135deg, var(--c2), var(--c3)); color: #fff; text-decoration:none; font-weight:700; }
//     .grid{ display:grid; grid-template-columns: 1.2fr 0.8fr; gap:18px; }
//     .card{ background:#fff; border:1px solid var(--soft); border-radius:22px; padding:22px; }
//     @media (max-width: 800px) { .grid { grid-template-columns: 1fr; } }
//   </style>
// </head>
// <body>
//   <div class="wrap">
//     <div class="top">
//       <div class="logo">${logoSrc ? `<img src="${logoSrc}">` : ''}</div>
//       <div>${phone}</div>
//     </div>
//     <section class="hero">
//       <h1>${landingData.hero.title}</h1>
//       <p>${landingData.hero.subtitle}</p>
//       <a href="tel:${phone}" class="btn">${landingData.cta}</a>
//     </section>
//     <div class="grid">
//       <div class="card"><h2>על העסק</h2><p>${landingData.about}</p></div>
//       <div class="card"><h2>שירותים</h2><ul>${servicesHtml}</ul></div>
//     </div>
//   </div>
// </body>
// </html>`;

//   const blob = new Blob([html], { type: "text/html;charset=utf-8;" });
//   const link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.download = "landing-page.html";
//   link.click();
// }

// export default function LandingPreview() {
//   const { state } = useLocation();
//   const landingData = state?.landingData;

//   if (!landingData) {
//     return <div className="p-20 text-center font-sans text-gray-500">אין נתונים להצגה</div>;
//   }

//   const { c1, c2, c3 } = getPalette(landingData);
//   const logoSrc = getLogoSrc(landingData);

//   return (
//     <div className="min-h-screen font-sans" style={{
//       background: `radial-gradient(900px 450px at 15% 0%, ${c2}22 0%, transparent 60%),
//                    radial-gradient(780px 420px at 90% 0%, ${c3}22 0%, transparent 55%),
//                    #ffffff`
//     }}>
//       {/* סרגל עליון של המערכת */}
//       <div className="bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
//         <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs">AI</div>
//             <span className="text-sm font-medium">תצוגה מקדימה: {landingData.businessName}</span>
//         </div>
//         <button
//           onClick={() => downloadHTML(landingData)}
//           className="bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-full text-sm font-bold transition-colors"
//         >
//           הורד קובץ HTML מוכן
//         </button>
//       </div>

//       <div className="max-w-5xl mx-auto px-6 py-16">
        
//         {/* Header הדף */}
//         <div className="flex items-center justify-between gap-4 mb-10">
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 rounded-2xl border bg-white shadow-sm flex items-center justify-center overflow-hidden">
//               {logoSrc ? (
//                 <img src={logoSrc} alt="logo" className="w-full h-full object-contain p-2" />
//               ) : (
//                 <div className="w-4 h-4 rounded-full" style={{ background: c2 }} />
//               )}
//             </div>
//             <div className="text-lg font-bold text-gray-800">
//               {landingData.businessName}
//             </div>
//           </div>
//           <div className="text-lg font-semibold" style={{ color: c2 }}>
//             {landingData.contactInfo?.phone}
//           </div>
//         </div>

//         {/* Hero Section */}
//         <section
//           className="text-center space-y-6 mb-14 rounded-[40px] border shadow-xl px-8 py-20 relative overflow-hidden"
//           style={{
//             background: `linear-gradient(135deg, ${c2}15 0%, ${c3}10 55%, #fff 100%)`,
//           }}
//         >
//           <div className="relative z-10">
//             <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
//                 {landingData.hero.title}
//             </h1>
//             <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mt-6">
//                 {landingData.hero.subtitle}
//             </p>
//             <div className="mt-10 flex flex-col items-center gap-4">
//                 <button
//                     className="px-12 py-5 rounded-full text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
//                     style={{ background: `linear-gradient(135deg, ${c2}, ${c3})` }}
//                 >
//                     {landingData.cta}
//                 </button>
//                 <div className="text-sm text-slate-400 font-medium">
//                     {landingData.hero.tagline}
//                 </div>
//             </div>
//           </div>
//         </section>

//         {/* Content Area */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-right" dir="rtl">
          
//           <div className="lg:col-span-2 space-y-8">
//             <section className="rounded-3xl border bg-white shadow-sm p-10">
//               <h2 className="text-2xl font-bold mb-4 text-slate-800">על העסק</h2>
//               <p className="text-lg text-slate-600 leading-relaxed">{landingData.about}</p>
//             </section>

//             <section className="rounded-3xl border bg-white shadow-sm p-10">
//               <h2 className="text-2xl font-bold mb-6 text-slate-800">מה אנחנו מציעים</h2>
//               <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {landingData.services?.map((s, i) => (
//                   <li key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
//                     <span className="w-2 h-2 rounded-full" style={{ background: c2 }} />
//                     <span className="font-medium text-slate-700">{s}</span>
//                   </li>
//                 ))}
//               </ul>
//             </section>
//           </div>

//           <div className="space-y-8">
//             <section
//               className="rounded-3xl border shadow-sm p-10 text-center flex items-center justify-center min-h-[200px]"
//               style={{ background: `${c2}08` }}
//             >
//               <blockquote className="text-2xl italic font-serif text-slate-700 leading-relaxed">
//                 “{landingData.brandStatement}”
//               </blockquote>
//             </section>

//             <section className="rounded-3xl border bg-slate-900 p-10 text-center text-white">
//               <h3 className="text-xl font-bold mb-4">מעוניינים בפרטים נוספים?</h3>
//               <p className="text-slate-400 mb-8 text-sm">השאירו פרטים ונחזור אליכם בהקדם</p>
//               <button className="w-full py-4 rounded-2xl font-bold transition-opacity hover:opacity-90" style={{ background: c2 }}>
//                 דברו איתנו בוואטסאפ
//               </button>
//             </section>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
import { useLocation } from "react-router-dom";

function getPalette(landingData) {
  const palette = landingData?.colors || landingData?.color_palette || [];
  const [c1, c2, c3] = palette.length >= 3 ? palette : ["#0f172a", "#14b8a6", "#f59e0b"];
  return { c1, c2, c3 };
}

function getLogoSrc(landingData) {
  const raw = landingData?.logo || "";
  if (!raw) return "";
  return raw.startsWith("data:image/") ? raw : `data:image/png;base64,${raw}`;
}

/**
 * פונקציה להורדת ה-HTML המלא - כוללת את כל חלקי הדף ופרטי הקשר
 */
function downloadHTML(landingData) {
  const { c1, c2, c3 } = getPalette(landingData);
  const logoSrc = getLogoSrc(landingData);
  
  // נתונים שהוזנו בטופס
  const phone = landingData?.contactInfo?.phone || landingData?.phone || "";
  const email = landingData?.contactInfo?.email || landingData?.email || "";
  const ctaType = landingData?.contactInfo?.ctaType || "contact";

  // הגדרת הקישור לכפתור לפי בחירת המשתמש
  let ctaLink = `tel:${phone}`;
  if (ctaType === "whatsapp") {
    const cleanPhone = phone.replace(/\D/g, '');
    ctaLink = `https://wa.me/${cleanPhone.startsWith('0') ? '972' + cleanPhone.substring(1) : cleanPhone}`;
  } else if (ctaType === "contact" && email) {
    ctaLink = `mailto:${email}`;
  }

  const servicesHtml = Array.isArray(landingData.services)
    ? landingData.services.map((s) => `<li>${s}</li>`).join("")
    : "";

  const html = `
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>${landingData.businessName}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    :root { --c1: ${c1}; --c2: ${c2}; --c3: ${c3}; }
    body { font-family: system-ui, sans-serif; background: #fff; color: #1a1a1a; margin: 0; line-height: 1.6; text-align: right; }
    .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
    header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 50px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
    .hero { background: linear-gradient(135deg, ${c2}10, white); padding: 70px 30px; border-radius: 40px; text-align: center; border: 1px solid #f0f0f0; }
    .btn { display: inline-block; background: ${c2}; color: white; padding: 18px 45px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 1.3rem; margin-top: 20px; box-shadow: 0 10px 20px ${c2}30; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 40px; }
    .card { background: #f9f9f9; padding: 30px; border-radius: 25px; border: 1px solid #eee; }
    .contact-footer { background: #111; color: white; padding: 40px; border-radius: 30px; margin-top: 50px; text-align: center; }
    blockquote { font-size: 1.7rem; font-style: italic; border-right: 5px solid ${c2}; padding-right: 20px; margin: 40px 0; }
    @media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="container">
    <header>
      ${logoSrc ? `<img src="${logoSrc}" style="height:50px">` : `<strong>${landingData.businessName}</strong>`}
      <div>${phone}</div>
    </header>

    <section class="hero">
      <h1>${landingData.hero?.title}</h1>
      <p style="font-size:1.3rem; color:#555">${landingData.hero?.subtitle}</p>
      <a href="${ctaLink}" class="btn">${landingData.cta}</a>
    </section>

    <blockquote>“${landingData.brandStatement}”</blockquote>

    <div class="grid">
      <div class="card"><h2>על העסק</h2><p>${landingData.about}</p></div>
      <div class="card"><h2>השירותים שלנו</h2><ul>${servicesHtml}</ul></div>
    </div>

    <div class="contact-footer">
      <h3>מעוניינים בפרטים נוספים?</h3>
      <p>צרו איתנו קשר ישירות:</p>
      <div style="display:flex; justify-content:center; gap:20px; margin-top:20px;">
        ${phone ? `<span>📞 ${phone}</span>` : ""}
        ${email ? `<span>✉️ ${email}</span>` : ""}
      </div>
    </div>
  </div>
</body>
</html>
`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `index.html`;
  link.click();
}

export default function LandingPreview() {
  const { state } = useLocation();
  const landingData = state?.landingData;

  if (!landingData) return <div className="p-20 text-center">אין נתונים</div>;

  const { c2 } = getPalette(landingData);
  const logoSrc = getLogoSrc(landingData);

  return (
    <div className="min-h-screen bg-slate-50 text-right font-sans" dir="rtl">
      <nav className="bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <span className="font-bold">תצוגה מקדימה: {landingData.businessName}</span>
        <button onClick={() => downloadHTML(landingData)} className="bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-full font-bold transition-all">
          הורד קובץ HTML מלא ⬇️
        </button>
      </nav>

      <div className="bg-white max-w-5xl mx-auto my-10 shadow-2xl rounded-[50px] overflow-hidden border p-10 md:p-16">
          <header className="flex justify-between items-center mb-16">
              <div className="h-16">{logoSrc && <img src={logoSrc} className="h-full object-contain" />}</div>
              <div className="text-2xl font-bold" style={{ color: c2 }}>{landingData.contactInfo?.phone}</div>
          </header>

          <section className="text-center mb-20">
              <h1 className="text-6xl font-black mb-6">{landingData.hero?.title}</h1>
              <p className="text-2xl text-gray-600 mb-10">{landingData.hero?.subtitle}</p>
              <button className="px-14 py-5 rounded-full text-2xl font-bold text-white shadow-xl" style={{ background: c2 }}>
                  {landingData.cta}
              </button>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="md:col-span-2 space-y-10">
                  <div className="bg-slate-50 p-10 rounded-[35px] border">
                      <h2 className="text-2xl font-bold mb-4">קצת עלינו</h2>
                      <p className="text-xl text-gray-700 leading-relaxed">{landingData.about}</p>
                  </div>
                  <div className="bg-slate-50 p-10 rounded-[35px] border">
                      <h2 className="text-2xl font-bold mb-4">מה אנחנו מציעים</h2>
                      <ul className="space-y-3">
                          {landingData.services?.map((s, i) => <li key={i} className="text-lg">✓ {s}</li>)}
                      </ul>
                  </div>
              </div>
              <div className="space-y-6">
                  <div className="p-8 bg-indigo-50 rounded-[35px] italic text-xl border-2 border-indigo-100">
                      "{landingData.brandStatement}"
                  </div>
                  <div className="p-8 bg-slate-900 text-white rounded-[35px] text-center">
                      <h4 className="mb-2 font-bold text-emerald-400">פרטי קשר</h4>
                      <p className="text-sm opacity-90">{landingData.contactInfo?.phone}</p>
                      <p className="text-sm opacity-90">{landingData.contactInfo?.email}</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}