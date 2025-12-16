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

            <Link
                to="/create"
                className="inline-block px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700" >
                Start Creating Your Brand →
            </Link>

        </div>
    );
}

export default Home;
