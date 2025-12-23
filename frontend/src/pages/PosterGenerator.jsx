// import { useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import html2canvas from "html2canvas";

// export default function PosterGenerator() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const brandingData = location.state;
//   const { logo, tagline, businessName, colors } = brandingData || {};

//   const [posters, setPosters] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedPosterId, setSelectedPosterId] = useState(null);

//   const primaryColor = colors?.[0] || "#indigo-600";

//   // פונקציית יצירת הפוסטרים
//   const generatePosters = async () => {
//     if (!brandingData?.businessName) {
//       setError("שגיאה: חסרים נתונים ליצירת פוסטרים");
//       return;
//     }
//     setLoading(true);
//     setError("");
//     setPosters([]);
//     setSelectedPosterId(null);

//     try {
//       const res = await fetch("http://localhost:5000/api/posters", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(brandingData),
//       });

//       if (!res.ok) throw new Error(`שגיאת שרת: ${res.status}`);
      
//       const data = await res.json();
      
//       // השרת מחזיר מערך בתוך data.posters
//       if (data.posters && data.posters.length > 0) {
//         setPosters(data.posters);
//       } else {
//         throw new Error("לא התקבלו פוסטרים מהשרת");
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // יצירת פוסטרים ראשונית בטעינה אם אין
//   useEffect(() => {
//     if (posters.length === 0 && !loading) {
//       generatePosters();
//     }
//   }, []);

//   const handleDownload = async (posterId) => {
//     const element = document.getElementById(`poster-card-${posterId}`);
//     if (!element) return;
//     try {
//       const canvas = await html2canvas(element, { 
//         useCORS: true, 
//         scale: 2,
//         logging: false,
//         backgroundColor: null
//       });
//       const link = document.createElement("a");
//       link.href = canvas.toDataURL("image/png");
//       link.download = `${businessName}-Poster-${posterId}.png`;
//       link.click();
//     } catch (err) {
//       console.error("Download failed", err);
//       alert("הורדת התמונה נכשלה, נסה שוב.");
//     }
//   };

//   if (!brandingData) return <div className="text-center py-20">לא נמצא מידע מיתוגי</div>;

//   return (
//     <div className="min-h-screen px-4 py-14 bg-slate-50 text-right" dir="rtl">
//       <div className="max-w-7xl mx-auto text-center mb-12">
//         <h2 className="text-4xl font-black mb-4 text-slate-900">הקמפיין הפרסומי שלך</h2>
//         <p className="text-slate-500 mb-8">בחר את העיצוב המנצח לדף הנחיתה ולפרסום</p>
        
//         <div className="flex justify-center gap-4 flex-wrap">
//           <button 
//             onClick={generatePosters} 
//             disabled={loading} 
//             className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl hover:bg-indigo-700 transition-all disabled:opacity-50"
//           >
//             {loading ? (
//               <span className="flex items-center gap-2">
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 מעצב פוסטרים...
//               </span>
//             ) : "רענן עיצובים 🔄"}
//           </button>
          
//           <button
//             onClick={() => {
//               const selected = posters.find(p => p.id === selectedPosterId) || posters[0];
//               navigate("/landingBuilder", { state: { brandingData, selectedPoster: selected } });
//             }}
//             disabled={posters.length === 0}
//             className={`px-8 py-4 rounded-2xl font-bold shadow-xl transition-all ${
//               posters.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-emerald-600 text-white hover:bg-emerald-700"
//             }`}
//           >
//             המשך לדף הנחיתה ✨
//           </button>
//         </div>
//         {error && <p className="text-red-500 mt-6 font-medium bg-red-50 py-2 px-4 rounded-lg inline-block">{error}</p>}
//       </div>

//       <div className="max-w-7xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {posters.map((poster) => (
//           <div key={poster.id} className="flex flex-col gap-5">
//             <div 
//               id={`poster-card-${poster.id}`} 
//               onClick={() => setSelectedPosterId(poster.id)}
//               className={`relative bg-white shadow-2xl overflow-hidden aspect-[3/4] w-full rounded-3xl cursor-pointer transition-all duration-300 ${
//                 selectedPosterId === poster.id ? 'ring-8 ring-emerald-500 scale-[1.03]' : 'hover:scale-[1.01]'
//               }`}
//             >
//               {/* השכבה של תמונת הרקע מה-AI */}
//               <img 
//                 src={`data:image/png;base64,${poster.imageBase64}`} 
//                 alt="Branded Background" 
//                 className="absolute inset-0 w-full h-full object-cover" 
//               />
              
