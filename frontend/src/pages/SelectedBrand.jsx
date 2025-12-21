import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SelectedBrand() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedConcept = location.state?.selectedConcept;

  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Redirect safely INSIDE useEffect
  useEffect(() => {
    if (!selectedConcept) {
      navigate("/");
    }
  }, [selectedConcept, navigate]);

  const generateLogo = async () => {
    if (!selectedConcept) return;

    try {
      setLoading(true);
      setLogo(null);

      const res = await fetch("http://localhost:5000/api/generate-logo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: selectedConcept.ai_image_prompt,
        }),
      });

      const data = await res.json();
      setLogo(data.imageUrl);
    } catch (err) {
      console.error("Error generating logo", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Initial logo generation
  useEffect(() => {
    if (selectedConcept) {
      generateLogo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ⛔ render guard ONLY after hooks
  if (!selectedConcept) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-12">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <p className="text-sm uppercase tracking-widest text-slate-400 mb-3">
          Selected Concept
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          {selectedConcept.brand_name}
        </h1>
      </div>

      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          {loading ? (
            <div className="py-20">
              <p className="text-lg text-slate-600 animate-pulse">
                Crafting your perfect logo…
              </p>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-slate-800 mb-6">
                Your logo is ready
              </h3>

              <div className="aspect-square rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden mb-8">
                {logo ? (
                  <img
                    src={`data:image/png;base64,${logo}`}
                    alt="Generated Logo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-slate-400">
                    Failed to load image
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <button
                  onClick={() =>
                    navigate("/brand-voice", {
                      state: { selectedConcept,  logo },
                    })
                  }
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 transition"
                >
                  I love it — continue →
                </button>

                <button
                  onClick={() => window.print()}
                  className="w-full py-3 bg-white text-indigo-600 rounded-2xl font-semibold border hover:bg-indigo-50 transition"
                >
                  Download logo (PNG)
                </button>

                <button
                  onClick={generateLogo}
                  className="w-full py-3 text-slate-500 rounded-2xl border hover:bg-slate-50 transition"
                >
                  I don’t like it — generate again
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}