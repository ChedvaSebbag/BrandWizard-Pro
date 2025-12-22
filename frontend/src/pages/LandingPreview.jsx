import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LandingPreview() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { brandingData, posters } = state || {};

  const { 
    businessName, 
    tagline, 
    businessDescription, 
    logo, 
    colors,
    tone 
  } = brandingData || {};

  // צבעים
  const bgGradientColor = colors?.[0] || "#1e293b";
  const accentColor = colors?.[1] || "#6366f1";
  const textColor = "#ffffff";

  useEffect(() => {
    if (!brandingData) navigate("/");
  }, [brandingData, navigate]);

  if (!brandingData) return null;

  const heroPoster = posters?.[0];

  return (
    <div 
      className="min-h-screen font-sans"
      style={{ 
        background: `linear-gradient(135deg, ${bgGradientColor} 0%, #1a1a1a 100%)`, 
        color: textColor 
      }}
    >
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 px-6 py-4 flex justify-between items-center bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          {logo && (
            <img 
              src={`data:image/png;base64,${logo}`} 
              alt="Logo" 
              className="h-10 w-10 object-contain bg-white/10 rounded-lg p-1" 
            />
          )}
          <span className="text-xl font-bold tracking-tight text-white">
            {businessName}
          </span>
        </div>
        <button className="px-5 py-2 rounded-full font-bold text-sm bg-white text-black hover:bg-gray-200 transition-colors">
          צור קשר
        </button>
      </nav>

      {/* HERO SECTION */}
      <header className="relative px-6 pt-12 pb-24 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* צד ימין: טקסטים */}
        <div className="text-center lg:text-right space-y-6 order-2 lg:order-1">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-white/10 border border-white/20 text-indigo-300">
            {tone || "Premium Quality"}
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
            {businessName}
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-300 font-light leading-relaxed">
            {tagline}
          </p>
          
          <p className="text-sm text-gray-400 max-w-lg ml-auto">
             {businessDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button 
              className="px-8 py-3 rounded-xl text-lg font-bold shadow-xl hover:scale-105 transition-transform text-white"
              style={{ backgroundColor: accentColor }}
            >
              הזמן עכשיו
            </button>
          </div>
        </div>

        {/* צד שמאל: הפוסטר (בנייה מחדש עם שכבות) */}
        <div className="relative group perspective-1000 order-1 lg:order-2 mx-auto w-full max-w-md">
          {heroPoster && (
            <div className="relative aspect-[2/3] rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white/10 transform transition-transform duration-700 hover:rotate-y-6 hover:scale-105 bg-gray-900">
              
              {/* שכבה 1: תמונת הרקע מה-AI */}
              <img 
                src={`data:image/png;base64,${heroPoster.imageBase64}`} 
                alt="Poster Background" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* שכבה 2: כהות כדי שהטקסט יבלוט */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* שכבה 3: הטקסט והלוגו (חובה!) */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-center z-10">
                 {/* לוגו */}
                 {logo && (
                   <div className="mb-6 flex justify-center">
                     <img 
                       src={`data:image/png;base64,${logo}`} 
                       className="w-24 h-24 object-contain drop-shadow-2xl filter brightness-110" 
                       alt="logo" 
                     />
                   </div>
                 )}
                 
                 {/* סלוגן */}
                 <h3 className="text-2xl font-black text-white uppercase tracking-wider drop-shadow-lg mb-2">
                   {tagline}
                 </h3>
                 
                 {/* פס הפרדה קטן בצבע המותג */}
                 <div 
                   className="w-12 h-1 mx-auto rounded-full mb-4 opacity-80"
                   style={{ backgroundColor: accentColor }}
                 />

                 {/* שם העסק בקטן */}
                 <p className="text-xs font-bold text-gray-300 tracking-[0.3em] uppercase">
                   {businessName}
                 </p>
              </div>
            </div>
          )}
          
          {/* אפקט זוהר אחורי */}
          <div 
            className="absolute -inset-4 rounded-[3rem] -z-10 blur-3xl opacity-30 animate-pulse"
            style={{ backgroundColor: accentColor }}
          />
        </div>

      </header>
      
      {/* כפתור עריכה */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed bottom-6 left-6 p-4 bg-white text-black rounded-full shadow-2xl hover:scale-110 transition-transform z-50 border-2 border-gray-100"
        title="חזור לעריכה"
      >
        ✏️
      </button>

    </div>
  );
}