import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="max-w-3xl text-center px-6">

        {/* Eyebrow */}
        <span className="inline-block mb-6 px-4 py-1 text-sm tracking-wide uppercase rounded-full bg-white/5 text-slate-300 border border-white/10">
          AI Brand Strategy Studio
        </span>

        {/* Main Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
          Brand<span className="text-indigo-400">Wizard</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed">
          Build a complete brand identity —
          <br className="hidden sm:block" />
          strategy, tone and visual direction,
          <span className="text-white font-medium"> in minutes.</span>
        </p>

        {/* CTA */}
        <Link
          to="/create"
          className="
            inline-flex
            items-center
            gap-3
            px-10
            py-4
            bg-indigo-600
            text-white
            text-lg
            font-semibold
            rounded-2xl
            shadow-[0_20px_40px_-15px_rgba(99,102,241,0.6)]
            hover:bg-indigo-500
            hover:scale-105
            transition-all
            duration-300
          "
        >
          Start Creating
          <span className="text-xl">→</span>
        </Link>

        {/* Footer note */}
        <p className="mt-10 text-sm text-slate-400">
          No templates. No guesswork. Just smart branding.
        </p>

      </div>
    </div>
  );
}

export default Home;