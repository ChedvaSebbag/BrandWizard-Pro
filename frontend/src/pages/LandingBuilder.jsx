// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function LandingBuilder({ brandingData }) {
//     const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     services: "",
//     phone: "",
//     email: "",
//     ctaType: "contact",
//   });

//   const [landingData, setLandingData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("http://localhost:5000/api/landing-page", {

       
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...brandingData,
//           ...formData,
//           services: formData.services
//             .split(",")
//             .map((s) => s.trim())
//             .filter(Boolean),
//         }),
//       });

//       if (!response.ok) throw new Error();

//       const data = await response.json();
//     //   setLandingData(data);

//     navigate("/landing-preview", { state: { landingData: data } });

//     } catch {
//       setError("אירעה שגיאה ביצירת דף הנחיתה");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-6 py-14 font-sans">
//       {/* Header */}
//       <header className="mb-12">
//         <h1 className="text-3xl font-semibold mb-2">
//           דף נחיתה לעסק שלך
//         </h1>
//         <p className="text-gray-600">
//           המיתוג כבר מוכן — נשלים פרטים וניצור דף מוכן לשימוש
//         </p>
//       </header>

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
//       >
//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium mb-1">
//             מוצרים / שירותים (מופרד בפסיקים)
//           </label>
//           <input
//             name="services"
//             placeholder="לדוגמה: נעלי ילדים, סנדלים, נעלי ספורט"
//             onChange={handleChange}
//             className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             טלפון / וואטסאפ
//           </label>
//           <input
//             name="phone"
//             placeholder="050-0000000"
//             onChange={handleChange}
//             className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             אימייל
//           </label>
//           <input
//             name="email"
//             placeholder="contact@business.co.il"
//             onChange={handleChange}
//             className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//         </div>

//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium mb-1">
//             מה הפעולה המרכזית בדף?
//           </label>
//           <select
//             name="ctaType"
//             onChange={handleChange}
//             className="w-full rounded-lg border px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-black"
//           >
//             <option value="contact">יצירת קשר</option>
//             <option value="whatsapp">שליחת וואטסאפ</option>
//             <option value="quote">קבלת הצעת מחיר</option>
//           </select>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="md:col-span-2 mt-4 rounded-xl bg-black text-white py-4 text-lg font-medium hover:bg-gray-800 transition disabled:opacity-60"
//         >
//           {loading ? "יוצר דף נחיתה..." : "צור דף נחיתה"}
//         </button>

//         {error && (
//           <p className="md:col-span-2 text-red-500 text-sm">{error}</p>
//         )}
//       </form>

//       {/* Preview */}
//       {landingData && (
//         <div className="border-t pt-14 space-y-12">
//           <section className="text-center space-y-2">
//             <h2 className="text-4xl font-bold">{landingData.hero.title}</h2>
//             <p className="text-xl text-gray-600">
//               {landingData.hero.subtitle}
//             </p>
//             <p className="mt-2 text-gray-500">
//               {landingData.hero.tagline}
//             </p>
//           </section>

//           <section>
//             <h3 className="text-xl font-semibold mb-2">על העסק</h3>
//             <p className="text-gray-700">{landingData.about}</p>
//           </section>

//           <section>
//             <h3 className="text-xl font-semibold mb-2">מה אנחנו מציעים</h3>
//             <ul className="list-disc list-inside space-y-1">
//               {landingData.services.map((s, i) => (
//                 <li key={i}>{s}</li>
//               ))}
//             </ul>
//           </section>

//           <section className="bg-gray-50 rounded-xl p-6 text-center">
//             <blockquote className="italic text-lg">
//               “{landingData.brandStatement}”
//             </blockquote>
//           </section>

//           <section className="text-center">
//             <button className="rounded-xl bg-black text-white px-10 py-4 text-lg hover:bg-gray-800 transition">
//               {landingData.cta}
//             </button>
//           </section>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function LandingBuilder() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const brandingData = state;

  const [formData, setFormData] = useState({ services: "", phone: "", email: "", ctaType: "contact" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/landing-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...brandingData, ...formData, 
          services: formData.services.split(",").map(s => s.trim()).filter(Boolean) 
        }),
      });
      const aiData = await res.json();
      navigate("/landing-preview", { state: { landingData: { ...aiData, ...brandingData, contactInfo: formData } } });
    } catch (err) { alert("שגיאה ביצירת הדף"); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-14 text-right" dir="rtl">
      <h1 className="text-3xl font-bold mb-8">פרטים אחרונים לדף הנחיתה</h1>
      <form onSubmit={handleSubmit} className="grid gap-6">
        <textarea name="services" placeholder="השירותים שלנו (מופרד בפסיקים)" rows="3" onChange={(e)=>setFormData({...formData, services: e.target.value})} className="p-4 border rounded-xl" required />
        <div className="grid grid-cols-2 gap-4">
          <input name="phone" placeholder="טלפון" onChange={(e)=>setFormData({...formData, phone: e.target.value})} className="p-4 border rounded-xl" />
          <input name="email" placeholder="אימייל" onChange={(e)=>setFormData({...formData, email: e.target.value})} className="p-4 border rounded-xl" />
        </div>
        <select name="ctaType" onChange={(e)=>setFormData({...formData, ctaType: e.target.value})} className="p-4 border rounded-xl bg-white">
          <option value="contact">צור קשר</option>
          <option value="whatsapp">שלח הודעת וואטסאפ</option>
          <option value="call">התקשר עכשיו</option>
        </select>
        <button type="submit" disabled={loading} className="py-5 bg-black text-white rounded-2xl font-bold text-xl">
          {loading ? "מייצר תוכן..." : "צור דף נחיתה ✨"}
        </button>
      </form>
    </div>
  );
}