import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function SelectedBrand() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedConcept = location.state?.selectedConcept;

  const [logos, setLogos] = useState({ hebrew: null, english: null, symbol: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasGenerated = useRef(false);

  useEffect(() => {
    if (!selectedConcept) { navigate("/"); return; }

    const generateLogos = async () => {
      if (hasGenerated.current) return;
      hasGenerated.current = true;

      try {
        setLoading(true);
        const colorString = selectedConcept.color_palette.join(" and ");

        const tasks = [
          { 
            key: 'hebrew', 
            text: `The logo MUST prominently feature the Hebrew name "${selectedConcept.brand_name_hebrew}" in bold, high-end Hebrew block letters. Perfectly legible and centered.` 
          },
          { 
            key: 'english', 
            text: `The logo MUST prominently feature the English name "${selectedConcept.brand_name_english}" in modern premium typography.` 
          },
          { 
            key: 'symbol', 
            text: `A standalone iconic symbol version, strictly no text. Professional brand hallmark quality.` 
          }
        ];

        const results = {};
        
        for (const task of tasks) {
          const finalPrompt = selectedConcept.ai_image_prompt_base
            .replace("[TEXT_INSTRUCTION]", task.text)
            .replace("[COLORS]", colorString);

          const res = await fetch("http://localhost:5000/api/generate-logo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: finalPrompt })
          });
          
          if (!res.ok) throw new Error(`Failed to generate ${task.key}`);
          
          const data = await res.json();
          results[task.key] = data.imageUrl;
        }

        setLogos(results);
      } catch (err) {
        console.error("Generation error:", err);
        setError("חלק מהלוגואים לא נוצרו בהצלחה. נסה לרענן את הדף.");
      } finally {
        setLoading(false);
      }
    };

    generateLogos();
  }, [selectedConcept, navigate]);

  if (!selectedConcept) return null;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 text-right" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900">{selectedConcept.brand_name_hebrew}</h1>
          <p className="text-xl text-indigo-600 italic mt-2">{selectedConcept.tagline}</p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-500 text-lg">מעצב עבורך 3 גרסאות לוגו מושלמות...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="bg-indigo-600 text-white px-6 py-2 rounded-lg">נסה שוב</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <LogoCard title="גרסה בעברית" img={logos.hebrew} />
            <LogoCard title="גרסה באנגלית" img={logos.english} />
            <LogoCard title="סמל (Icon) בלבד" img={logos.symbol} />
          </div>
        )}

        <div className="mt-12 bg-white p-8 rounded-2xl shadow-sm border border-indigo-100">
          <h3 className="text-xl font-bold mb-4 text-indigo-800">אסטרטגיית המותג:</h3>
          <p className="text-gray-700 leading-relaxed italic">{selectedConcept.design_reasoning}</p>
        </div>
      </div>
    </div>
  );
}

function LogoCard({ title, img }) {
  const download = () => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${img}`;
    link.download = `${title}.png`;
    link.click();
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-md border hover:shadow-xl transition-all flex flex-col items-center">
      <h3 className="font-bold text-gray-700 mb-4">{title}</h3>
      <div className="bg-gray-100 rounded-2xl p-4 w-full aspect-square flex items-center justify-center mb-6 overflow-hidden">
        {img ? (
          <img src={`data:image/png;base64,${img}`} alt={title} className="max-h-full rounded-lg shadow-sm" />
        ) : (
          <div className="text-gray-400 animate-pulse">מייצר...</div>
        )}
      </div>
      <button 
        disabled={!img}
        onClick={download} 
        className={`w-full py-3 rounded-xl font-bold transition ${img ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        הורד לוגו זה
      </button>
    </div>
  );
}