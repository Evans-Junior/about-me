import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Layout";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Software from "./pages/Software";
import Leadership from "./pages/Leadership";
import Ashesi from "./pages/Ashesi";
import Research from "./pages/Research";
import Publications from "./pages/Publications";
import Awards from "./pages/Awards";
import Currently from "./pages/Currently";
import Goal from "./pages/Goal";

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/software" element={<Software />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/ashesi" element={<Ashesi />} />
            <Route path="/research" element={<Research />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/currently" element={<Currently />} />
            <Route path="/goal" element={<Goal />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}
