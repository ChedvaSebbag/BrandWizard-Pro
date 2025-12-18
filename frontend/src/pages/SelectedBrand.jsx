import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SelectedBrand() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedConcept = location.state?.selectedConcept;

  const [logoBase64, setLogoBase64] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedConcept) {
      navigate("/");
      return;
    }

    const generateLogo = async () => {
      try {
        setLoading(true);
        // שימוש ב-fetch המובנה במקום ב-axios
        const response = await fetch("http://localhost:5000/api/generate-logo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: selectedConcept.ai_image_prompt,
          }),
        });

        if (!response.ok) {
          throw new Error("נכשלנו בקבלת תגובה מהשרת");
        }

        const data = await response.json();
        
        // עדכון ה-state עם ה-Base64 שחזר מהשרת
        setLogoBase64(data.imageUrl);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("שגיאה ביצירת הלוגו. ודאי שהשרת (Backend) פועל.");
      } finally {
        setLoading(false);
      }
    };

    generateLogo();
  }, [selectedConcept, navigate]);

  if (!selectedConcept) return null;

  return (
    <div className="min-h-screen bg-white px-6 py-12 text-right" dir="rtl">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{selectedConcept.brand_name}</h1>
        <p className="text-xl text-indigo-600 italic mb-12">{selectedConcept.tagline}</p>

        <div className="bg-gray-50 rounded-3xl p-12 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center min-h-[450px]">
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-500">BrandWizard מעצב עבורך לוגו ברזולוציית דפוס...</p>
            </div>
          ) : error ? (
            <p className="text-red-500 font-bold">{error}</p>
          ) : (
            <div className="space-y-8">
              <img 
                src={`data:image/png;base64,${logoBase64}`} 
                alt="Brand Logo" 
                className="max-w-md rounded-xl shadow-2xl mx-auto bg-white border p-4"
              />
              <button 
                className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition"
                onClick={() => window.print()}
              >
                הורד ערכת מותג (PDF)
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 text-right bg-gray-50 p-8 rounded-2xl border">
          <h3 className="text-xl font-bold mb-4">סיכום קריאייטיבי:</h3>
          <p className="text-gray-700 leading-relaxed italic">{selectedConcept.design_reasoning}</p>
        </div>
      </div>
    </div>
  );
}