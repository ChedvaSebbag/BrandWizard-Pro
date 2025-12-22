import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BrandOptions() {
  const location = useLocation();
  const navigate = useNavigate();

  // 👈 השם שהגיע מה-Home
  const businessName = location.state?.businessName || "";

  const [formData, setFormData] = useState({
    essence: "",
    audience: "",
    style: "",
    tone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/branding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        // ✅ שולחים גם את שם העסק
        body: JSON.stringify({
          businessName,
          ...formData,
        }),
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();

      navigate("/results", {
        state: {
          brandingResult: data.result,
          userInput: {
            businessName,
            ...formData,
          },
        },
      });
    } catch (error) {
      alert("המערכת עמוסה כרגע, נסי שוב בעוד רגע");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-start justify-center py-20 px-4 text-white">
      <div className="w-full max-w-3xl bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-10 text-gray-900">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-indigo-700 mb-3">
            Create Your Brand
          </h1>

          {/* ✨ הצגת שם העסק */}
          {businessName && (
            <p className="text-gray-500 text-lg">
              Brand name: <span className="font-semibold">{businessName}</span>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block font-semibold mb-2">מהות העסק</label>
            <textarea
              name="essence"
              rows={3}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">קהל יעד</label>
            <textarea
              name="audience"
              rows={3}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-2">סגנון ויזואלי</label>
              <input
                name="style"
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-gray-300"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">טון דיבור</label>
              <input
                name="tone"
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-gray-300"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-6 rounded-2xl font-bold text-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "מייצר מיתוג..." : "Generate Branding →"}
          </button>
        </form>
      </div>
    </div>
  );
}
