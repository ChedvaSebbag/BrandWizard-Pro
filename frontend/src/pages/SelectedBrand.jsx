// // // import { useLocation, useNavigate } from "react-router-dom";
// // // import { useState, useEffect, useRef } from "react";

// // // export default function SelectedBrand() {
// // //   const location = useLocation();
// // //   const navigate = useNavigate();
// // //   const { selectedConcept, userInput } = location.state || {};

// // //   const [logo, setLogo] = useState(null);
// // //   const [loading, setLoading] = useState(false);
  
// // //   const hasGenerated = useRef(false);

// // //   useEffect(() => {
// // //     if (!selectedConcept) {
// // //       navigate("/");
// // //     }
// // //   }, [selectedConcept, navigate]);

// // //   const generateLogo = async () => {
// // //     if (!selectedConcept || !userInput || loading) return;

// // //     // בניית האובייקט ליצירת הלוגו
// // //     const brandingData = {
// // //       businessName: selectedConcept.brand_name_english,
// // //       businessDescription: userInput.essence,
// // //       targetAudience: userInput.audience,
// // //       visualStyle: userInput.style,
// // //       tone: userInput.tone,
// // //       essence: selectedConcept.style_name,
// // //       tagline: selectedConcept.tagline,
// // //       extendedStyle: selectedConcept.extended_designer_style,
// // //       colors: selectedConcept.color_palette
// // //     };

// // //     try {
// // //       setLoading(true);
// // //       const res = await fetch("http://localhost:500/api/generate-logo", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(brandingData),
// // //       });

// // //       if (!res.ok) throw new Error("Failed to fetch logo");

// // //       const data = await res.json();
// // //       setLogo(data.imageUrl);
// // //     } catch (err) {
// // //       console.error("Error generating logo", err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (selectedConcept && !hasGenerated.current) {
// // //       hasGenerated.current = true;
// // //       generateLogo();
// // //     }
// // //   }, [selectedConcept]);

// // //   const handleRetry = () => {
// // //     setLogo(null);
// // //     generateLogo();
// // //   };

// // //   if (!selectedConcept) return null;

// // //   return (
// // //     <div className="min-h-screen bg-slate-50 px-6 py-12 flex flex-col items-center text-right" dir="rtl">
// // //       <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{selectedConcept.brand_name_hebrew}</h1>
// // //       <h2 className="text-xl text-slate-500 mb-14 font-mono">{selectedConcept.brand_name_english}</h2>
      
// // //       <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
// // //         {loading ? (
// // //           <div className="py-20 text-slate-600">
// // //             <div className="animate-spin inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>
// // //             <p className="animate-pulse">מייצר את הלוגו המושלם עבורך...</p>
// // //           </div>
// // //         ) : (
// // //           <>
// // //             <div className="aspect-square rounded-2xl border bg-slate-50 flex items-center justify-center overflow-hidden mb-8 shadow-inner relative">
// // //               {logo ? (
// // //                 <img src={`data:image/png;base64,${logo}`} alt="Logo" className="w-full h-full object-contain p-8" />
// // //               ) : (
// // //                 <span className="text-slate-400">התמונה בטעינה...</span>
// // //               )}
// // //             </div>

// // //             <div className="space-y-4">
// // //               {/* 👇 התיקון הקריטי: הכפתור הזה אורז את המידע בצורה שהשרת יבין */}
// // //               <button
// // //                 onClick={() =>
// // //                   navigate("/posters", {
// // //                     state: {
// // //                       // שדות חובה שהשרת דורש (לפי הודעת השגיאה שקיבלת)
// // //                       businessName: selectedConcept.brand_name_english,
// // //                       essence: userInput.essence, // התיאור שכתבת בהתחלה
// // //                       visualStyle: userInput.style, // הסגנון שבחרת
// // //                       extendedStyle: selectedConcept.extended_designer_style, // הנחיות עיצוב ל-AI
// // //                       colors: selectedConcept.color_palette, // הצבעים
                      
