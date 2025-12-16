import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import BrandOptions from "./pages/BrandOptions.jsx";
import Analysis from "./pages/Analysis.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<BrandOptions />} />
        <Route path="/analysis" element={<Analysis />} />

      </Routes>
    </BrowserRouter>
  );
}



