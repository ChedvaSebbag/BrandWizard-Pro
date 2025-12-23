import { useState } from "react";

export default function LandingBuilder() {
  const [formData, setFormData] = useState({
    businessName: "",
    businessDescription: "",
    essence: "",
    targetAudience: "",
    tone: "",
    tagline: ""
  });

  const [landingData, setLandingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/landing-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to generate landing page");
      }

      const data = await response.json();
      setLandingData(data);
    } catch (err) {
      setError("אירעה שגיאה ביצירת דף הנחיתה");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 900, margin: "0 auto" }}>
      {/* ===== טופס ===== */}
      <h2>פתיחת עסק – יצירת דף נחיתה</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 60 }}>
        <input name="businessName" placeholder="שם העסק" onChange={handleChange} />
        <input name="businessDescription" placeholder="מה העסק עושה" onChange={handleChange} />
        <input name="essence" placeholder="מהות המותג" onChange={handleChange} />
        <input name="targetAudience" placeholder="קהל יעד" onChange={handleChange} />
        <input name="tone" placeholder="טון דיבור" onChange={handleChange} />
        <input name="tagline" placeholder="משפט מפתח" onChange={handleChange} />

        <button type="submit" disabled={loading}>
          {loading ? "יוצר דף נחיתה..." : "צור דף נחיתה"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      {/* ===== תצוגת דף נחיתה ===== */}
      {landingData && (
        <div style={{ borderTop: "1px solid #ddd", paddingTop: 40 }}>
          <section>
            <h1>{landingData.hero.title}</h1>
            <h2>{landingData.hero.subtitle}</h2>
            <p>{landingData.hero.tagline}</p>
          </section>

          <section>
            <h3>על העסק</h3>
            <p>{landingData.about}</p>
          </section>

          <section>
            <h3>שירותים</h3>
            <ul>
              {landingData.services.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3>למה אנחנו</h3>
            <ul>
              {landingData.whyUs.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </section>

          <section>
            <blockquote>{landingData.brandStatement}</blockquote>
          </section>

          <section>
            <button>{landingData.cta}</button>
          </section>
        </div>
      )}
    </div>
  );
}