// // //                       // שדות לתצוגה בדף הבא
// // //                       tagline: selectedConcept.tagline,
// // //                       logo: logo
// // //                     }
// // //                   })
// // //                 }
// // //                 disabled={!logo}
// // //                 className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-semibold hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-lg"
// // //               >
// // //                 אהבתי, בוא נמשיך לפוסטרים ✨
// // //               </button>

// // //               <button 
// // //                 onClick={() => window.print()} 
// // //                 disabled={!logo}
// // //                 className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
// // //               >
// // //                 הורדת לוגו / הדפסה
// // //               </button>

// // //               <div className="flex gap-2">
// // //                   <button onClick={handleRetry} className="flex-1 py-3 text-slate-500 rounded-2xl border hover:bg-slate-100 transition-colors">
// // //                     נסה לוגו אחר
// // //                   </button>
// // //                   <button onClick={() => navigate(-1)} className="flex-1 py-3 text-indigo-600 font-medium hover:bg-indigo-50 rounded-2xl transition-colors">
// // //                     חזרה לאפשרויות
// // //                   </button>
// // //               </div>
// // //             </div>
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import { useLocation, useNavigate } from "react-router-dom";
// // import { useState, useEffect, useRef, useCallback } from "react"; // הוסיפי useCallback

// // export default function SelectedBrand() {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { selectedConcept, userInput } = location.state || {};

// //   const [logo, setLogo] = useState(null);
// //   const [loading, setLoading] = useState(false);
  
// //   const hasGenerated = useRef(false);

// //   useEffect(() => {
// //     if (!selectedConcept) {
// //       navigate("/");
// //     }
// //   }, [selectedConcept, navigate]);

// //   // עטיפת הפונקציה ב-useCallback כדי לשמור על יציבותה
// //   const generateLogo = useCallback(async () => {
// //     if (!selectedConcept || !userInput || loading) return;

// //     const brandingData = {
// //       businessName: selectedConcept.brand_name_english,
// //       businessDescription: userInput.essence,
// //       targetAudience: userInput.audience,
// //       visualStyle: userInput.style,
// //       tone: userInput.tone,
// //       essence: selectedConcept.style_name,
// //       tagline: selectedConcept.tagline,
// //       extendedStyle: selectedConcept.extended_designer_style,
// //       colors: selectedConcept.color_palette
// //     };

// //     try {
// //       setLoading(true);
// //       const res = await fetch("http://localhost:5000/api/generate-logo", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(brandingData),
// //       });

// //       if (!res.ok) throw new Error("Failed to fetch logo");

// //       const data = await res.json();
// //       setLogo(data.imageUrl);
// //     } catch (err) {
// //       console.error("Error generating logo", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //     // הוספת התלויות הרלוונטיות כאן
// //   }, [selectedConcept, userInput, loading]);

// //   useEffect(() => {
// //     if (selectedConcept && !hasGenerated.current) {
// //       hasGenerated.current = true;
// //       generateLogo();
// //     }
// //     // כעת ESLint יהיה מרוצה כי generateLogo נמצא כאן
// //   }, [selectedConcept, generateLogo]);

// //   const handleRetry = () => {
// //     setLogo(null);
// //     hasGenerated.current = false; // איפוס ה-Ref כדי לאפשר יצירה מחדש
// //     generateLogo();
// //   };

// //   const handleDownload = () => {
// //     if (!logo) return;
// //     const link = document.createElement("a");
// //     link.href = `data:image/png;base64,${logo}`;
// //     link.download = `${selectedConcept.brand_name_english}-Logo.png`;
// //     link.click();
// //   };

// //   if (!selectedConcept) return null;

// //   return (
// //     <div className="min-h-screen bg-slate-50 px-6 py-12 flex flex-col items-center text-right" dir="rtl">
// //       <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{selectedConcept.brand_name_hebrew}</h1>
// //       <h2 className="text-xl text-slate-500 mb-14 font-mono">{selectedConcept.brand_name_english}</h2>
      
