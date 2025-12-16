import { useState } from "react";

export default function BrandOptions() {
  const [formData, setFormData] = useState({
    essence: "",
    audience: "",
    style: "",
    tone: "",
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    // בשלב הבא: שליחה ל-backend → AI
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center pt-16">
      <div className="w-full max-w-2xl bg-white shadow-xl p-10 rounded-2xl">
        
        <h1 className="text-4xl font-bold mb-8 text-indigo-700">
          Create Your Brand
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-lg font-semibold mb-2">
              Business Essence
            </label>
            <textarea
              name="essence"
              value={formData.essence}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Describe what your business is about..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Target Audience
            </label>
            <textarea
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Who are your customers?"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Brand Style
            </label>
            <input
              type="text"
              name="style"
              value={formData.style}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="e.g. Modern, Elegant, Minimalistic..."
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Tone of Voice
            </label>
            <input
              type="text"
              name="tone"
              value={formData.tone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="e.g. Friendly, Professional, Bold..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white font-bold bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            Generate Branding
          </button>

        </form>
      </div>
    </div>
  );
}
