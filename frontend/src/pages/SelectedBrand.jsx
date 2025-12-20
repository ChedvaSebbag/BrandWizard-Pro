import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function SelectedBrand() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedConcept = location.state?.selectedConcept;

  const [logo, setLogo] = useState(null); // משתנה אחד ללוגו יחיד
  const [loading, setLoading] = useState(true);
  const hasGenerated = useRef(false);

  useEffect(() => {
    if (!selectedConcept) { navigate("/"); return; }

    const generateSingleLogo = async () => {
      if (hasGenerated.current) return;
      hasGenerated.current = true;

      try {
        setLoading(true);
        
        // שליחת הפרומפט המדויק שה-AI יצר עבור הקונספט הנבחר
        const res = await fetch("http://localhost:5000/api/generate-logo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: selectedConcept.ai_image_prompt })
        });
        
        const data = await res.json();
        setLogo(data.imageUrl);
      } catch (err) {
        console.error("Error generating logo");
      } finally {
        setLoading(false);
      }
    };

    generateSingleLogo();
  }, [selectedConcept, navigate]);

  if (!selectedConcept) return null;

  return (
    <div className="min-h-screen bg-white p-8" dir="rtl">
      <h1 className="text-3xl font-bold text-center mb-10">{selectedConcept.brand_name}</h1>
      
      {loading ? (
        <div className="text-center">
          <p className="animate-pulse text-lg">מעצב את הלוגו המושלם עבורך...</p>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <div className="border p-6 rounded-2xl shadow-lg text-center bg-gray-50">
            <h3 className="font-bold text-xl mb-4">הלוגו הנבחר</h3>
            <div className="aspect-square flex items-center justify-center rounded-lg overflow-hidden border bg-white mb-6">
              {logo ? (
                <img src={`data:image/png;base64,${logo}`} alt="Selected Logo" className="w-full h-full object-contain" />
              ) : (
                "שגיאה בטעינת התמונה"
              )}
            </div>
            <button 
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
              onClick={() => window.print()} // דוגמה לפעולה
            >
              הורד לוגו (PNG)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}