// //       <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
// //         {loading ? (
// //           <div className="py-20 text-slate-600">
// //             <div className="animate-spin inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>
// //             <p className="animate-pulse">מייצר את הלוגו המושלם עבורך...</p>
// //           </div>
// //         ) : (
// //           <>
// //             <div className="aspect-square rounded-2xl border bg-slate-50 flex items-center justify-center overflow-hidden mb-8 shadow-inner relative">
// //               {logo ? (
// //                 <img src={`data:image/png;base64,${logo}`} alt="Logo" className="w-full h-full object-contain p-8" />
// //               ) : (
// //                 <span className="text-slate-400">התמונה בטעינה...</span>
// //               )}
// //             </div>

// //             <div className="space-y-4">
// //               <button
// //                 onClick={() =>
// //                   navigate("/posters", {
// //                     state: {
// //                       businessName: selectedConcept.brand_name_english,
// //                       essence: userInput.essence,
// //                       visualStyle: userInput.style,
// //                       extendedStyle: selectedConcept.extended_designer_style,
// //                       colors: selectedConcept.color_palette,
// //                       tagline: selectedConcept.tagline,
// //                       logo: logo
// //                     }
// //                   })
// //                 }
// //                 disabled={!logo}
// //                 className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-semibold hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-lg"
// //               >
// //                 אהבתי, בוא נמשיך לפוסטרים ✨
// //               </button>

// //               <div className="flex gap-2">
// //                 <button 
// //                     onClick={handleDownload} 
// //                     disabled={!logo}
// //                     className="flex-1 py-3 bg-slate-800 text-white rounded-2xl font-semibold hover:bg-slate-900 disabled:opacity-50 transition-colors"
// //                 >
// //                     ⬇️ הורדת לוגו (PNG)
// //                 </button>

// //                 <button 
// //                     onClick={() => window.print()} 
// //                     disabled={!logo}
// //                     className="flex-1 py-3 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
// //                 >
// //                     🖨️ הדפסה
// //                 </button>
// //               </div>

// //               <div className="flex gap-2">
// //                   <button onClick={handleRetry} className="flex-1 py-3 text-slate-500 rounded-2xl border hover:bg-slate-100 transition-colors">
// //                     נסה לוגו אחר
// //                   </button>
// //                   <button onClick={() => navigate(-1)} className="flex-1 py-3 text-indigo-600 font-medium hover:bg-indigo-50 rounded-2xl transition-colors">
// //                     חזרה לאפשרויות
// //                   </button>
// //               </div>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// import { useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect, useRef, useCallback } from "react";

// export default function SelectedBrand() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { selectedConcept, userInput } = location.state || {};

//   const [logo, setLogo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const hasGenerated = useRef(false);

//   useEffect(() => {
//     if (!selectedConcept) {
//       navigate("/");
//     }
//   }, [selectedConcept, navigate]);

//   const generateLogo = useCallback(async () => {
//     if (!selectedConcept || !userInput || loading) return;

//     const brandingData = {
//       businessName: selectedConcept.brand_name_english,
//       businessDescription: userInput.essence,
//       targetAudience: userInput.audience,
//       visualStyle: userInput.style,
//       tone: userInput.tone,
//       essence: selectedConcept.style_name,
//       tagline: selectedConcept.tagline,
//       extendedStyle: selectedConcept.extended_designer_style,
//       colors: selectedConcept.color_palette
//     };

//     try {
//       setLoading(true);
//       const res = await fetch("http://localhost:5000/api/generate-logo", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(brandingData),
//       });

//       if (!res.ok) throw new Error("Failed to fetch logo");

//       const data = await res.json();
//       setLogo(data.imageUrl);
//     } catch (err) {
//       console.error("Error generating logo", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedConcept, userInput, loading]);

//   useEffect(() => {
//     if (selectedConcept && !hasGenerated.current) {
//       hasGenerated.current = true;
//       generateLogo();
//     }
//   }, [selectedConcept, generateLogo]);

