import MotionSection from "./MotionSection.jsx";
import { copy } from "../data/i18n.js";

export default function About({ language }) {
  const content = copy[language].about;

  return (
    <MotionSection id="about" className="border-t border-paper/10 py-24 sm:py-32">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-rust/90">
            {content.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-5xl leading-none text-paper sm:text-6xl">
            {content.title}
          </h2>

          <figure className="mt-10 overflow-hidden rounded-[6px] border border-paper/12 bg-paper/5 p-3 shadow-soft">
            <div className="image-grain aspect-[3/4] rounded-[4px]">
              <img
                src="/images/self-portrait.jpg"
                alt={content.portraitAlt}
                className="h-full w-full object-cover object-center saturate-[0.78] transition duration-700 hover:saturate-100"
              />
            </div>
            <figcaption className="mt-4 flex items-start justify-between gap-4 text-xs uppercase tracking-[0.18em] text-paper/48">
              <span>{content.portraitTitle}</span>
              <span>{content.portraitMedium}</span>
            </figcaption>
          </figure>
        </div>

        <div className="max-w-3xl lg:self-center lg:translate-y-8">
          <blockquote className="relative border-l border-paper/18 pl-6">
            <span
              className="pointer-events-none absolute -left-1 -top-7 font-display text-7xl leading-none text-paper/18"
              aria-hidden="true"
            >
              “
            </span>
            <div className="space-y-6 text-base leading-8 text-paper/72">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            </div>
            <span
              className="pointer-events-none absolute -bottom-10 right-0 font-display text-7xl leading-none text-paper/18"
              aria-hidden="true"
            >
              ”
            </span>
          </blockquote>

          <div className="mt-10 flex flex-wrap gap-2">
            {content.tags.map((item) => (
              <span
                key={item}
                className="rounded-[6px] border border-paper/14 px-3 py-2 text-xs uppercase tracking-[0.16em] text-paper/64"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
