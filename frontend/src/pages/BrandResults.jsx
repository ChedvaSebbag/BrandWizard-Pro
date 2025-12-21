// frontend/src/pages/BrandResults.jsx
import { useLocation, useNavigate } from "react-router-dom";

export default function BrandResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const brandingResult = location.state?.brandingResult;

  if (!brandingResult || !brandingResult.strategy) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-600 px-6 text-center bg-slate-50">
        <p className="text-lg mb-6">
          לא נמצאו נתונים. נא ליצור מותג מחדש.
        </p>
        <button
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold shadow hover:bg-indigo-700 transition"
          onClick={() => navigate("/create")}
        >
          חזרה ליצירה
        </button>
      </div>
    );
  }

  const { strategy, design_styles } = brandingResult;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-14 text-right"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto space-y-20">

        {/* אסטרטגיה */}
        <section className="bg-white p-10 rounded-3xl shadow-xl">
          <p className="text-sm uppercase tracking-widest text-indigo-400 mb-3">
            תשתית אסטרטגית
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-10">
            אסטרטגיית מותג
          </h1>

          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p>
              <span className="font-semibold text-slate-900">סקירה:</span>{" "}
              {strategy.overview}
            </p>
            <p>
              <span className="font-semibold text-slate-900">
                הזדמנות בשוק:
              </span>{" "}
              {strategy.market_gap}
            </p>
            <p>
              <span className="font-semibold text-slate-900">תובנת קהל:</span>{" "}
              {strategy.target_audience_insight}
            </p>
          </div>
        </section>

        {/* קונספטים */}
        <section>
          <div className="mb-10">
            <p className="text-sm uppercase tracking-widest text-indigo-400 mb-3">
              שלב הבחירה
            </p>
            <h2 className="text-4xl font-extrabold text-slate-900">
              קונספטים נבחרים
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {design_styles?.map((option) => (
              <div
                key={option.style_id}
                className="
                  bg-white
                  p-8
                  rounded-3xl
                  shadow-lg
                  hover:shadow-2xl
                  transition-all
                  flex flex-col
                  border border-transparent
                  hover:border-indigo-200
                "
              >
                {/* Header */}
                <div className="mb-6">
                  <p className="text-xs font-bold text-indigo-500 uppercase tracking-wide">
                    {option.style_name}
                  </p>
                  <h3 className="text-2xl font-black text-slate-900 mt-2 leading-tight">
                    {option.brand_name_hebrew} | {option.brand_name_english}
                  </h3>
                  <p className="italic text-slate-500 mt-3">
                    {option.tagline}
                  </p>
                </div>

                {/* צבעים */}
                <div className="flex gap-3 mb-8">
                  {option.color_palette?.map((color, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                {/* הסבר */}
                <p className="text-sm text-slate-700 flex-grow leading-relaxed">
                  {option.design_reasoning}
                </p>

                {/* CTA */}
                <button
                  className="
                    mt-10
                    w-full
                    py-4
                    rounded-2xl
                    bg-indigo-600
                    text-white
                    font-semibold
                    hover:bg-indigo-700
                    hover:scale-[1.02]
                    transition-all
                    shadow-md
                  "
                  onClick={() =>
                    navigate("/selected", {
                      state: { selectedConcept: option },
                    })
                  }
                >
                  בחר סגנון זה וצור לוגו
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}