//   const handleRetry = () => {
//     setLogo(null);
//     hasGenerated.current = false;
//     generateLogo();
//   };

//   const handleDownload = () => {
//     if (!logo) return;
//     const link = document.createElement("a");
//     link.href = `data:image/png;base64,${logo}`;
//     link.download = `${selectedConcept.brand_name_english}-Logo.png`;
//     link.click();
//   };

//   // הכנת הנתונים למעבר לדף הבא (נחיתה או פוסטרים)
//   const getPayload = () => ({
//     businessName: selectedConcept.brand_name_hebrew,
//     businessDescription: userInput.essence,
//     targetAudience: userInput.audience,
//     visualStyle: userInput.style,
//     extendedStyle: selectedConcept.extended_designer_style,
//     colors: selectedConcept.color_palette,
//     tagline: selectedConcept.tagline,
//     logo: logo
//   });

//   if (!selectedConcept) return null;

//   return (
//     <div className="min-h-screen bg-slate-50 px-6 py-12 flex flex-col items-center text-right" dir="rtl">
//       <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{selectedConcept.brand_name_hebrew}</h1>
//       <h2 className="text-xl text-slate-500 mb-14 font-mono">{selectedConcept.brand_name_english}</h2>
      
//       <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
//         {loading ? (
//           <div className="py-20 text-slate-600">
//             <div className="animate-spin inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>
//             <p className="animate-pulse">מייצר את הלוגו המושלם עבורך...</p>
//           </div>
//         ) : (
//           <>
//             <div className="aspect-square rounded-2xl border bg-slate-50 flex items-center justify-center overflow-hidden mb-8 shadow-inner relative">
//               {logo ? (
//                 <img src={`data:image/png;base64,${logo}`} alt="Logo" className="w-full h-full object-contain p-8" />
//               ) : (
//                 <span className="text-slate-400">התמונה בטעינה...</span>
//               )}
//             </div>

//             <div className="space-y-4">
//               {/* אפשרות 1: מעבר ישר לדף נחיתה (התוספת שביקשת) */}
//               <button
//                 onClick={() => navigate("/landingBuilder", { state: getPayload() })}
//                 disabled={!logo}
//                 className="w-full py-4 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-800 disabled:opacity-50 transition-colors shadow-lg"
//               >
//                 המשך ישר לבניית דף נחיתה ✨
//               </button>

//               {/* אפשרות 2: מעבר לפוסטרים (המסלול המקורי) */}
//               <button
//                 onClick={() => navigate("/posters", { state: getPayload() })}
//                 disabled={!logo}
//                 className="w-full py-3 bg-indigo-50 text-indigo-700 rounded-2xl font-semibold border border-indigo-100 hover:bg-indigo-100 disabled:opacity-50 transition-colors"
//               >
//                 אני רוצה קודם לעצב פוסטרים 🖼️
//               </button>

//               <div className="flex gap-2">
//                 <button 
//                     onClick={handleDownload} 
//                     disabled={!logo}
//                     className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 disabled:opacity-50 transition-colors"
//                 >
//                     ⬇️ הורדה
//                 </button>

//                 <button 
//                     onClick={() => window.print()} 
//                     disabled={!logo}
//                     className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 disabled:opacity-50 transition-colors"
//                 >
//                     🖨️ הדפסה
//                 </button>
//               </div>

//               <div className="flex gap-2 pt-2 border-t">
//                   <button onClick={handleRetry} className="flex-1 py-2 text-slate-500 text-sm hover:underline transition-colors">
//                     נסה לוגו אחר
//                   </button>
//                   <button onClick={() => navigate(-1)} className="flex-1 py-2 text-indigo-600 text-sm hover:underline transition-colors">
//                     חזרה לאפשרויות
//                   </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";

