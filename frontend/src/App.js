import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Branding from "./pages/BrandOptions.jsx";
import BrandResults from "./pages/BrandResults.jsx"; 
import SelectedBrand from "./pages/SelectedBrand.jsx"; 
import PosterGenerator from "./pages/PosterGenerator";
 import LandingBuilder from "./pages/LandingBuilder.jsx";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Branding />} />
        <Route path="/results" element={<BrandResults />} /> {/* <-- הוסף כאן */}
         <Route path="/selected" element={<SelectedBrand />} />
<Route path="/posters" element={<PosterGenerator />} />
         <Route path="/" element={<LandingBuilder />} />


      </Routes>
    </BrowserRouter>
  );
}



