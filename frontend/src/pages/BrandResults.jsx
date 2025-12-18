// // import { useLocation, useNavigate } from "react-router-dom";

// // export default function BrandResults() {
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const brandingResult = location.state?.brandingResult;

// //   // טיפול במקרה שאין נתונים
// //   if (!brandingResult || !brandingResult.step1_strategy) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-gray-600 px-4 text-center">
// //         <p>No branding data found. Please generate a brand first.</p>
// //         <button
// //           className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
// //           onClick={() => navigate("/create")}
// //         >
// //           Go to Brand Creation
// //         </button>
// //       </div>
// //     );
// //   }

// //   const { step1_strategy, step2_options } = brandingResult;

// //   return (
// //     <div className="min-h-screen bg-gray-50 px-6 py-12">
// //       <div className="max-w-6xl mx-auto space-y-16">
// //         <section className="bg-white p-8 rounded-2xl shadow">
// //           <h1 className="text-3xl font-bold text-indigo-700 mb-6">Brand Strategy</h1>
// //           <div className="space-y-4 text-gray-700">
// //             <p>
// //               <span className="font-semibold">Market Insight:</span><br />
// //               {step1_strategy?.market_insight || "No data available"}
// //             </p>
// //             <p>
// //               <span className="font-semibold">Brand Archetype:</span>{" "}
// //               {step1_strategy?.brand_archetype || "No data available"}
// //             </p>
// //             <p>
// //               <span className="font-semibold">Target Audience:</span><br />
// //               {step1_strategy?.target_audience_summary || "No data available"}
// //             </p>
// //           </div>
// //         </section>

// //         <section>
// //           <h2 className="text-3xl font-bold text-indigo-700 mb-8">Brand Concepts</h2>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             {step2_options?.map((option, index) => (
// //               <div
// //                 key={index}
// //                 className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col"
// //               >
// //                 <div className="mb-4">
// //                   <p className="text-sm uppercase tracking-wide text-gray-500">
// //                     {option.concept_name || "Unnamed Concept"}
// //                   </p>
// //                   <h3 className="text-2xl font-bold text-gray-900">
// //                     {option.suggested_business_name || "No Name"}
// //                   </h3>
// //                   <p className="italic text-gray-600 mt-1">{option.slogan || ""}</p>
// //                 </div>

// //                 <div className="flex gap-2 mb-4">
// //                   {option.colors?.map((color, i) => (
// //                     <div
// //                       key={i}
// //                       className="w-7 h-7 rounded-full border"
// //                       style={{ backgroundColor: color }}
// //                       title={color}
// //                     />
// //                   ))}
// //                 </div>

// //                 <p className="text-sm text-gray-700 flex-grow">{option.reasoning || ""}</p>
// //                 <p className="text-xs text-gray-500 mt-3">
// //                   <span className="font-semibold">Visual Direction:</span>{" "}
// //                   {option.visual_vibe || ""}
// //                 </p>

// //                 <button
// //                   className="mt-6 w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
// //                   onClick={() =>
// //                     navigate("/selected", { state: { selectedConcept: option } })
// //                   }
// //                 >
// //                   Select This Concept
// //                 </button>
// //               </div>
// //             )) || <p>No concepts available.</p>}
// //           </div>
// //         </section>
// //       </div>
// //     </div>
// //   );
// // }
// import { useLocation, useNavigate } from "react-router-dom";

// export default function BrandResults() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const brandingResult = location.state?.brandingResult;

//   // טיפול במקרה שאין נתונים
//   if (!brandingResult || !brandingResult.strategy) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600 px-4 text-center">
//         <p>No branding data found. Please generate a brand first.</p>
//         <button
//           className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
//           onClick={() => navigate("/create")}
//         >
//           Go to Brand Creation
//         </button>
//       </div>
//     );
//   }

//   const { strategy, design_styles } = brandingResult;

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-12">
//       <div className="max-w-6xl mx-auto space-y-16">
//         {/* Brand Strategy */}
//         <section className="bg-white p-8 rounded-2xl shadow">
//           <h1 className="text-3xl font-bold text-indigo-700 mb-6">Brand Strategy</h1>
//           <div className="space-y-4 text-gray-700">
//             <p>
//               <span className="font-semibold">Overview:</span><br />
//               {strategy.overview || "No data available"}
//             </p>
//             <p>
//               <span className="font-semibold">Market Gap:</span><br />
//               {strategy.market_gap || "No data available"}
//             </p>
//             <p>
//               <span className="font-semibold">Target Audience Insight:</span><br />
//               {strategy.target_audience_insight || "No data available"}
//             </p>
//           </div>
//         </section>