export default function SelectedBrand() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedConcept, userInput } = location.state || {};

  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const hasGenerated = useRef(false);

  useEffect(() => {
    if (!selectedConcept) {
      navigate("/");
    }
  }, [selectedConcept, navigate]);

  const generateLogo = useCallback(async () => {
    if (!selectedConcept || !userInput || loading) return;

    const brandingData = {
      businessName: selectedConcept.brand_name_english,
      businessDescription: userInput.essence,
      targetAudience: userInput.audience,
      visualStyle: userInput.style,
      tone: userInput.tone,
      essence: selectedConcept.style_name,
      tagline: selectedConcept.tagline,
      extendedStyle: selectedConcept.extended_designer_style,
      colors: selectedConcept.color_palette
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/generate-logo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brandingData),
      });

      if (!res.ok) throw new Error("Failed to fetch logo");

      const data = await res.json();
      setLogo(data.imageUrl);
    } catch (err) {
      console.error("Error generating logo", err);
    } finally {
      setLoading(false);
    }
  }, [selectedConcept, userInput, loading]);

  useEffect(() => {
    if (selectedConcept && !hasGenerated.current) {
      hasGenerated.current = true;
      generateLogo();
    }
  }, [selectedConcept, generateLogo]);

  const handleRetry = () => {
    setLogo(null);
    hasGenerated.current = false;
    generateLogo();
  };

  const handleDownload = () => {
    if (!logo) return;
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${logo}`;
    link.download = `${selectedConcept.brand_name_english}-Logo.png`;
    link.click();
  };

  // הכנת מבנה הנתונים האחיד למעבר בין דפים
  const getPayload = () => ({
    businessName: selectedConcept.brand_name_hebrew,
    businessDescription: userInput.essence,
    targetAudience: userInput.audience,
    visualStyle: userInput.style,
    extendedStyle: selectedConcept.extended_designer_style,
    colors: selectedConcept.color_palette,
    tagline: selectedConcept.tagline,
    logo: logo
  });

  if (!selectedConcept) return null;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12 flex flex-col items-center text-right" dir="rtl">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{selectedConcept.brand_name_hebrew}</h1>
      <h2 className="text-xl text-slate-500 mb-14 font-mono">{selectedConcept.brand_name_english}</h2>
      
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        {loading ? (
          <div className="py-20 text-slate-600">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>
            <p className="animate-pulse">מייצר את הלוגו המושלם עבורך...</p>
          </div>
        ) : (
          <>
            <div className="aspect-square rounded-2xl border bg-slate-50 flex items-center justify-center overflow-hidden mb-8 shadow-inner relative">
              {logo ? (
                <img src={`data:image/png;base64,${logo}`} alt="Logo" className="w-full h-full object-contain p-8" />
              ) : (
                <span className="text-slate-400">התמונה בטעינה...</span>
              )}
            </div>

            <div className="space-y-4">
              <button
                onClick={() => navigate("/landingBuilder", { state: getPayload() })}
                disabled={!logo}
                className="w-full py-4 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-800 disabled:opacity-50 transition-colors shadow-lg"
              >
                המשך ישר לבניית דף נחיתה ✨
              </button>

              <button
                onClick={() => navigate("/posters", { state: getPayload() })}
                disabled={!logo}
                className="w-full py-3 bg-indigo-50 text-indigo-700 rounded-2xl font-semibold border border-indigo-100 hover:bg-indigo-100 disabled:opacity-50 transition-colors"
              >
                אני רוצה קודם לעצב פוסטרים 🖼️
              </button>

              <div className="flex gap-2">
                <button onClick={handleDownload} disabled={!logo} className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 disabled:opacity-50 transition-colors">⬇️ הורדה</button>
                <button onClick={() => window.print()} disabled={!logo} className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 disabled:opacity-50 transition-colors">🖨️ הדפסה</button>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <button onClick={handleRetry} className="flex-1 py-2 text-slate-500 text-sm hover:underline transition-colors">נסה לוגו אחר</button>
                <button onClick={() => navigate(-1)} className="flex-1 py-2 text-indigo-600 text-sm hover:underline transition-colors">חזרה לאפשרויות</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}