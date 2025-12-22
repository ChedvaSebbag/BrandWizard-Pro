import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [businessName, setBusinessName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (!businessName.trim()) return;

    navigate("/create", {
      state: { businessName }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="max-w-3xl text-center px-6">

        <span className="inline-block mb-6 px-4 py-1 text-sm uppercase rounded-full bg-white/5 text-slate-300 border border-white/10">
          AI Brand Strategy Studio
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold mb-8">
          Brand<span className="text-indigo-400">Wizard</span>
        </h1>

        <p className="text-lg text-slate-300 mb-10">
          Build a complete brand identity in minutes.
        </p>

        {/* ✨ חדש – שם עסק */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="text"
            placeholder="Business name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="px-5 py-4 rounded-xl text-slate-900 w-64"
          />

          <button
            onClick={handleStart}
            className="px-8 py-4 bg-indigo-600 rounded-xl font-semibold hover:bg-indigo-500 transition"
          >
            Start Creating →
          </button>
        </div>

        <p className="mt-10 text-sm text-slate-400">
          No templates. No guesswork. Just smart branding.
        </p>
      </div>
    </div>
  );
}

export default Home;
