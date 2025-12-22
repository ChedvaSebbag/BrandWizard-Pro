import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LandingPreview() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { brandingData, selectedPoster } = state || {};

  const { businessName, tagline, logo, colors } = brandingData || {};

  const primaryColor = colors?.[0] || "#1e293b";
  const accentColor = colors?.[1] || "#6366f1";

  useEffect(() => {
    if (!brandingData) navigate("/");
  }, [brandingData, navigate]);

  if (!brandingData) return null;

  return (
    <div className="min-h-screen font-sans text-right" dir="rtl" 
         style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #0f172a 100%)`, color: "#ffffff" }}>
      
      {/* Navbar עם לוגו מוגן */}
      <nav className="max-w-7xl mx-auto p-8 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter">{businessName}</div>
        <div className="bg-white p-2 rounded-xl shadow-xl">
           {logo && <img src={`data:image/png;base64,${logo}`} className="h-12 w-auto object-contain" alt="logo" />}
        </div>
      </nav>

      <header className="px-6 py-12 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight">
            {businessName}
          </h1>
          <p className="text-xl lg:text-2xl text-slate-300 font-light leading-relaxed border-r-4 border-indigo-500 pr-6">
            {tagline}
          </p>
          <button 
            className="px-10 py-4 rounded-2xl text-xl font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
            style={{ backgroundColor: accentColor }}>
            צרו קשר עכשיו
          </button>
        </div>

        <div className="relative">
          {selectedPoster && (
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10">
              <img 
                src={`data:image/png;base64,${selectedPoster.imageBase64}`} 
                alt="Branding Poster" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-10 left-0 right-0 p-8 text-center">
                <h3 className="text-3xl font-bold text-white drop-shadow-lg">{tagline}</h3>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}