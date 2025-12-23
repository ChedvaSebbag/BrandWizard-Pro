import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import html2canvas from "html2canvas";

export default function PosterGenerator() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const brandingData = location.state;
  const { logo, tagline, businessName, colors } = brandingData || {};

  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const [error, setError] = useState("");
  const [selectedPosterId, setSelectedPosterId] = useState(null);

  const primaryColor = colors?.[1] || "#ffffff";

  const generatePosters = async () => {
    if (!brandingData || !brandingData.businessName) {
      setError("שגיאה: חסרים נתונים ליצירת פוסטרים");
      return;
    }

    setLoading(true);
    setError("");
    setPosters([]);
    setSelectedPosterId(null);

    try {
      const res = await fetch("h    שבttp://localhost:5000/api/posters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brandingData),
      });

      if (!res.ok) throw new Error(`שגיאת שרת: ${res.status}`);

      const data = await res.json();
      setPosters(data.posters);
    } catch (err) {
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
    } finally {
      setDownloadingId(null);
    }
  };

  if (!brandingData) return null;

  return (
    <div className="min-h-screen px-4 py-14 bg-slate-50 text-right" dir="rtl">
      <div className="max-w-7xl mx-auto text-center mb-10">
         <h2 className="text-4xl font-bold mb-4 text-slate-800">הפוסטרים שלך</h2>
         <div className="flex justify-center gap-4 flex-wrap">
            <button onClick={generatePosters} disabled={loading} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-lg disabled:opacity-50">
              {loading ? "מעצב..." : "צור פוסטרים חדשים"}
            </button>
            <button
              onClick={() => {
                const selected = posters.find(p => p.id === selectedPosterId) || posters[0];
                navigate("/landingBuilder", { state: { brandingData, selectedPoster: selected } });
              }}
              disabled={posters.length === 0}
              className={`px-8 py-3 rounded-xl font-medium shadow-lg transition-all ${posters.length === 0 ? "bg-gray-300" : "bg-emerald-600 text-white"}`}
            >
              המשך לדף הנחיתה ✨
            </button>
         </div>
      </div>

      <div className="max-w-7xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posters.map((poster) => (
          <div key={poster.id} className="flex flex-col gap-4">
            <div 
              id={`poster-card-${poster.id}`} 
              onClick={() => setSelectedPosterId(poster.id)}
              className={`relative bg-white shadow-2xl overflow-hidden aspect-[2/3] w-full cursor-pointer rounded-2xl transition-all ${selectedPosterId === poster.id ? 'ring-8 ring-emerald-500 scale-[1.02]' : ''}`}
            >
              <img src={`data:image/png;base64,${poster.imageBase64}`} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              
              <div className="absolute inset-0 flex flex-col justify-between p-8 text-center z-10">
                <div className="flex justify-center pt-6">
                  {logo && (
                    <img 
                      src={`data:image/png;base64,${logo}`} 
                      alt="Logo" 
                      className="w-28 h-28 object-contain drop-shadow-2xl mix-blend-multiply" /* התיקון כאן */
                    />
                  )}
                </div>
                <div className="mb-8 space-y-3">
                  <h3 className="text-3xl font-black text-white uppercase drop-shadow-lg">{tagline}</h3>
                  <div className="w-16 h-1 mx-auto rounded-full my-4" style={{ backgroundColor: primaryColor }} />
                  <p className="text-sm font-bold text-slate-100 tracking-widest uppercase">{businessName}</p>
                </div>
              </div>
            </div>
            <button onClick={() => handleDownload(poster.id)} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold">הורד תמונה</button>
          </div>
        ))}
      </div>
    </div>
  );
}