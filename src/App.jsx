import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Sketchbook from "./components/Sketchbook.jsx";
import FutureDirection from "./components/FutureDirection.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  const [language, setLanguage] = useState("zh");

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-paper selection:bg-rust selection:text-paper">
      <Navbar language={language} onLanguageChange={setLanguage} />
      <main>
        <Hero language={language} />
        <About language={language} />
        <Experience language={language} />
        <Portfolio language={language} />
        <Sketchbook language={language} />
        <FutureDirection language={language} />
        <Contact language={language} />
      </main>
    </div>
  );
}
