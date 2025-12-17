// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function BrandOptions() {
//   const [formData, setFormData] = useState({ essence: "", audience: "", style: "", tone: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     console.log("Form data updated:", { ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submitting form data:", formData);

//     try {
//       const response = await fetch("http://localhost:5000/api/branding", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       console.log("Response status:", response.status);

//       if (!response.ok) throw new Error("Server error");

//       const data = await response.json();
//       console.log("Response from server:", data);

//       const brandingResult = data.result ?? data;
//       console.log("Normalized brandingResult:", brandingResult);

//       navigate("/results", { state: { brandingResult } });
//     } catch (error) {
//       console.error("FETCH ERROR:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex justify-center pt-16">
//       <div className="w-full max-w-2xl bg-white shadow-xl p-10 rounded-2xl">
//         <h1 className="text-4xl font-bold mb-8 text-indigo-700">Create Your Brand</h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-lg font-semibold mb-2">Business Essence</label>
//             <textarea
//               name="essence"
//               value={formData.essence}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg"
//               rows={3}
//             />
//           </div>

//           <div>
//             <label className="block text-lg font-semibold mb-2">Target Audience</label>
//             <textarea
//               name="audience"
//               value={formData.audience}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg"
//               rows={3}
//             />
//           </div>

//           <div>
//             <label className="block text-lg font-semibold mb-2">Brand Style</label>
//             <input type="text" name="style" value={formData.style} onChange={handleChange} className="w-full p-3 border rounded-lg" />
//           </div>

//           <div>
//             <label className="block text-lg font-semibold mb-2">Tone of Voice</label>
//             <input type="text" name="tone" value={formData.tone} onChange={handleChange} className="w-full p-3 border rounded-lg" />
//           </div>

//           <button type="submit" className="w-full py-3 text-white font-bold bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
//             Generate Branding
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BrandOptions() {
  const [formData, setFormData] = useState({
    essence: "",
    audience: "",
    style: "",
    tone: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/branding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      navigate("/results", { state: { brandingResult: data.result } });
    } catch (error) {
      alert("המערכת עמוסה כרגע, נסי שוב בעוד רגע");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center pt-16 bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-6">Create Your Brand</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea name="essence" onChange={handleChange} placeholder="Business Essence" />
          <textarea name="audience" onChange={handleChange} placeholder="Target Audience" />
          <input name="style" onChange={handleChange} placeholder="Brand Style" />
          <input name="tone" onChange={handleChange} placeholder="Tone" />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg"
          >
            {loading ? "מייצר מיתוג..." : "Generate Branding"}
          </button>
        </form>
      </div>
    </div>
  );
}
