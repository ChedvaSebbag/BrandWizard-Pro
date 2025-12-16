import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-2xl text-center px-6">

        {/* Logo / Title */}
        <h1 className="text-5xl font-extrabold tracking-tight mb-6">
          BrandWizard
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-slate-300 mb-10 leading-relaxed">
          Create a complete brand identity in minutes.<br />
          Strategy, tone & visual direction — powered by AI.
        </p>

        {/* CTA */}
        <Link
          to="/create"
          className="
            inline-block
            px-10 py-4
            bg-indigo-600
            text-white
            text-lg
            font-semibold
            rounded-xl
            shadow-lg
            hover:bg-indigo-700
            hover:scale-105
            transition-all
            duration-200
          "
        >
          Start Creating Your Brand →
        </Link>

      </div>
    </div>
  );
}

export default Home;
