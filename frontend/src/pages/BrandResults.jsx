import { useLocation, useNavigate } from "react-router-dom";

export default function BrandResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const brandingResult = location.state?.brandingResult;
  const userInput = location.state?.userInput;

  if (!brandingResult) return <div className="text-center py-20">לא נמצאו נתונים</div>;

  const { strategy, design_styles } = brandingResult;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-14 text-right" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-20">
        <section className="bg-white p-10 rounded-3xl shadow-xl">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-10">אסטרטגיית מותג</h1>
          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p><span className="font-semibold">סקירה:</span> {strategy.overview}</p>
            <p><span className="font-semibold">הזדמנות:</span> {strategy.market_gap}</p>
            <p><span className="font-semibold">קהל יעד:</span> {strategy.target_audience_insight}</p>
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-10">קונספטים נבחרים</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {design_styles?.map((option) => (
              <div key={option.style_id} className="bg-white p-8 rounded-3xl shadow-lg hover:border-indigo-200 border transition-all">
                <p className="text-xs font-bold text-indigo-500 uppercase">{option.style_name}</p>
                <h3 className="text-2xl font-black text-slate-900 mt-2">{option.brand_name_hebrew} | {option.brand_name_english}</h3>
                <p className="italic text-slate-500 mt-3">{option.tagline}</p>
                <div className="flex gap-3 my-6">
                  {option.color_palette?.map((color, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{option.design_reasoning}</p>
                <button
                  className="mt-10 w-full py-4 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                  onClick={() => navigate("/selected", { state: { selectedConcept: option, userInput: userInput } })}
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