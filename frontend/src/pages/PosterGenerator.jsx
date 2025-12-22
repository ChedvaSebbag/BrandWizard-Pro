import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import html2canvas from "html2canvas";

export default function PosterGenerator() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // קליטת הנתונים מהדף הקודם
  const brandingData = location.state;
  const { logo, tagline, businessName, colors } = brandingData || {};

  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const [error, setError] = useState("");

  const primaryColor = colors?.[1] || "#ffffff";

  const generatePosters = async () => {
    // 1. בדיקת תקינות לפני שליחה לשרת
    if (!brandingData) {
      setError("שגיאה: לא התקבלו נתונים מדף הלוגו");
      return;
    }
    if (!brandingData.businessName) {
      setError("שגיאה: חסר שם העסק (Business Name)");
      return;
    }

    setLoading(true);
    setError("");
    setPosters([]);

    try {
      console.log("🚀 שולח לשרת את הנתונים:", brandingData);

      const res = await fetch("http://localhost:5000/api/posters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brandingData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({})); 
        throw new Error(errorData.message || `שגיאת שרת: ${res.status}`);
      }

      const data = await res.json();
      setPosters(data.posters);
    } catch (err) {
      console.error("Client Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (posterId) => {
    setDownloadingId(posterId);
    const element = document.getElementById(`poster-card-${posterId}`);
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `${businessName}-Poster-${posterId}.png`;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
      alert("ההורדה נכשלה");
    } finally {
      setDownloadingId(null);
    }
  };

  if (!brandingData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <p className="text-xl text-red-500">❌ לא התקבלו נתונים</p>
        <button onClick={() => navigate("/")} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">חזרה להתחלה</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-14 bg-slate-50">
      <div className="max-w-7xl mx-auto text-center mb-10">
         <h2 className="text-4xl font-bold mb-4 text-slate-800">הפוסטרים שלך</h2>
         
         <div className="flex justify-center gap-4 flex-wrap">
            <button 
              onClick={generatePosters} 
              disabled={loading}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium shadow-lg disabled:opacity-50"
            >
              {loading ? "מעצב פוסטרים..." : "צור פוסטרים חדשים"}
            </button>
            
            <button
              onClick={() => navigate("/landing-preview", { state: { brandingData, posters } })}
              disabled={posters.length === 0}
              className={`px-8 py-3 rounded-xl font-medium shadow-lg transition-all ${posters.length === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 text-white"}`}
            >
              {posters.length === 0 ? "🔒 קודם צור פוסטרים" : "✨ עבור לדף הנחיתה"}
            </button>

             <button onClick={() => navigate(-1)} className="px-8 py-3 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl font-medium">
               חזרה
             </button>
         </div>

         {error && (
           <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl inline-block font-bold">
             {error}
           </div>
         )}
      </div>

      <div className="max-w-7xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posters.map((poster) => (
          <div key={poster.id} className="flex flex-col gap-4 group">
            <div id={`poster-card-${poster.id}`} className="relative bg-white shadow-2xl overflow-hidden aspect-[2/3] w-full select-none">
              <img src={`data:image/png;base64,${poster.imageBase64}`} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col justify-between p-8 text-center z-10">
                <div className="flex justify-center pt-6">
                  {logo && <img src={`data:image/png;base64,${logo}`} alt="Logo" className="w-28 h-28 object-contain drop-shadow-2xl" />}
                </div>
                <div className="mb-8 space-y-3">
                  <h3 className="text-3xl font-black text-white uppercase drop-shadow-lg">{tagline}</h3>
                  <div className="w-16 h-1 mx-auto rounded-full my-4" style={{ backgroundColor: primaryColor }} />
                  <p className="text-sm font-bold text-slate-100 tracking-widest uppercase">{businessName}</p>
                </div>
              </div>
            </div>
            <button onClick={() => handleDownload(poster.id)} disabled={downloadingId === poster.id} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md">
              {downloadingId === poster.id ? "מעבד תמונה..." : "הורד כתמונה"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}