//         {/* Design Styles */}
//         <section>
//           <h2 className="text-3xl font-bold text-indigo-700 mb-8">Brand Concepts</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {design_styles?.map((option) => (
//               <div
//                 key={option.style_id}
//                 className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col"
//               >
//                 <div className="mb-4">
//                   <p className="text-sm uppercase tracking-wide text-gray-500">
//                     {option.style_name || "Unnamed Concept"}
//                   </p>
//                   <h3 className="text-2xl font-bold text-gray-900">
//                     {option.brand_name || "No Name"}
//                   </h3>
//                   <p className="italic text-gray-600 mt-1">{option.tagline || ""}</p>
//                 </div>

//                 {/* Color Palette */}
//                 <div className="flex gap-2 mb-4">
//                   {option.color_palette?.map((color, i) => (
//                     <div
//                       key={i}
//                       className="w-7 h-7 rounded-full border"
//                       style={{ backgroundColor: color }}
//                       title={color}
//                     />
//                   ))}
//                 </div>

//                 {/* Reasoning & Visual Description */}
//                 <p className="text-sm text-gray-700 flex-grow">{option.design_reasoning || ""}</p>
//                 <p className="text-xs text-gray-500 mt-3">
//                   <span className="font-semibold">Visual Direction:</span>{" "}
//                   {option.visual_description || ""}
//                 </p>

//                 {/* AI Prompt (Optional, for designers) */}
//                 {option.ai_image_prompt && (
//                   <p className="text-xs text-gray-400 mt-2">
//                     <span className="font-semibold">AI Image Prompt:</span>{" "}
//                     {option.ai_image_prompt}
//                   </p>
//                 )}

//                 {/* Select Button */}
//                 <button
//                   className="mt-6 w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
//                   onClick={() =>
//                     navigate("/selected", { state: { selectedConcept: option } })
//                   }
//                 >
//                   Select This Concept
//                 </button>
//               </div>
//             )) || <p>No concepts available.</p>}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }
import { useLocation, useNavigate } from "react-router-dom";

export default function BrandResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const brandingResult = location.state?.brandingResult;

  if (!brandingResult || !brandingResult.strategy) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 px-4 text-center">
        <p>No branding data found.</p>
        <button className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-lg" onClick={() => navigate("/create")}>
          Go Back
        </button>
      </div>
    );
  }

  const { strategy, design_styles } = brandingResult;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 text-right" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Brand Strategy Section */}
        <section className="bg-white p-8 rounded-2xl shadow">
          <h1 className="text-3xl font-bold text-indigo-700 mb-6">אסטרטגיית מותג</h1>
          <div className="space-y-4 text-gray-700">
            <p><span className="font-semibold">סקירה:</span> {strategy.overview}</p>
            <p><span className="font-semibold">פער בשוק:</span> {strategy.market_gap}</p>
            <p><span className="font-semibold">תובנת קהל יעד:</span> {strategy.target_audience_insight}</p>
          </div>
        </section>

        {/* Brand Concepts Section */}
        <section>
          <h2 className="text-3xl font-bold text-indigo-700 mb-8">קונספטים עיצוביים</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {design_styles?.map((option) => (
              <div key={option.style_id} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col">
                <div className="mb-4">
                  <p className="text-sm uppercase text-gray-500">{option.style_name}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{option.brand_name}</h3>
                  <p className="italic text-gray-600 mt-1">{option.tagline}</p>
                </div>

                {/* Color Palette */}
                <div className="flex gap-2 mb-4">
                  {option.color_palette?.map((color, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border" style={{ backgroundColor: color }} title={color} />
                  ))}
                </div>

                <p className="text-sm text-gray-700 flex-grow">{option.design_reasoning}</p>
                
                <p className="text-xs text-gray-500 mt-3">
                  <span className="font-semibold">כיוון ויזואלי:</span> {option.visual_description}
                </p>

                {/* הכפתור מעביר את כל האובייקט כולל ה-prompt הנסתר */}
                <button
                  className="mt-6 w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                  onClick={() => navigate("/selected", { state: { selectedConcept: option } })}
                >
                  בחר קונספט זה וצור לוגו
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
