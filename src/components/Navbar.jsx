import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { copy } from "../data/i18n.js";

export default function Navbar({ language, onLanguageChange }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const content = copy[language].nav;
  const headerTone = scrolled
    ? "border-paper/10 bg-ink/78 shadow-soft backdrop-blur-xl"
    : "border-[#171717]/10 bg-[#FCFBF7]/82 shadow-soft backdrop-blur-xl";
  const brandTone = scrolled ? "text-paper" : "text-[#171717]";
  const linkTone = scrolled
    ? "text-paper/64 hover:bg-paper/8 hover:text-paper"
    : "text-[#5F5A54] hover:bg-[#171717]/[0.06] hover:text-[#171717]";
  const menuButtonTone = scrolled
    ? "border-paper/14 bg-paper/6 text-paper hover:bg-paper/12"
    : "border-[#171717]/12 bg-white/45 text-[#171717] hover:bg-white/75";
  const mobilePanelTone = scrolled
    ? "border-paper/10 bg-ink/95"
    : "border-[#171717]/10 bg-[#FCFBF7]/95";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 border-b transition duration-500 ${headerTone}`}
    >
      <nav className="section-shell flex h-16 items-center justify-between">
        <a
          href="#hero"
          className={`font-display text-lg tracking-normal ${brandTone}`}
          aria-label="Go to home"
        >
          {content.brand}
        </a>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-1">
            {content.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-[6px] px-3 py-2 text-xs uppercase tracking-[0.18em] transition ${linkTone}`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <LanguageToggle
            language={language}
            onLanguageChange={onLanguageChange}
            label={content.language}
            tone={scrolled ? "dark" : "light"}
          />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle
            language={language}
            onLanguageChange={onLanguageChange}
            label={content.language}
            tone={scrolled ? "dark" : "light"}
            compact
          />
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-[6px] border transition ${menuButtonTone}`}
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? content.close : content.open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className={`border-t px-4 pb-5 pt-2 backdrop-blur-xl md:hidden ${mobilePanelTone}`}>
          <div className="mx-auto grid max-w-sm gap-1">
            {content.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-[6px] px-3 py-3 text-sm uppercase tracking-[0.18em] transition ${linkTone}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function LanguageToggle({
  language,
  onLanguageChange,
  label,
  tone = "dark",
  compact = false,
}) {
  const light = tone === "light";

  return (
    <div
      className={`flex items-center rounded-[6px] border p-1 ${
        light
          ? "border-[#171717]/12 bg-white/45"
          : "border-paper/14 bg-paper/6"
      }`}
      aria-label={label}
    >
      {[
        { value: "zh", label: "中" },
        { value: "en", label: "EN" },
      ].map((item) => (
        <button
          key={item.value}
          type="button"
          aria-pressed={language === item.value}
          onClick={() => onLanguageChange(item.value)}
          className={`h-8 rounded-[4px] px-2 text-[11px] font-medium uppercase tracking-[0.12em] transition ${
            compact ? "min-w-8" : "min-w-10"
          } ${
            language === item.value
              ? light
                ? "bg-[#171717] text-[#FCFBF7]"
                : "bg-paper text-ink"
              : light
                ? "text-[#5F5A54] hover:text-[#171717]"
                : "text-paper/56 hover:text-paper"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
