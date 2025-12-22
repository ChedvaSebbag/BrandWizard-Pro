import { useLocation } from "react-router-dom";

export default function LandingPreview() {
  const { state } = useLocation();
  const { brandingData, posters } = state || {};

  if (!brandingData) {
    return <p>❌ אין נתונים לדף נחיתה</p>;
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: brandingData.colors?.[0] || "#0f172a" }}
    >
      {/* HERO */}
      <section className="text-center py-32 text-white">
        <h1 className="text-5xl font-extrabold mb-6">
          {brandingData.businessName}
        </h1>

        <p className="text-xl mb-10">
          {brandingData.tagline}
        </p>

        <button
          className="px-8 py-4 rounded-xl font-semibold"
          style={{ backgroundColor: brandingData.colors?.[1] || "#6366f1" }}
        >
          צרו קשר
        </button>
      </section>

      {/* IMAGE / POSTER */}
      {posters?.[0] && (
        <section className="py-20 flex justify-center bg-white">
          <img
            src={`data:image/png;base64,${posters[0].imageBase64}`}
            alt="Poster"
            className="max-w-md rounded-2xl shadow-xl"
          />
        </section>
      )}

      {/* ABOUT */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">
          למה לבחור בנו?
        </h2>
        <p className="text-slate-300 text-lg">
          {brandingData.businessDescription}
        </p>
      </section>
    </div>
  );
}
