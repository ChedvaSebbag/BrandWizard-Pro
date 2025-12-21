// frontend/src/pages/BrandVoice.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

export default function BrandVoice() {
  const navigate = useNavigate();
  const location = useLocation();

  // We expect to arrive here from SelectedBrand:
  // navigate("/brand-voice", { state: { selectedConcept, brandingResult, logo } })
  const selectedConcept = location.state?.selectedConcept;
  const brandingResult = location.state?.brandingResult; // optional
  const logo = location.state?.logo; // optional (base64 string without prefix)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [voice, setVoice] = useState(null);

  const fallbackPayload = useMemo(() => {
    // Safe defaults if some fields are missing
    return {
      brand_name: selectedConcept?.brand_name || "Your Brand",
      tagline: selectedConcept?.tagline || "",
      style_name: selectedConcept?.style_name || "",
      color_palette: selectedConcept?.color_palette || [],
      strategy: brandingResult?.strategy || null,
    };
  }, [selectedConcept, brandingResult]);

  useEffect(() => {
    // Don't redirect before hooks; just after mount decision
    if (!selectedConcept) {
      navigate("/", { replace: true });
      return;
    }

    // Auto-generate once when the page loads
    generateVoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateVoice = async () => {
    setError("");
    setLoading(true);

    try {
      // ✅ If you already have a backend endpoint, use it:
      // POST http://localhost:5000/api/brand-voice
      // body: { selectedConcept, brandingResult }
      //
      // If you DON'T have it yet — the UI will still work using the mock below.

      const HAS_BACKEND_ENDPOINT = false; // <-- change to true when your endpoint exists

      if (HAS_BACKEND_ENDPOINT) {
        const res = await fetch("http://localhost:5000/api/brand-voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            selectedConcept,
            brandingResult,
          }),
        });

        if (!res.ok) throw new Error("Server error");
        const data = await res.json();

        // Expecting: { result: { primarySlogan, alternatives: [], brandMessage, toneWords: [] } }
        setVoice(data.result);
        return;
      }

      // ✅ Mock (works now, looks great in demo)
      setVoice({
        primarySlogan: "Tradition, beautifully effortless.",
        alternatives: [
          "Premium Shabbat. Zero stress.",
          "Made for moments that matter.",
          "Home taste, elevated.",
        ],
        brandMessage:
          "A premium Shabbat food brand for modern families who value quality, tradition, and peace of mind.",
        toneWords: ["Warm", "Premium", "Modern", "Trustworthy"],
      });
    } catch (e) {
      setError("Something went wrong. Please try generating again.");
    } finally {
      setLoading(false);
    }
  };

  const goNext = () => {
    // Next step route (you’ll build it after this):
    // /landing-preview or /brand-kit etc.
    navigate("/landing-preview", {
      state: {
        selectedConcept,
        brandingResult,
        logo,
        voice,
      },
    });
  };

  if (!selectedConcept) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            ← Back
          </button>

          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">
              Step 2 of 3
            </p>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Define Your Brand Voice
            </h1>
          </div>

          <div className="w-[92px]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Brand Card */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/20 border border-white/10 flex items-center justify-center">
                  <span className="text-lg font-black">BW</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50">
                    Selected concept
                  </p>
                  <h2 className="text-xl font-extrabold">
                    {fallbackPayload.brand_name}
                  </h2>
                  {fallbackPayload.style_name ? (
                    <p className="text-sm text-white/70 mt-1">
                      {fallbackPayload.style_name}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Logo preview if you pass base64 */}
              <div className="mt-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="aspect-square rounded-2xl bg-white flex items-center justify-center overflow-hidden">
                    {logo ? (
                      <img
                        src={`data:image/png;base64,${logo}`}
                        alt="Logo"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-slate-500 text-sm">
                        Logo preview (optional)
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div className="mt-6">
                <p className="text-xs uppercase tracking-widest text-white/50 mb-3">
                  Color palette
                </p>
                <div className="flex flex-wrap gap-2">
                  {(fallbackPayload.color_palette?.length
                    ? fallbackPayload.color_palette
                    : ["#111827", "#6366F1", "#E5E7EB"]
                  ).map((c, i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-2xl border border-white/10 shadow"
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>

              {/* Mini CTA */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm text-white/70">
                  This step builds the words that match your logo —
                  <span className="text-white font-semibold"> slogan + message</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Voice Output */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold">Outputs</h3>
                  <p className="text-sm text-white/60 mt-1">
                    Primary slogan, alternatives, message & tone keywords.
                  </p>
                </div>

                <button
                  onClick={generateVoice}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white text-slate-900 px-4 py-2 text-sm font-bold hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? "Generating…" : "Generate alternatives"}
                </button>
              </div>

              {/* Error */}
              {error ? (
                <div className="mt-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4">
                  <p className="text-sm text-rose-200 font-semibold">{error}</p>
                  <p className="text-xs text-rose-200/70 mt-1">
                    Tip: check backend logs or try again.
                  </p>
                </div>
              ) : null}

              {/* Loading skeleton */}
              {loading && !voice ? (
                <div className="mt-8 space-y-4">
                  <div className="h-10 rounded-2xl bg-white/10 animate-pulse" />
                  <div className="h-28 rounded-2xl bg-white/10 animate-pulse" />
                  <div className="h-20 rounded-2xl bg-white/10 animate-pulse" />
                </div>
              ) : null}

              {/* Content */}
              {!loading && voice ? (
                <div className="mt-8 space-y-8">
                  {/* Primary */}
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
                    <p className="text-xs uppercase tracking-widest text-white/50 mb-2">
                      Primary slogan
                    </p>
                    <h4 className="text-2xl md:text-3xl font-extrabold leading-tight">
                      “{voice.primarySlogan}”
                    </h4>
                  </div>

                  {/* Alternatives */}
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
                    <p className="text-xs uppercase tracking-widest text-white/50 mb-4">
                      Alternatives
                    </p>
                    <ul className="space-y-3">
                      {voice.alternatives?.map((s, i) => (
                        <li
                          key={i}
                          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/90"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Brand message */}
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
                    <p className="text-xs uppercase tracking-widest text-white/50 mb-3">
                      Brand message
                    </p>
                    <p className="text-white/85 leading-relaxed">
                      {voice.brandMessage}
                    </p>
                  </div>

                  {/* Tone keywords */}
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
                    <p className="text-xs uppercase tracking-widest text-white/50 mb-3">
                      Tone keywords
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {voice.toneWords?.map((t, i) => (
                        <span
                          key={i}
                          className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Bottom Actions */}
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={goNext}
                  disabled={!voice || loading}
                  className="w-full rounded-2xl bg-indigo-600 px-6 py-4 font-extrabold text-white shadow-lg hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  I like it — Let’s continue →
                </button>

                <button
                  onClick={() =>
                    navigate("/selected", {
                      state: { selectedConcept, brandingResult },
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-bold text-white hover:bg-white/10 transition"
                >
                  Back to logo
                </button>
              </div>

              {/* Small note */}
              <p className="mt-4 text-xs text-white/40">
                Next step suggestion: Landing Page Preview (hero + CTA + sections).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}