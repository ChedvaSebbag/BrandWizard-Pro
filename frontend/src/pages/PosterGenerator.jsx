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
  const [error, setError] = useState("");
  const [selectedPosterId, setSelectedPosterId] = useState(null);

  const primaryColor = colors?.[0] || "#6366f1";

  const generatePosters = async () => {
    if (!brandingData?.businessName) {
      setError("שגיאה: חסרים נתונים ליצירת פוסטרים");
      return;
    }

    setLoading(true);
    setError("");
    setPosters([]);
    setSelectedPosterId(null);

    try {
      const res = await fetch("http://localhost:5000/api/posters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brandingData),
      });

      if (!res.ok) throw new Error(`שגיאת שרת: ${res.status}`);
      const data = await res.json();

      if (data.posters?.length) {
        setPosters(data.posters);
      } else {
        throw new Error("לא התקבלו פוסטרים מהשרת");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (posterId) => {
    const element = document.getElementById(`poster-card-${posterId}`);
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 2,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${businessName}-Poster-${posterId}.png`;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  if (!brandingData)
    return (
      <div className="text-center py-24 text-xl">
        לא נמצא מידע מיתוגי
      </div>
    );

  return (
    <>
      {/* LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white rounded-[2.5rem] p-14 shadow-2xl text-center max-w-md w-full">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-slate-200 border-t-slate-900 animate-spin" />
            <h2 className="text-2xl font-black mb-2">
              יוצרים את הקמפיין שלך
            </h2>
            <p className="text-slate-600">
              ה-AI מעצב פוסטרים בהתאמה למותג שלך
            </p>
          </div>
        </div>
      )}

      <div
        className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-20 text-right"
        dir="rtl"
      >
        {/* HERO */}
        <div className="max-w-6xl mx-auto text-center mb-20">
          <h1 className="text-5xl font-black mb-6 tracking-tight">
            הקמפיין הפרסומי שלך
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
            בחר את הפוסטר שמייצג אותך בצורה הכי חזקה —  
            משם נבנה דף נחיתה מדויק וממיר
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            {/* CREATE POSTERS */}
            <button
              onClick={generatePosters}
              disabled={loading}
              className={`
                px-10 py-4 rounded-full font-bold shadow-xl transition-all
                ${
                  loading
                    ? "bg-slate-400 text-white cursor-wait"
                    : "text-white hover:scale-105"
                }
              `}
              style={!loading ? { backgroundColor: primaryColor } : {}}
            >
              {loading ? "מעצב קמפיין…" : "צור פוסטרים"}
            </button>

            {/* CONTINUE */}
            <button
              onClick={() => {
                const selected =
                  posters.find((p) => p.id === selectedPosterId) ||
                  posters[0];
                navigate("/landingBuilder", {
                  state: { ...brandingData, selectedPoster: selected },
                });
              }}
              disabled={!posters.length || loading}
              className={`
                px-10 py-4 rounded-full font-bold shadow-xl transition-all
                ${
                  posters.length && !loading
                    ? "bg-emerald-600 text-white hover:scale-105"
                    : "bg-slate-300 text-slate-500 cursor-not-allowed"
                }
              `}
            >
              {loading
                ? "טוען פוסטרים…"
                : posters.length
                ? "המשך לדף הנחיתה"
                : "בחר פוסטר כדי להמשיך"}
            </button>
          </div>

          {error && (
            <p className="text-red-500 mt-6 font-medium">
              {error}
            </p>
          )}
        </div>

        {/* GRID */}
        <div className="max-w-7xl mx-auto grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posters.map((poster) => (
            <div key={poster.id} className="group">
              <div
                id={`poster-card-${poster.id}`}
                onClick={() => setSelectedPosterId(poster.id)}
                className={`
                  relative aspect-[3/4] rounded-[2.5rem] overflow-hidden cursor-pointer
                  transition-all duration-300 shadow-xl bg-white
                  ${
                    selectedPosterId === poster.id
                      ? "ring-8 ring-emerald-500 scale-[1.04]"
                      : "hover:scale-[1.02] hover:shadow-2xl"
                  }
                `}
              >
                <img
                  src={`data:image/png;base64,${poster.imageBase64}`}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70 z-10 flex flex-col justify-between p-10">
                  {/* LOGO */}
                  <div className="flex justify-center">
                    {logo && (
                      <div className="bg-white/90 p-4 rounded-2xl shadow-lg">
                        <img
                          src={`data:image/png;base64,${logo}`}
                          className="w-20 h-20 object-contain"
                        />
                      </div>
                    )}
                  </div>

                  {/* TEXT */}
                  <div className="text-center">
                    <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-3xl">
                      <h3 className="text-3xl font-black text-white mb-2 leading-tight">
                        {tagline}
                      </h3>
                      <p className="text-xs tracking-widest text-white/90 uppercase">
                        {businessName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* DOWNLOAD */}
              <button
                onClick={() => handleDownload(poster.id)}
                className="mt-5 w-full py-4 rounded-full bg-slate-900 text-white font-bold transition-all hover:bg-black"
              >
                הורד פוסטר
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
