// frontend/src/pages/BrandResults.jsx
import { useLocation, useNavigate } from "react-router-dom";

export default function BrandResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const brandingResult = location.state?.brandingResult;

  if (!brandingResult || !brandingResult.strategy) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 px-4 text-center">
        <p>לא נמצאו נתונים. נא ליצור מותג מחדש.</p>
        <button className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-lg" onClick={() => navigate("/create")}>
          חזור ליצירה
        </button>
      </div>
    );
  }

  const { strategy, design_styles } = brandingResult;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 text-right" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* אסטרטגיה */}
        <section className="bg-white p-8 rounded-2xl shadow">
          <h1 className="text-3xl font-bold text-indigo-700 mb-6">אסטרטגיית מותג</h1>
          <div className="space-y-4 text-gray-700">
            <p><span className="font-semibold">סקירה:</span> {strategy.overview}</p>
            <p><span className="font-semibold">הזדמנות בשוק:</span> {strategy.market_gap}</p>
            <p><span className="font-semibold">תובנת קהל:</span> {strategy.target_audience_insight}</p>
          </div>
        </section>

        {/* קונספטים */}
        <section>
          <h2 className="text-3xl font-bold text-indigo-700 mb-8">קונספטים נבחרים</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {design_styles?.map((option) => (
              <div key={option.style_id} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col border border-transparent hover:border-indigo-200">
                <div className="mb-4">
                  <p className="text-sm font-bold text-indigo-500 uppercase">{option.style_name}</p>
                  <h3 className="text-2xl font-black text-gray-900 mt-1">
                    {option.brand_name_hebrew} | {option.brand_name_english}
                  </h3>
                  <p className="italic text-gray-600 mt-2">{option.tagline}</p>
                </div>

                <div className="flex gap-2 mb-6">
                  {option.color_palette?.map((color, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border shadow-sm" style={{ backgroundColor: color }} />
                  ))}
                </div>

                <p className="text-sm text-gray-700 flex-grow leading-relaxed">{option.design_reasoning}</p>

                <button
                  className="mt-8 w-full py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-md"
                  onClick={() => navigate("/selected", { state: { selectedConcept: option } })}
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