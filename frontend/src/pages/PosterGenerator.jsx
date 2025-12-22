import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PosterGenerator() {
  const location = useLocation();
  const navigate = useNavigate();
  const brandingData = location.state;

  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!brandingData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <p className="text-red-600 mb-4">❌ חסרים נתוני מיתוג</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-xl bg-slate-800 text-white"
        >
          חזרה
        </button>
      </div>
    );
  }

  const primaryColor = brandingData.colors?.[1] || "#4f46e5"; // זהב / צבע מוביל
  const darkColor = brandingData.colors?.[0] || "#0f172a";
  const mutedColor = brandingData.colors?.[2] || "#64748b";

  const generatePosters = async () => {
    setLoading(true);
    setError("");
    setPosters([]);

    try {
      const res = await fetch("http://localhost:5000/api/posters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brandingData),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setPosters(data.posters);
    } catch {
      setError("שגיאה ביצירת פוסטרים");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (base64, id) => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${base64}`;
    link.download = `poster-${id}.png`;
    link.click();
  };

  return (
    <div
      className="min-h-screen px-10 py-14"
      style={{ backgroundColor: "#f8fafc" }}
    >
      {/* HEADER */}
      <div className="max-w-7xl mx-auto text-center mb-14">
        <h2
          className="text-4xl font-extrabold mb-4"
          style={{ color: darkColor }}
        >
          🎯 הפוסטרים שלך
        </h2>
        <p className="text-lg" style={{ color: mutedColor }}>
          בחרי את הקמפיין שמרגיש הכי נכון למותג
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={generatePosters}
            disabled={loading}
            className="px-8 py-4 rounded-2xl font-semibold text-white transition-all"
            style={{
              backgroundColor: primaryColor,
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "מייצר פוסטרים..." : "צור פוסטרים"}
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-8 py-4 rounded-2xl font-semibold border"
            style={{ borderColor: mutedColor, color: darkColor }}
          >
            חזרה
          </button>
        </div>

        {error && (
          <p className="mt-6 text-red-600 font-medium">{error}</p>
        )}
      </div>

      {/* GRID */}
      <div
        className="max-w-7xl mx-auto grid gap-10"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {posters.map((poster) => (
          <div
            key={poster.id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1"
          >
            {/* פס צבע עליון */}
            <div
              style={{ backgroundColor: primaryColor }}
              className="h-2 w-full"
            />

            <img
              src={`data:image/png;base64,${poster.imageBase64}`}
              alt={`Poster ${poster.id}`}
              className="w-full object-cover"
            />

            <div className="p-6 flex items-center justify-between">
              <div>
                <p
                  className="text-sm font-semibold uppercase tracking-wide"
                  style={{ color: mutedColor }}
                >
                  קונספט {poster.id}
                </p>
                <p
                  className="text-lg font-bold"
                  style={{ color: darkColor }}
                >
                  Poster {poster.id}
                </p>
              </div>

              <button
                onClick={() =>
                  downloadImage(poster.imageBase64, poster.id)
                }
                className="px-5 py-3 rounded-xl text-white font-medium"
                style={{ backgroundColor: darkColor }}
              >
                הורדה
              </button>
            </div>
          </div>
        ))}
      </div>

      {posters.length > 0 && (
        <p className="mt-14 text-center" style={{ color: mutedColor }}>
          נטענו {posters.length} פוסטרים · ייתכן שפוסטר אחד לא נטען עקב עומס
        </p>
      )}
    </div>
  );
}
