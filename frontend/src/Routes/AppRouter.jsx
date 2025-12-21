import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Branding from "../pages/BrandOptions";
import BrandResults from "../pages/BrandResults";



function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brandingOptions" element={<BrandingOptions />} />
       <Route path="/brandingresults" element={<BrandResults />} />
=<Route path="/brand-voice" element={<BrandVoice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
