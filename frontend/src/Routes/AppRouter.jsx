import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Analysis from "../pages/Analysis";
import Branding from "../pages/Branding";
import Landing from "../pages/Landing";
import Export from "../pages/Export";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/branding" element={<Branding />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/export" element={<Export />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
