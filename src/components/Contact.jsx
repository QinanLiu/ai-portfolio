import { Instagram, Mail, Palette, Github } from "lucide-react";
import MotionSection from "./MotionSection.jsx";
import { copy } from "../data/i18n.js";

const links = [
  {
    key: "email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
    icon: Mail,
  },
  {
    key: "instagram",
    value: "@yourname",
    href: "https://instagram.com/",
    icon: Instagram,
  },
  {
    key: "portfolio",
    href: "https://behance.net/",
    icon: Palette,
  },
  {
    key: "github",
    value: "github.com/yourname",
    href: "https://github.com/",
    icon: Github,
  },
];

export default function Contact({ language }) {
  const content = copy[language].contact;

  return (
    <MotionSection
      id="contact"
      className="border-t border-paper/10 pb-12 pt-24 sm:pt-32"
    >
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-rust/90">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-5xl leading-none text-paper sm:text-6xl">
              {content.title}
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {links.map(({ key, value, href, icon: Icon }) => (
              <a
                key={key}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="group rounded-[6px] border border-paper/12 bg-paper/5 p-4 transition hover:bg-paper/10"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-paper/42">
                    {content.links[key]}
                  </span>
                  <Icon
                    size={18}
                    className="text-paper/56 transition group-hover:text-paper"
                  />
                </div>
                <p className="mt-4 break-words text-sm text-paper/76">
                  {value ?? content.links.portfolioValue}
                </p>
              </a>
            ))}
          </div>
        </div>

        <footer className="mt-20 flex flex-col gap-4 border-t border-paper/10 pt-8 text-xs uppercase tracking-[0.18em] text-paper/38 sm:flex-row sm:items-center sm:justify-between">
          <span>{content.footerLeft}</span>
          <span>{content.footerRight}</span>
        </footer>
      </div>
    </MotionSection>
  );
}
