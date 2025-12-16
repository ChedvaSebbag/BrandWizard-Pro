import { useState } from "react";

function BusinessForm({ onAnalyze }) {
  const [form, setForm] = useState({
    businessType: "",
    targetAudience: "",
    competitors: "",
    brandStyle: "",
    tone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <label>Business Type</label>
      <input name="businessType" onChange={handleChange} />

      <label>Target Audience</label>
      <input name="targetAudience" onChange={handleChange} />

      <label>Competitors</label>
      <input name="competitors" onChange={handleChange} />

      <label>Brand Style</label>
      <input name="brandStyle" onChange={handleChange} />

      <label>Tone</label>
      <input name="tone" onChange={handleChange} />

      <button onClick={() => onAnalyze(form)}>
        Analyze Business
      </button>
    </div>
  );
}

export default BusinessForm;
