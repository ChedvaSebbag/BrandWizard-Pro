import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function SelectedBrand() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedConcept, userInput } = location.state || {};

  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // שימוש ב-Ref כדי למנוע כפילות ב-Strict Mode
  const hasGenerated = useRef(false);

  useEffect(() => {
    if (!selectedConcept) {
      navigate("/");
    }
  }, [selectedConcept, navigate]);

  const generateLogo = async () => {
    if (!selectedConcept || !userInput || loading) return;

    const brandingData = {
      businessName: selectedConcept.brand_name_english,
      businessDescription: userInput.essence,
      targetAudience: userInput.audience,
      visualStyle: userInput.style,
      tone: userInput.tone,
      essence: selectedConcept.style_name,
      tagline: selectedConcept.tagline,
      extendedStyle: selectedConcept.extended_designer_style,
      colors: selectedConcept.color_palette
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/generate-logo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brandingData),
      });

      if (!res.ok) throw new Error("Failed to fetch logo");

      const data = await res.json();
      setLogo(data.imageUrl);
    } catch (err) {
      console.error("Error generating logo", err);
    } finally {
      setLoading(false);
    }
  };

  // אפקט שרץ פעם אחת בטעינה ומייצר את הלוגו
  useEffect(() => {
    if (selectedConcept && !hasGenerated.current) {
      hasGenerated.current = true; // סימון שכבר התחלנו לייצר
      generateLogo();
    }
  }, [selectedConcept]);

  const handleRetry = () => {
    setLogo(null);
    generateLogo();
  };

  if (!selectedConcept) return null;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-14">{selectedConcept.brand_name_hebrew}</h1>
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        {loading ? (
          <div className="py-20 text-slate-600">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>
            <p className="animate-pulse">מייצר את הלוגו המושלם עבורך...</p>
          </div>
        ) : (
          <>
            <div className="aspect-square rounded-2xl border bg-slate-50 flex items-center justify-center overflow-hidden mb-8 shadow-inner">
              {logo ? (
                <img src={`data:image/png;base64,${logo}`} alt="Logo" className="w-full h-full object-contain p-4" />
              ) : (
                <span className="text-slate-400">התמונה בטעינה...</span>
              )}
            </div>
            <div className="space-y-4">
              <button 
                onClick={() => window.print()} 
                disabled={!logo}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                הורדת לוגו / הדפסה
              </button>
              <button 
                onClick={handleRetry} 
                className="w-full py-3 text-slate-500 rounded-2xl border hover:bg-slate-100 transition-colors"
              >
                יצירה מחדש
              </button>
              <button 
                onClick={() => navigate(-1)} 
                className="w-full py-2 text-indigo-600 font-medium hover:underline"
              >
                חזרה לבחירת סגנון אחר
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}