//               {/* שכבת תוכן עליונה (Overlay) */}
//               <div className="absolute inset-0 flex flex-col justify-between p-10 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/60">
                
//                 {/* לוגו עליון */}
//                 <div className="flex justify-center">
//                   {logo && (
//                     <div className="bg-white/90 p-3 rounded-2xl backdrop-blur-sm shadow-lg">
//                       <img 
//                         src={`data:image/png;base64,${logo}`} 
//                         alt="Logo" 
//                         className="w-20 h-20 object-contain" 
//                       />
//                     </div>
//                   )}
//                 </div>
                
//                 {/* טקסט וסלוגן תחתון */}
//                 <div className="text-center space-y-4">
//                   <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl">
//                     <h3 className="text-3xl font-black text-white drop-shadow-2xl leading-tight mb-2">
//                       {tagline}
//                     </h3>
//                     <div className="w-12 h-1.5 mx-auto rounded-full mb-3" style={{ backgroundColor: primaryColor }} />
//                     <p className="text-xs font-bold text-white/90 tracking-[0.2em] uppercase">
//                       {businessName}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* כפתור הורדה פרטני */}
//             <button 
//               onClick={() => handleDownload(poster.id)} 
//               className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2"
//             >
//               <span>⬇️</span> הורד פוסטר מוכן
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import html2canvas from "html2canvas";

export default function PosterGenerator() {
  const location = useLocation();
  const navigate = useNavigate();
  const brandingData = location.state; // כאן נמצא הלוגו והצבעים
  const { logo, tagline, businessName, colors } = brandingData || {};

  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPosterId, setSelectedPosterId] = useState(null);

  const primaryColor = colors?.[0] || "#6366f1";

  const generatePosters = async () => {
    if (!brandingData?.businessName) {
      setError("שגיאה: חסרים נתונים ליצירת פוסטרים");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/posters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brandingData),
      });

      if (!res.ok) throw new Error(`שגיאת שרת: ${res.status}`);
      const data = await res.json();
      if (data.posters && data.posters.length > 0) {
        setPosters(data.posters);
      } else {
        throw new Error("לא התקבלו פוסטרים מהשרת");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (posters.length === 0 && !loading) {
      generatePosters();
    }
  }, []);

  const handleDownload = async (posterId) => {
    const element = document.getElementById(`poster-card-${posterId}`);
    if (!element) return;
    try {
      const canvas = await html2canvas(element, { useCORS: true, scale: 2 });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${businessName}-Poster-${posterId}.png`;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  if (!brandingData) return <div className="text-center py-20">לא נמצא מידע מיתוגי</div>;

  return (
    <div className="min-h-screen px-4 py-14 bg-slate-50 text-right" dir="rtl">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-black mb-4">הקמפיין הפרסומי שלך</h2>
        <div className="flex justify-center gap-4 flex-wrap">
          <button onClick={generatePosters} disabled={loading} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl">
            {loading ? "מעצב..." : "רענן עיצובים 🔄"}
          </button>
          <button
            onClick={() => {
              const selected = posters.find(p => p.id === selectedPosterId) || posters[0];
              // התיקון הקריטי: מעבירים את ה-brandingData המקורי (עם הלוגו) הלאה
              navigate("/landingBuilder", { state: { ...brandingData, selectedPoster: selected } });
            }}
            disabled={posters.length === 0}
            className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-xl"
          >
            המשך לדף הנחיתה ✨
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posters.map((poster) => (
          <div key={poster.id} className="flex flex-col gap-5">
            <div 
              id={`poster-card-${poster.id}`} 
              onClick={() => setSelectedPosterId(poster.id)}
              className={`relative bg-white shadow-2xl overflow-hidden aspect-[3/4] w-full rounded-3xl cursor-pointer transition-all ${selectedPosterId === poster.id ? 'ring-8 ring-emerald-500 scale-[1.03]' : ''}`}
            >
              <img src={`data:image/png;base64,${poster.imageBase64}`} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-between p-10 z-10 bg-gradient-to-b from-black/20 to-black/60">
                <div className="flex justify-center">
                  {logo && <div className="bg-white/90 p-3 rounded-2xl shadow-lg"><img src={`data:image/png;base64,${logo}`} className="w-20 h-20 object-contain" /></div>}
                </div>
                <div className="text-center">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                    <h3 className="text-3xl font-black text-white leading-tight mb-2">{tagline}</h3>
                    <p className="text-xs font-bold text-white/90 uppercase">{businessName}</p>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => handleDownload(poster.id)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold">הורד פוסטר</button>
          </div>
        ))}
      </div>
    </div>
  );
}