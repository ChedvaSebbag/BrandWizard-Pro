import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BrandOptions() {
  const [formData, setFormData] = useState({
    essence: "",
    audience: "",
    style: "",
    tone: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      navigate("/results", { state: { brandingResult: data.result } });
    } catch (error) {
      alert("המערכת עמוסה כרגע, נסי שוב בעוד רגע");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-start justify-center py-20 px-4 text-white">
      <div className="w-full max-w-3xl bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-10 text-gray-900">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tight text-indigo-700 mb-3">
            Create Your Brand
          </h1>
          <p className="text-gray-600 text-lg">
            הגדירי את ה־DNA של המותג שלך — אנחנו נדאג לכל השאר
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Essence */}
          <div>
            <label className="block font-semibold mb-2">מהות העסק</label>
            <textarea
              name="essence"
              rows={3}
              onChange={handleChange}
              placeholder="מה העסק שלך עושה, ומה מייחד אותו?"
              className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Audience */}
          <div>
            <label className="block font-semibold mb-2">קהל יעד</label>
            <textarea
              name="audience"
              rows={3}
              onChange={handleChange}
              placeholder="למי המותג פונה?"
              className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Style + Tone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-2">סגנון ויזואלי</label>
              <input
                name="style"
                onChange={handleChange}
                placeholder="לדוגמה: יוקרתי, מינימליסטי, צעיר"
                className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">טון דיבור</label>
              <input
                name="tone"
                onChange={handleChange}
                placeholder="רשמי, חמים, נועז, רגוע..."
                className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* CTA */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-4 mt-6
              rounded-2xl
              font-bold text-lg
              text-white
              bg-indigo-600
              hover:bg-indigo-700
              transition-all
              shadow-lg
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {loading ? "מייצר מיתוג..." : "Generate Branding →"}
          </button>
        </form>
      </div>
    </div>
  );
}