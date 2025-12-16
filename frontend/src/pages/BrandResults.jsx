import { useLocation, useNavigate } from "react-router-dom";

export default function BrandResults() {
  const location = useLocation();
  const navigate = useNavigate();

  const brandingResult = location.state?.brandingResult;

  // הגנה אם נכנסו לדף בלי נתונים
  if (!brandingResult) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        No branding data found. Please generate a brand first.
      </div>
    );
  }

  const { step1_strategy, step2_options } = brandingResult;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* ===================== */}
        {/* STRATEGY SECTION */}
        {/* ===================== */}
        <section className="bg-white p-8 rounded-2xl shadow">
          <h1 className="text-3xl font-bold text-indigo-700 mb-6">
            Brand Strategy
          </h1>

          <div className="space-y-4 text-gray-700">
            <p>
              <span className="font-semibold">Market Insight:</span><br />
              {step1_strategy.market_insight}
            </p>

            <p>
              <span className="font-semibold">Brand Archetype:</span>{" "}
              {step1_strategy.brand_archetype}
            </p>

            <p>
              <span className="font-semibold">Target Audience:</span><br />
              {step1_strategy.target_audience_summary}
            </p>
          </div>
        </section>

        {/* ===================== */}
        {/* BRAND CONCEPTS */}
        {/* ===================== */}
        <section>
          <h2 className="text-3xl font-bold text-indigo-700 mb-8">
            Brand Concepts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {step2_options.map((option, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col"
              >
                {/* Concept Header */}
                <div className="mb-4">
                  <p className="text-sm uppercase tracking-wide text-gray-500">
                    {option.concept_name}
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900">
                    {option.suggested_business_name}
                  </h3>

                  <p className="italic text-gray-600 mt-1">
                    {option.slogan}
                  </p>
                </div>

                {/* Colors */}
                <div className="flex gap-2 mb-4">
                  {option.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>

                {/* Reasoning */}
                <p className="text-sm text-gray-700 flex-grow">
                  {option.reasoning}
                </p>

                {/* Visual Vibe */}
                <p className="text-xs text-gray-500 mt-3">
                  <span className="font-semibold">Visual Direction:</span>{" "}
                  {option.visual_vibe}
                </p>

                {/* Select Button */}
                <button
                  className="mt-6 w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                  onClick={() =>
                    navigate("/selected", {
                      state: { selectedConcept: option }
                    })
                  }
                >
                  Select This Concept
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
