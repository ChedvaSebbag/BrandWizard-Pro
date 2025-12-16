import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: 40 }}>
        <h1 className="text-3xl text-blue-500 font-bold">Testing Tailwind</h1>

      <h1>BrandWizard Pro</h1>
      <p>Create full branding using AI.</p>

      <Link to="/analysis">
        <button>Start Branding</button>
      </Link>
    </div>
  );
}

export default Home;
