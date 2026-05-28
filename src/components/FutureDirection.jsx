import MotionSection from "./MotionSection.jsx";
import { copy, text } from "../data/i18n.js";
import { futureDirections } from "../data/works.js";

export default function FutureDirection({ language }) {
  const content = copy[language].future;

  return (
    <MotionSection id="future" className="py-24 sm:py-32">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-fog">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-5xl leading-none text-paper sm:text-6xl">
              {content.title}
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[6px] border border-paper/10 bg-paper/10 sm:grid-cols-2">
            {futureDirections.map((item) => (
              <article key={item.id} className="bg-ink p-5 sm:p-6">
                <h3 className="font-display text-2xl leading-tight text-paper">
                  {text(item.title, language)}
                </h3>
                <p className="mt-4 text-sm leading-7 text-paper/62">
                  {text(item.text, language)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
